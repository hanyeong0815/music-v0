import { FunctionComponent as FC } from "react";

interface PlayBarProps {
  checkWidth: (e: any) => void;
  clickRef: React.MutableRefObject<HTMLDivElement | null>;
  progress: number;
}

const PlayBar: FC<PlayBarProps> = ({ checkWidth, clickRef, progress }) => {
  return (
    <div>
      <div
        className="w-screen h-2 rounded-xl bg-gray-200 cursor-pointer"
        onClick={checkWidth}
        ref={clickRef}
      >
        <div
          className={` bg-blue-800 border h-full rounded-xl`}
          style={{ width: `${progress + "%"}` }}
        ></div>
      </div>
    </div>
  );
};

export default PlayBar;
