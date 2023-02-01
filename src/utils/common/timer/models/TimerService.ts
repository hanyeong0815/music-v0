import IntegerSeconds from "./IntegerSeconds";

interface TimerService {
  initialMinutes: number;
  initialSeconds: IntegerSeconds;
  currentMinutes: number;
  currentSeconds: number;
  isRunning: boolean;
  isOver: boolean;

  setInitialMinutes: (initialMinutes: number) => void;
  setInitialSeconds: (initialSeconds: IntegerSeconds) => void;

  start: () => boolean;
  pause: () => boolean;
  resume: () => boolean;
  reset: () => boolean;
  setOnTimeout: (callback: () => void) => void;
}

export default TimerService;
