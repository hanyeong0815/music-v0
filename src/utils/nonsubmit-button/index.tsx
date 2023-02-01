import { FunctionComponent as FC } from "react";

export interface NonSubmitButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

// .ts  => const newAbc = <NewType>abc;  // JSX 표현법과 충돌
// .tsx => const newAbc = abc as NewType; // ts, tsx에서 쓸 수 있도록 추가된 문법

const NonSubmitButton: FC<NonSubmitButtonProps> = (props) => {
  const { onClick: forwardClickEventHandler, ...restProps } = props;

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    !!forwardClickEventHandler && forwardClickEventHandler(evt);
  };

  return <button {...restProps} onClick={onClick} />;
};

export default NonSubmitButton;
