import boardListInfo from "@models/auth/dto/BoardListInfo";
import { FunctionComponent as FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import playIcon from "/src/play.svg";
import musicPlayRes from "@models/player/dto/MusicPlayRes";
import axios from "axios";

interface BoardListProps {
  boardList: boardListInfo | undefined;
  isPlaying: boolean;
  song: musicPlayRes | undefined;
  setSong: React.Dispatch<React.SetStateAction<musicPlayRes | undefined>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoardList: FC<BoardListProps> = ({
  boardList,
  isPlaying,
  song,
  setSong,
  setIsPlaying,
}) => {
  const buttonStyle = "bg-gray-400 rounded-lg w-24 py-2 shadow-xl";
  const [isHover, setIsHover] = useState<string>("");
  const musicPlay = useCallback(
    (boardId: string) => {
      if (isPlaying) {
        setSong(undefined);
        setIsPlaying(false);
      }

      console.log(boardId);
      const url = `http://localhost:8080/board/play-music?boardId=${boardId}`;

      const loginPromise = axios.get(url);

      loginPromise
        .then(({ data }) => data)
        .then((musicData: musicPlayRes) => {
          setSong(musicData);
        })
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("\n\n\n\n\n\n", err, "\n\n\n\n\n\n\n\n");
        });
    },
    [song]
  );

  return (
    <div className="grid grid-rows-1 grid-cols-5 px-8 gap-8 h-1/2">
      {boardList?.boardList.map((item, index) => {
        return (
          <div
            className="flex flex-col justify-center items-center"
            key={item.id}
          >
            <div
              onMouseEnter={() => {
                setIsHover(item.id);
              }}
              onMouseLeave={() => {
                setIsHover("");
              }}
              className="w-full aspect-square relative"
            >
              {isHover === item.id && (
                <div className=" w-full h-full absolute">
                  <div className=" absolute opacity-50 w-full h-full bg-black"></div>
                  <div className="absolute flex flex-col justify-center items-center gap-8 w-full h-full">
                    <button className={buttonStyle}>곡 정보</button>
                    <button
                      onClick={() => {
                        musicPlay(item.id);
                        console.log(item);
                      }}
                      className={buttonStyle}
                    >
                      재생
                    </button>
                  </div>
                </div>
              )}
              <img
                src={item.imgUrl ?? playIcon}
                alt="music cover image"
                className="w-full aspect-square"
              />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-lg">{item.title}</p>
              <p className="text-gray-400 text-sm">{item.uploadDate}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BoardList;
