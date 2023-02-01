import { CommonInputProps } from "@models/common/props";
import { forwardRef } from "react";

export interface IntegerInputProps extends CommonInputProps {}

const IntegerInput = forwardRef<HTMLInputElement, IntegerInputProps>(
  (props, ref) => {
    const {
      onChange,
      className,
      value,
      defaultValue = 0,
      ...restProps
    } = props;

    return (
      <input
        {...restProps}
        {...(value != null ? { value } : { defaultValue })}
        ref={ref}
        className={`${className}`}
        onChange={(event) => {
          if (event.target.value === "-") {
            return;
          }
          if (["-0", "0-", "--"].includes(event.target.value)) {
            event.target.value = "-";
            return;
          }

          const _1 = event.target.value.at(0); // can be sign(-)
          const another = event.target.value.slice(1);

          const value = +`${_1}${another.replace(/[^0-9]/g, "")}`;
          if (!value) {
            event.target.value = "0";
            return;
          }

          event.target.value = value.toLocaleString();

          onChange && onChange(event);
        }}
      />
    );
  }
);
export default IntegerInput;
