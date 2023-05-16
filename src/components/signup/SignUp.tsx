import React, { useCallback, useEffect, useRef, useState } from "react";
import LoginRes, { Gender } from "@models/user/LoginDto";
import axios from "axios";
import { FunctionComponent as FC } from "react";
import useAuth from "@store/auth/useAuth";

interface SignUpProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: FC<SignUpProps> = (props) => {
  const { setIsOpen } = props;
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [indexOfGenderWith, setIndexOfGenderWith] = useState<number>(0);
  const [genderRef, setGenderRef] = useState<Gender>("M");
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordChkRef = useRef<HTMLInputElement | null>(null);
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const frontEmailRef = useRef<HTMLInputElement | null>(null);
  const backEmailRef = useRef<HTMLSelectElement | null>(null);

  const [hasPasswordChk, setHasPasswordChk] = useState<boolean>(false);

  const { setUserInfo } = useAuth();

  useEffect(() => {
    setGenderRef(indexOfGenderWith === 0 ? "M" : "F");
  }, [indexOfGenderWith]);

  const submit = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    const url = "http://localhost:8080/signup";

    const name = nameRef.current?.value;
    const gender = genderRef;
    const userName = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordChk = passwordChkRef.current?.value;
    const nickname = nicknameRef.current?.value;
    const email = `${frontEmailRef.current?.value}@${backEmailRef.current?.value}`;
    const roles = ["ROLE_USER"];
    if (password !== passwordChk) {
      setHasPasswordChk(true);
      return;
    }

    axios
      .post(url, {
        name,
        gender,
        userName,
        password,
        nickname,
        email,
        roles,
      })
      .then((response) => response.data)
      .then((loginDto: LoginRes) => {
        setUserInfo(loginDto);
        setIsOpen(false);
      })
      .catch((err) => {
        console.error("\n\n\n\n\n\n", err, "\n\n\n\n\n\n\n\n");
      });
  }, []);

  return (
    <div>
      <h1>회원가입</h1>
      <div className="flex flex-col pl-4 pt-4 gap-4">
        <div>
          <p>이름</p>
          <input type="text" ref={nameRef} />
        </div>
        <div>
          <p>성별</p>
          <label>
            <input
              type="radio"
              name="gender"
              value="M"
              onClick={() => {
                setIndexOfGenderWith(0);
              }}
              defaultChecked={indexOfGenderWith === 0}
            />
            남
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="F"
              onClick={() => {
                setIndexOfGenderWith(1);
              }}
              defaultChecked={indexOfGenderWith === 1}
            />
            여
          </label>
        </div>
        <div>
          <p>아이디</p>
          <input
            type="text"
            ref={usernameRef}
            onChange={(evt) => {
              if (!usernameRef.current) return;

              const idExp = /[^a-z\d0-9]/g;
              usernameRef.current.value = evt.target.value.replace(idExp, "");
            }}
          />
        </div>
        <div>
          <p>비밀번호</p>
          <input
            type="password"
            ref={passwordRef}
            required={true}
            onChange={(evt) => {
              const passwordExp = /[^A-Za-z\d$@$!%*#?&]/g;
              evt.target.value.replace(passwordExp, "");
            }}
          />
        </div>
        <div>
          <p>비밀번호 확인</p>
          {hasPasswordChk && (
            <p className="text-red-600">비밀번호를 다시 확인해 주세요!!</p>
          )}
          <input type="password" ref={passwordChkRef} />
        </div>
        <div>
          <p>닉네임</p>
          <input
            type="text"
            ref={nicknameRef}
            onChange={(evt) => {
              if (!nicknameRef.current) return;

              const idExp = /[^가-힣A-Za-z\d0-9]/g;
              nicknameRef.current.value = evt.target.value.replace(idExp, "");
            }}
          />
        </div>
        <div>
          <p>이메일</p>
          <input type="text" ref={frontEmailRef} /> @
          <select ref={backEmailRef}>
            <option value="naver.com">naver.com</option>
            <option value="google.com">gmail.com</option>
            <option value="kakao.com">kakao.com</option>
            <option value="nate.com">nate.com</option>
          </select>
        </div>
        <div className="flex flex-row gap-4">
          <button onClick={submit}>전송</button>
          <button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
