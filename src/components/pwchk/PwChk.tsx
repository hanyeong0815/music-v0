import React, {useCallback, useRef, useState} from 'react';
import StorageManager from "@utils/common/storage";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import PATH from "@utils/routes/PATH";
import {FunctionComponent as FC} from "react";

interface PwChkProps {
  setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>;
}

const PwChk:FC<PwChkProps> = (props) => {
  const {setIsOpen} = props

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const {MYPAGE} = PATH;

  let navigate = useNavigate();

  const submit = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    const userId = StorageManager.getItem("userId");
    const password = passwordRef.current?.value;
    const token = StorageManager.getItem("token");
    const url = "http://localhost:8080/check-pw";
    console.log("userId", userId, "password", password);

    axios.post(url, {userId, password}, {
      headers: {Authorization: `Bearer ${token!}`},
    })
      .then((response) => response.data)
      .then((data: boolean) => {
        if (data) {
          setIsChecked(true);
          setIsOpen(false);
          navigate(MYPAGE);
        }
      })
  }, []);

  return (
    <div className="p-4">
      <p className="py-4">비밀번호 확인</p>
      <article className="p-4">
        {isChecked && <p className="text-red-600">비밀번호를 다시 확인해주세요.</p>}
        <div className="flex flex-row gap-4">
          <p>비밀번호</p>
          <input type="password" ref={passwordRef}/>
        </div>
      </article>
      <div>
        <button onClick={submit}>확인</button>
      </div>
    </div>
  );
};

export default PwChk;