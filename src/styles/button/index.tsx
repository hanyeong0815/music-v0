import { CommonButtonProps } from "@models/common/props";
import { FunctionComponent as FC } from "react";

// TODO forwardRef
const ButtonInterface: FC<CommonButtonProps> = (props) => {
  const { children, className, onClick, type = "button", ...restProps } = props;
  const baseStyleClasses =
    "border border-2 rounded-md p-2 disabled:bg-gray-400 transition duration-150 active:scale-95 disabled:active:scale-[1.02]";

  return (
    <button
      type={type}
      {...restProps}
      className={`${baseStyleClasses} ${className ?? ""}`}
      onClick={(event) => {
        event.preventDefault();
        onClick && onClick(event);
      }}
    >
      {children}
    </button>
  );
};

const MainButton: FC<CommonButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  return (
    <ButtonInterface
      {...restProps}
      className={"bg-main text-main-contra " + className}
    >
      {children}
    </ButtonInterface>
  );
};

export const SubButton: FC<CommonButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  const stableClasses = "bg-sub text-sub-contra";
  const activeClasses = "";

  return (
    <ButtonInterface
      {...restProps}
      className={`${stableClasses} ${activeClasses} ${className ?? ""}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const PrimaryButton: FC<CommonButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  const stableClasses = "bg-primary text-primary-contra";
  const activeClasses = "active:bg-primary-active";

  return (
    <ButtonInterface
      {...restProps}
      className={`${stableClasses} ${activeClasses} ${className ?? ""}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const SecondaryButton: FC<CommonButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  const stableClasses = "bg-secondary text-secondary-contra";
  const activeClasses = "active:bg-secondary-active";

  return (
    <ButtonInterface
      {...restProps}
      className={`${stableClasses} ${activeClasses} ${className ?? ""}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const SuccessButton: FC<CommonButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  const stableClasses = "bg-success text-success-contra";
  const activeClasses = "active:bg-success-active";

  return (
    <ButtonInterface
      {...restProps}
      className={`${stableClasses} ${activeClasses} ${className ?? ""}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const DangerButton: FC<CommonButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  const stableClasses = "bg-danger text-danger-contra";
  const activeClasses = "active:bg-danger-active";

  return (
    <ButtonInterface
      {...restProps}
      className={`${stableClasses} ${activeClasses} ${className ?? ""}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const WarningButton: FC<CommonButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  const stableClasses = "bg-warning text-warning-contra";
  const activeClasses = "active:bg-warning-active";

  return (
    <ButtonInterface
      {...restProps}
      className={`${stableClasses} ${activeClasses} ${className ?? ""}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const InfoButton: FC<CommonButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  const stableClasses = "bg-info text-info-contra";
  const activeClasses = "active:bg-info-active";

  return (
    <ButtonInterface
      {...restProps}
      className={`${stableClasses} ${activeClasses} ${className ?? ""}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const LinkButton: FC<CommonButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  const stableClasses = "bg-link text-link-contra underline border-none";
  const activeClasses = "active:bg-link-active";

  return (
    <ButtonInterface
      {...restProps}
      className={`${stableClasses} ${activeClasses} ${className ?? ""}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const LightButton: FC<CommonButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  const stableClasses = "bg-light text-light-contra";
  const activeClasses = "active:bg-light-active";

  return (
    <ButtonInterface
      {...restProps}
      className={`${stableClasses} ${activeClasses} ${className ?? ""}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const DarkButton: FC<CommonButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  const stableClasses = "bg-dark text-dark-contra";
  const activeClasses = "active:bg-dark-active";

  return (
    <ButtonInterface
      {...restProps}
      className={`${stableClasses} ${activeClasses} ${className ?? ""}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const BasicButton: FC<CommonButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  const stableClasses = "bg-basic text-basic-contra";
  const activeClasses = "active:bg-basic-active";

  return (
    <ButtonInterface
      {...restProps}
      className={`${stableClasses} ${activeClasses} ${className ?? ""}`}
    >
      {children}
    </ButtonInterface>
  );
};

export const DefaultButton: FC<CommonButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  const stableClasses = "bg-default text-default-contra";
  const activeClasses = "active:bg-default-active";

  return (
    <ButtonInterface
      {...restProps}
      className={`${stableClasses} ${activeClasses} ${className ?? ""}`}
    >
      {children}
    </ButtonInterface>
  );
};

export default MainButton;
