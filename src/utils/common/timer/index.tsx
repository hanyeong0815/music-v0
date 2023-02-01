import {
  useCallback,
  useState,
  FunctionComponent as FC,
  useLayoutEffect,
  useRef,
} from "react";
import IntegerSeconds from "./models/IntegerSeconds";
import TimerService from "./models/TimerService";
import Timer, { TimerProps } from "./widgets/Timer";

export const useTimerService = () => {
  const [isRunning, setRunning] = useState<boolean>(false);
  const [isOver, setOver] = useState<boolean>(true);
  const [initialMinutes, setInitialMinutes] = useState<number>(2);
  const [initialSeconds, setInitialSeconds] = useState<IntegerSeconds>(59);
  const [currentMinutes, setCurrentMinutes] = useState<number>(initialMinutes);
  const [currentSeconds, setCurrentSeconds] =
    useState<IntegerSeconds>(initialSeconds);
  const [onTimeout, setOnTimeout] = useState(() => () => {
    console.debug("do nothing");
  });

  const expectedPassTimeRef = useRef<number>(0);

  const [startTime, setStartTime] = useState(new Date().getTime());

  useLayoutEffect(() => {
    if (!isRunning) {
      return;
    }
    const willDecrease = currentMinutes > 0 || currentSeconds > 0;
    if (!willDecrease) {
      setRunning(false);
      setOver(true);
      onTimeout();
      return;
    }

    const now = new Date().getTime();
    const realPassTime = now - startTime;
    const expectedPassTime = expectedPassTimeRef.current;
    expectedPassTimeRef.current += 1000;

    const errorGap = realPassTime - expectedPassTime;
    const gain = errorGap > 0 ? errorGap << 1 : 0;

    console.debug("경과 시간: ", realPassTime);

    setTimeout(decreaseTime, 1000 - gain);
  }, [isRunning, currentMinutes, currentSeconds]);

  const decreaseTime = useCallback(() => {
    if (currentSeconds > 0) {
      const newSeconds = (currentSeconds - 1) as IntegerSeconds;
      setCurrentSeconds(newSeconds);
    } else if (currentMinutes > 0) {
      const newMinute = currentMinutes - 1;
      const newSeconds = (currentSeconds + 59) as IntegerSeconds;
      setCurrentMinutes(newMinute);
      setCurrentSeconds(newSeconds);
    }
  }, [currentMinutes, currentSeconds, isRunning]);

  const start = useCallback(() => {
    console.debug("start");
    let willStart =
      currentMinutes === initialMinutes && currentSeconds === initialSeconds;
    willStart ||= currentMinutes === 0 && currentSeconds === 0;
    willStart &&= !isRunning;

    if (!willStart) {
      console.debug("Tried to start timer when already running or unreset.");
      return willStart;
    }
    console.debug(
      "initialMinutes",
      initialMinutes,
      "initialSeconds",
      initialSeconds
    );

    setStartTime(new Date().getTime()); // now
    setCurrentMinutes(initialMinutes);
    setCurrentSeconds(initialSeconds);
    setRunning(willStart);
    setOver(false);
    return willStart;
  }, [
    isRunning,
    currentMinutes,
    currentSeconds,
    initialMinutes,
    initialSeconds,
  ]);

  const pause = useCallback(() => {
    const isAlreadyRunning = isRunning;
    isAlreadyRunning && setRunning(false);
    return isAlreadyRunning;
  }, [isRunning]);

  const resume = useCallback(() => {
    const isAlreadyRunning = isRunning;
    !isAlreadyRunning && setRunning(true);
    return !isAlreadyRunning;
  }, [isRunning]);

  const reset = useCallback(() => {
    const willReset =
      currentMinutes !== initialMinutes || currentSeconds !== initialSeconds;

    if (isRunning || !willReset) {
      console.debug("Tried to reset while running or already reset.");
      return willReset;
    }

    setRunning(false);
    setOver(true);
    setCurrentMinutes(initialMinutes);
    setCurrentSeconds(initialSeconds);

    return willReset;
  }, [
    isRunning,
    initialMinutes,
    initialSeconds,
    currentMinutes,
    currentSeconds,
  ]);

  // Initialize Service Object
  const timerService: TimerService = {
    initialMinutes,
    initialSeconds,
    currentMinutes,
    currentSeconds,
    isRunning,
    isOver,

    setInitialMinutes: (initialMinutes) => {
      setInitialMinutes(initialMinutes);
      !isRunning && setCurrentMinutes(initialMinutes);
    },
    setInitialSeconds: (initialSeconds) => {
      setInitialSeconds(initialSeconds);
      !isRunning && setCurrentSeconds(initialSeconds);
    },

    start,
    pause,
    resume,
    reset,

    setOnTimeout,
  };

  return timerService;
};

type OuterTimerComponent = FC<Omit<TimerProps, "referredService">>;

const useTimer: () => [TimerService, OuterTimerComponent] = () => {
  const timerService = useTimerService();

  const TimerTransffer: FC<Omit<TimerProps, "referredService">> = (props) => (
    <Timer referredService={timerService} {...props} />
  );

  return [timerService, TimerTransffer];
};

export default useTimer;
