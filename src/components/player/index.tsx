import { CommonDivProps } from "@models/common/props";
import musicPlayRes from "@models/player/dto/MusicPlayRes";
import React, {
  FunctionComponent as FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import PlayBar from "./widgets/PlayBar";
import PlayerController from "./widgets/PlayerController";

interface PlayerProps extends CommonDivProps {
  isAuth: boolean | null;
  song: musicPlayRes | undefined;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const Player: FC<PlayerProps> = ({ isAuth, song, isPlaying, setIsPlaying }) => {
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const clickRef = useRef<HTMLDivElement | null>(null);

  const [musicLength, setMusicLength] = useState<number>(
    playerRef.current?.duration ?? 0
  );
  const [progress, setProgress] = useState<number>(0);

  // const src = URL.createObjectURL()

  const onplaying = () => {
    const ct = playerRef.current?.currentTime ?? 0;

    if (isAuth) {
      setMusicLength(playerRef.current?.duration ?? 0);
    } else {
      setMusicLength(60);
      if (ct >= 60) {
        setIsPlaying(false);
      }
    }

    setProgress((ct / musicLength) * 100);
  };

  useEffect(() => {
    if (isPlaying) {
      playerRef.current?.play();
    } else {
      playerRef.current?.pause();
    }
  }, [isPlaying]);

  const checkWidth = (e: any) => {
    if (song == undefined) {
      return;
    }
    let width = clickRef.current?.clientWidth ?? 0;
    const offset = e.nativeEvent.offsetX;

    const divProgress = (offset / width) * 100;
    playerRef.current!.currentTime = (divProgress / 100) * musicLength;
  };

  return (
    <div>
      <div className="grid grid-cols-3 p-3 h-20 bg-gray-300">
        {song != null && (
          <audio
            src={song?.musicUrl}
            ref={playerRef}
            onTimeUpdate={onplaying}
          />
        )}
        <PlayerController
          isPlaying={isPlaying}
          playerRef={playerRef}
          progress={progress}
          setIsPlaying={setIsPlaying}
          song={song}
        />
        <div className="h-full text-center items-center text-2xl text-gray-600">
          <p>{song?.title ?? "재생할 음악이 없습니다!!"}</p>
        </div>
        <div className="h-full overflow-scroll text-center items-center text-xl text-gray-600 py-2">
          {song?.lyrics}
        </div>
      </div>
      <PlayBar
        checkWidth={checkWidth}
        clickRef={clickRef}
        progress={progress}
      />
    </div>
  );
};

export default Player;
