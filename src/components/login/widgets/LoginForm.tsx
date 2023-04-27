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

  const { login } = useAuth();

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
    <article>
      <form onSubmit={submit}>
        <input
          name="id"
          ref={usernameRef}
          onChange={(evt) => {
            if (!usernameRef.current) return;

            const idExp = /[^A-Za-z\d0-9]/g;
            usernameRef.current.value = evt.target.value.replace(idExp, "");
          }}
          type="text"
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
        />
        <button>login</button>
        <NonSubmitButton>CANCEL</NonSubmitButton>
      </form>
    </article>
  );
};

export default LoginForm;
