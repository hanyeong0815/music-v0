import musicPlayRes from "@models/player/dto/MusicPlayRes";
import React, { FunctionComponent as FC, useState } from "react";
import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
  BsFillVolumeUpFill,
} from "react-icons/bs";

interface PlayerControllerProps {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  progress: number;
  playerRef: React.MutableRefObject<HTMLAudioElement | null>;
  song: musicPlayRes | undefined;
}

const PlayerController: FC<PlayerControllerProps> = ({
  isPlaying,
  playerRef,
  progress,
  setIsPlaying,
  song,
}) => {
  const [stateVolume, setStateVolume] = useState<number>(
    playerRef.current?.volume ?? 0.5
  );
  const [isOnMouse, setIsOnMouse] = useState<boolean>(false);

  const handleVolume = (e: number) => {
    setStateVolume(e);
    if (song == null) {
      return;
    }
    playerRef.current!.volume = e;
  };

  return (
    <div className="flex flex-row justify-center items-center gap-4 h-full">
      <div className="absolute left-12">
        <button
          onClick={() => {
            setIsOnMouse(!isOnMouse);
            console.log(isOnMouse);
          }}
          className="rounded-xl drop-shadow-2xl border border-gray-400 p-2"
        >
          <BsFillVolumeUpFill className="text-xl" />
        </button>
        {isOnMouse && (
          <div className="absolute -left-11 top-10">
            <input
              type="range"
              value={Math.round(stateVolume * 100)}
              onChange={(e: any) => handleVolume(e.target.value / 100)}
            />
          </div>
        )}
      </div>
      <div className="flex flex-row justify-center items-center gap-4 h-full">
        <BsFillSkipBackwardFill className="text-4xl" />
        {isPlaying ? (
          <BsFillPauseFill
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}
            className="text-4xl"
          />
        ) : (
          <BsFillPlayFill
            onClick={() => {
              if (progress >= 100) {
                playerRef.current!.currentTime = 0;
              }
              if (song != undefined) {
                setIsPlaying(!isPlaying);
              }
            }}
            className="text-4xl"
          />
        )}
        <BsFillSkipForwardFill className="text-4xl" />
      </div>
    </div>
  );
};

export default PlayerController;
