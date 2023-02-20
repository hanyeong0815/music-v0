import userInfoReqRes from "@models/auth/dto/UserInfoReqRes";
import useAuth from "@store/auth/useAuth";
import axios from "axios";
import {useLayoutEffect, useState} from "react";
import {Link} from "react-router-dom";
import StorageManager from "@utils/common/storage";
import MainButton from "@styles/button";
import Modal from "@styles/modal";
import LoginForm from "@components/login/widgets/LoginForm";
import SignUp from "@components/signup/SignUp";
import PwChk from "@components/pwchk/PwChk";
import UploadPage from "@/page/UploadPage";

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false);
  const [isPwChkOpen, setIsPwChkOpen] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const { username, token, isAuthenticated } = useAuth();
  const [nickname, setNickname] = useState<string | null>(StorageManager.getItem("nickname") ?? null);
  const [isAuth, setIsAuth] = useState<boolean | null>(StorageManager.getItem("username") != null ?? false);

  useLayoutEffect(() => {
    if (token == null || username == null) {
      return;
    }
    console.log("토큰은>>>>>", token, "이름은>>>>", username);
    const url = `http://localhost:8080/home?username=${username}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token!}` } })
      .then((res) => res.data)
      .then((userInfo: userInfoReqRes) => {
        console.log(userInfo);
        StorageManager.setItem("nickname", userInfo.nickname);
        setIsAuth(true);
        setNickname(userInfo.nickname);
      })
      .catch(console.error);
  }, [isAuthenticated]);

  return (
    <div>
      <Modal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen}>
        <LoginForm setIsOpen={setIsLoginOpen}/>
      </Modal>
      <Modal isOpen={isSignupOpen} setIsOpen={setIsSignupOpen}>
        <SignUp setIsOpen={setIsSignupOpen}/>
      </Modal>
      <Modal isOpen={isPwChkOpen} setIsOpen={setIsPwChkOpen}>
        <PwChk setIsOpen={setIsPwChkOpen}/>
      </Modal>
      <Modal isOpen={isUploadOpen} setIsOpen={setIsUploadOpen}>
        <UploadPage setIsOpen={setIsUploadOpen}/>
      </Modal>

      <div className="min-w-full flex flex-row justify-end p-4 gap-4 -z-10">
        {!isAuth && <Link to="#" onClick={()=>{setIsLoginOpen(true)}} className="underline text-blue-700">로그인</Link>}
        {!isAuth && <Link to="#" onClick={()=>{setIsSignupOpen(true)}} className="underline text-blue-700">회원가입</Link>}
        {isAuth && <Link to="#" onClick={() => {setIsPwChkOpen(true)}}>마이페이지</Link>}
      </div>
      <main>
        <div className="flex flex-row justify-between px-8">
          <h1 className="font-bold text-6xl">Main Page </h1>
          {isAuth && <p className="text-xl pt-4">어서오세요 {nickname}님</p>}
        </div>
        <section>
          <article>
            <MainButton onClick={()=> {
              setIsUploadOpen(true);
            }
            }>노래 등록</MainButton>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Home;
