import TimerService from "../models/TimerService";
import { FunctionComponent as FC } from "react";

export interface TimerProps {
  referredService: TimerService;

  boxClassName?: string;
  minuteBoxClassName?: string;
  secondsBoxClassName?: string;

  boxRef?: React.MutableRefObject<HTMLDivElement | null>;
  minuteRef?: React.MutableRefObject<HTMLInputElement | null>;
  secondsRef?: React.MutableRefObject<HTMLInputElement | null>;
}

const Timer: FC<TimerProps> = (props) => {
  const {
    referredService,
    boxClassName,
    minuteBoxClassName,
    secondsBoxClassName,
    boxRef,
    minuteRef,
    secondsRef,
  } = props;

  const { currentMinutes: minutes, currentSeconds: seconds } = referredService;

  return (
    <div className={`flex gap-2 ${boxClassName}`} ref={boxRef}>
      <input
        disabled
        className={`border-none bg-transparent w-full text-right ${minuteBoxClassName}`}
        ref={minuteRef}
        value={minutes}
      />
      <span>:</span>
      <input
        disabled
        className={`border-none bg-transparent w-full text-right ${secondsBoxClassName}`}
        ref={secondsRef}
        value={seconds < 10 ? `0${seconds}` : seconds}
      />
    </div>
  );
};

export default Timer;
