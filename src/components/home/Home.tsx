import userInfoReqRes from "@models/auth/dto/UserInfoReqRes";
import useAuth from "@store/auth/useAuth";
import axios from "axios";
import {useLayoutEffect, useState} from "react";
import {Link} from "react-router-dom";
import PATH from "@utils/routes/PATH";
import StorageManager from "@utils/common/storage";

const Home = () => {
  const { LOGIN, SIGNUP, PW_CHK } = PATH;
  const { isAuthenticated } = useAuth();
  const [nickname, setNickname] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState<boolean | null>(false);


  useLayoutEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    const username = StorageManager.getItem("username");
    const token = StorageManager.getItem("token");
    console.log("토큰은>>>>>", token, "이름은>>>>", username);
    const url = `http://localhost:8080/home?username=${username}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token!}` } })
      .then((res) => res.data)
      .then((userInfo: userInfoReqRes) => {
        console.log(userInfo);
        setNickname(userInfo.nickname);
        setIsAuth(isAuthenticated);
      })
      .catch(console.error);
  }, [isAuthenticated]);

  return (
    <div>
      <div className="min-w-full flex flex-row justify-end p-4 gap-4">
        {!isAuth && <Link to={LOGIN} className="underline text-blue-700">로그인</Link>}
        {!isAuth && <Link to={SIGNUP} className="underline text-blue-700">회원가입</Link>}
        {isAuth && <Link to={PW_CHK}>마이페이지</Link>}
      </div>
      <main>
        <div className="flex flex-row justify-between px-8">
          <h1 className="font-bold text-6xl">Main Page </h1>
          {isAuth && <p className="text-xl pt-4">어서오세요 {nickname}님</p>}
        </div>
        <section>
          <article></article>
        </section>
      </main>
    </div>
  );
};

export default Home;
