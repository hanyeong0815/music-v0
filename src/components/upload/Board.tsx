import React from 'react';
import {FunctionComponent as FC} from "react";

interface BoardProps {
  titleRef: React.MutableRefObject<HTMLInputElement | null>;
  lyricsRef: React.MutableRefObject<HTMLTextAreaElement | null>;
}

const Board:FC<BoardProps> = ({titleRef, lyricsRef}) => {
  return (
    <div className="flex flex-col w-full h-full gap-4 py-4">
      <div className="flex w-full h-10 border border-black items-center justify-center" >
        <input type="text" placeholder="제목을 입력해 주세요." ref={titleRef} className="w-full h-9 text-2xl pl-3" />
      </div>
      <textarea ref={lyricsRef} placeholder="가사를 입력해 주세요.( 선택 )" className="w-full h-full border border-black text-center text-2xl" />
    </div>
  );
};

export default Board;