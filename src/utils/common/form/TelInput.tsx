import { CommonInputProps } from "@models/common/props";
import { forwardRef } from "react";

export interface TelInputProps extends CommonInputProps {}

const TelInput = forwardRef<HTMLInputElement, TelInputProps>(
  (props, forwardRef) => {
    const { onChange, className, ...restProps } = props;

    return (
      <input
        {...restProps}
        type="text"
        ref={forwardRef}
        className={`w-full px-2 py-1 ${className}`}
        onChange={(event) => {
          const hyphenReg =
            event.target.value.length >= 13
              ? /^(\d{0,3})(\d{0,4})(\d{0,})$/g
              : /^(\d{0,3})(\d{0,3})(\d{0,})$/g;

          event.target.value = event.target.value
            .replace(/[^0-9]/g, "")
            .replace(hyphenReg, "$1-$2-$3")
            .replace(/(\-{1,2})$/g, "");

          onChange && onChange(event);
        }}
      />
    );
  }
);

export default TelInput;
