import { FunctionComponent as FC, useCallback } from "react";
import { CommonDivProps } from "@models/common/props";
import { Link } from "react-router-dom";
import ContextCallbackOption from "@models/auth/dto/common/api/ContextCallbackOption";

interface HomeHeadProps extends CommonDivProps {
  isAuth: boolean | null;
  isAuthenticated: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
  setIsLoginOpen: (value: React.SetStateAction<boolean>) => void;
  setIsSignupOpen: (value: React.SetStateAction<boolean>) => void;
  setIsPwChkOpen: (value: React.SetStateAction<boolean>) => void;
  logout: (option?: ContextCallbackOption | undefined) => void;
}

const HomeHead: FC<HomeHeadProps> = (props) => {
  const {
    isAuth,
    isAuthenticated,
    setIsAuth,
    setIsLoginOpen,
    setIsSignupOpen,
    setIsPwChkOpen,
    logout,
  } = props;

  const logoutBt = useCallback(() => {
    logout();
    setIsAuth(false);
    console.log("호출됨", isAuth);
  }, [isAuthenticated]);

  return (
    <div className="min-w-full flex flex-row justify-end p-4 gap-4 -z-10">
      {!isAuth && (
        <Link
          to="#"
          onClick={() => {
            setIsLoginOpen(true);
          }}
          className="underline text-blue-700"
        >
          로그인
        </Link>
      )}
      {!isAuth && (
        <Link
          to="#"
          onClick={() => {
            setIsSignupOpen(true);
          }}
          className="underline text-blue-700"
        >
          회원가입
        </Link>
      )}
      {isAuth && (
        <Link
          to="#"
          onClick={() => {
            logout();
            setIsAuth(false);
          }}
        >
          로그아웃
        </Link>
      )}
      {isAuth && (
        <Link
          to="#"
          onClick={() => {
            setIsPwChkOpen(true);
          }}
        >
          마이페이지
        </Link>
      )}
    </div>
  );
};

export default HomeHead;
