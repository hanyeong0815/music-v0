import userInfoReqRes from "@models/auth/dto/UserInfoReqRes";
import useAuth from "@store/auth/useAuth";
import axios from "axios";
import { useCallback, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import StorageManager from "@utils/common/storage";
import MainButton from "@styles/button";
import Modal from "@styles/modal";
import LoginForm from "@components/login/widgets/LoginForm";
import SignUp from "@components/signup/SignUp";
import PwChk from "@components/pwchk/PwChk";
import UploadPage from "@/page/UploadPage";
import boardListInfo from "@models/auth/dto/BoardListInfo";
import usePlay from "@store/player/usePlay";
import HomeHead from "../components/home/widgets/HomeHead";
import musicPlayRes from "@models/player/dto/MusicPlayRes";
import Player from "@components/player";
import PageNavigation from "../components/home/widgets/PageNavigation";
import BoardList from "../components/home/widgets/BoardList";

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false);
  const [isPwChkOpen, setIsPwChkOpen] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [song, setSong] = useState<musicPlayRes>();
  const [page, setPage] = useState<number>(1);
  const [pageMap, setPageMap] = useState<number[]>([]);
  const [boardList, SetBoardList] = useState<boardListInfo>();
  const { username, token, isAuthenticated, logout } = useAuth();
  const [nickname, setNickname] = useState<string | null>(
    StorageManager.getItem("nickname") ?? null
  );
  const [isAuth, setIsAuth] = useState<boolean | null>(
    StorageManager.getItem("username") != null ?? false
  );

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

    console.log(isAuthenticated);
  }, [isAuthenticated]);

  useLayoutEffect(() => {
    const url = `http://localhost:8080/board/list?page=${page - 1}`;
    axios
      .get(url)
      .then(({ data }) => data)
      .then((boardListInfo: boardListInfo) => {
        SetBoardList(boardListInfo);
        setPageMap(new Array(boardListInfo.totalPage).fill(0));
      })
      .catch(console.error);
  }, [boardList]);

  return (
    <div>
      <Modal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen}>
        <LoginForm setIsOpen={setIsLoginOpen} />
      </Modal>
      <Modal isOpen={isSignupOpen} setIsOpen={setIsSignupOpen}>
        <SignUp setIsOpen={setIsSignupOpen} />
      </Modal>
      <Modal isOpen={isPwChkOpen} setIsOpen={setIsPwChkOpen}>
        <PwChk setIsOpen={setIsPwChkOpen} />
      </Modal>
      <Modal isOpen={isUploadOpen} setIsOpen={setIsUploadOpen}>
        <UploadPage setIsOpen={setIsUploadOpen} />
      </Modal>

      <Player
        isAuth={isAuth}
        song={song}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />

      <HomeHead
        isAuth={isAuth}
        isAuthenticated={isAuthenticated}
        setIsAuth={setIsAuth}
        setIsLoginOpen={setIsLoginOpen}
        setIsSignupOpen={setIsSignupOpen}
        setIsPwChkOpen={setIsPwChkOpen}
        logout={logout}
      />
      <main className="flex flex-col gap-8">
        <div className="flex flex-row justify-between px-8">
          <h1 className="font-bold text-6xl">Main Page </h1>
          {isAuth && <p className="text-xl pt-4">어서오세요 {nickname}님</p>}
        </div>
        <BoardList
          boardList={boardList}
          isPlaying={isPlaying}
          song={song}
          setSong={setSong}
          setIsPlaying={setIsPlaying}
        />
        <PageNavigation pageMap={pageMap} page={page} setPage={setPage} />
        <section>
          <article>
            <MainButton
              onClick={() => {
                setIsUploadOpen(true);
              }}
            >
              노래 등록
            </MainButton>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Home;
