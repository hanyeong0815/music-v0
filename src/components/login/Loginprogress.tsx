import useAuth from "@store/auth/useAuth";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./widgets/LoginForm";
import OTPConfirmForm from "./widgets/OTPConfirmForm";

export type LoginStepNeme = "AUTH" | "OTP";

const Loginprogress = () => {
  const auth = useAuth();

  const ProgressName: { [key in LoginStepNeme]: LoginStepNeme } = {
    AUTH: "AUTH",
    OTP: "OTP",
  };

  const orderedStepList: LoginStepNeme[] = [
    ProgressName.AUTH,
    ProgressName.OTP,
  ];

  const [stepIndex, setStepIndex] = useState<number>(0);

  const next = useCallback(() => {
    const nextStep = stepIndex + 1;
    const isLastStep = nextStep === orderedStepList.length;

    setStepIndex(nextStep);
  }, [stepIndex]);

  return (
    <div>
      <h1>Login Progress</h1>
      <main>
        {orderedStepList[stepIndex] === ProgressName.AUTH && <LoginForm />}
        {orderedStepList[stepIndex] === ProgressName.OTP && (
          <OTPConfirmForm next={next} />
        )}
      </main>
      <Link to="/signup" className="underline">
        회원가입
      </Link>
    </div>
  );
};

export default Loginprogress;
