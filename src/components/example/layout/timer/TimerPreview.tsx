import MainButton, { DangerButton, SubButton } from "@styles/button";
import useTimer from "@utils/common/timer";
// import Timer from "@utils/common/timer-src";
import useToast from "@utils/common/toast/store/useToast";
import { useEffect, useState } from "react";

const TimerPreview = () => {
  const toast = useToast();
  const [timerService, Timer] = useTimer();

  const [showsTimer, setShowsTimer] = useState<boolean>(false);

  useEffect(() => {
    timerService.setInitialMinutes(2);
    timerService.setInitialSeconds(59);
  }, []);

  return (
    <div>
      <h1>TimerPreview</h1>
      <div>
        <MainButton
          onClick={() => {
            setShowsTimer(true);
            timerService.start();
          }}
        >
          {timerService.isOver ? "Start" : "Restart"}
        </MainButton>
        <DangerButton
          onClick={() => {
            timerService.isRunning
              ? timerService.pause()
              : timerService.resume();
          }}
        >
          {timerService.isRunning
            ? "Pause"
            : timerService.isOver
            ? "Pause"
            : "Resume"}
        </DangerButton>
        <SubButton
          onClick={() => {
            timerService.reset();
          }}
        >
          Reset
        </SubButton>
      </div>
      {showsTimer && <Timer />}
    </div>
  );
};

export default TimerPreview;
