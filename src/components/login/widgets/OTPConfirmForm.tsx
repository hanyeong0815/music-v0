import { FunctionComponent as FC } from "react";

export interface OTPConfirmFormProps {
  next: () => void;
}

const OTPConfirmForm: FC<OTPConfirmFormProps> = ({ next }) => {
  return (
    <div>
      <h1>OTPConfirmForm</h1>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          next();
        }}
      >
        <input value="01234" onChange={() => {}} />
        <button>LOGIN</button>
      </form>
    </div>
  );
};

export default OTPConfirmForm;
