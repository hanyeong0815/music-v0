import UserReqRes from "@models/user/UserReqRes";
import StorageManager from "@utils/common/storage";
import NonSubmitButton from "@utils/nonsubmit-button";
import useAuth from "@store/auth/useAuth";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonDivProps } from "@models/common/props";
import { FunctionComponent as FC } from "react";

interface LoginFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: FC<LoginFormProps> = (props) => {
  const { setIsOpen } = props;

  const storageManager = StorageManager;
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const { login, isAuthenticated } = useAuth();

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [remembersAuthInfo, setRemembersAuthInfo] = useState<boolean>(
    JSON.parse(storageManager.getItem("remembersUserName") ?? "false")
  );

  const rememberAuthInfo = useCallback(() => {
    storageManager.setItem("remembersUserName", `${remembersAuthInfo}`);

    if (remembersAuthInfo) {
      storageManager.setItem(
        "loginFormUserName",
        usernameRef.current?.value ?? ""
      );
    } else {
      storageManager.clearAllUnsticky();
    }
  }, []);

  useEffect(() => {
    console.log("호출됨");
    rememberAuthInfo();
  }, [remembersAuthInfo]);

  useEffect(() => {
    document.addEventListener("keypress", pressEnter, true);
  }, []);

  const pressEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      console.log("이거");
      submit;
    }
  };

  const submit = useCallback<React.FormEventHandler<HTMLFormElement>>(() => {
    const loginTryingUser: Partial<UserReqRes> = {
      username: usernameRef.current?.value,
      state: { password: passwordRef.current?.value },
    };

    login(loginTryingUser);
    setIsOpen(false);
  }, []);

  return (
    <article className="w-full h-full flex flex-col p-4 gap-8">
      <h1 className="font-bold text-xl">로그인</h1>
      <form
        onSubmit={submit}
        className="w-full j-full flex flex-col gap-4 justify-center items-center"
      >
        <input
          name="id"
          ref={usernameRef}
          onChange={(evt) => {
            if (!usernameRef.current) return;

            const idExp = /[^A-Za-z\d0-9]/g;
            usernameRef.current.value = evt.target.value.replace(idExp, "");
          }}
          type="text"
          className="p-2 border"
        />
        <input
          name="password"
          ref={passwordRef}
          // pattern="^(?=.*[A-Za-z])(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,10}$"
          required={true}
          onChange={(evt) => {
            const passwordExp = /[^A-Za-z\d$@$!%*#?&]/g;
            evt.target.value.replace(passwordExp, "");
          }}
          type="password"
          className="p-2 border"
        />
        {isLogin && (
          <div className="text-red-600">
            아이디 혹은 비밀번호를 다시 확인하여주세요.
          </div>
        )}
        <div className="flex flex-row justify-center">
          <button className="px-4 py-2 bg-yellow-400 border-2 border-gray-700 rounded-l-xl">
            login
          </button>
          <NonSubmitButton className="px-2 py-2 bg-gray-400 border-2 border-gray-700 rounded-r-xl">
            CANCEL
          </NonSubmitButton>
        </div>
      </form>
    </article>
  );
};

export default LoginForm;
