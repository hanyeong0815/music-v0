import { CommonInputProps } from "@models/common/props";
import { forwardRef } from "react";

export interface NumberInputProps extends CommonInputProps {
  asLocale?: boolean;
}

// TODO Locale -> 00,000.000 0 입력 때 localeString으로 변환되지 않으므로 조치

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    const {
      onChange,
      className,
      onKeyDown,
      value,
      defaultValue,
      asLocale = false,
      ...restProps
    } = props;

    return (
      <input
        {...restProps}
        {...(value != null ? { value } : { defaultValue })}
        ref={ref}
        className={`${className}`}
        onKeyDown={(event) => {
          if ("backspace" === event.key.toLowerCase()) {
            // onKeyDown에서는 변경되기 전 값을 알 수 있음.
            const target = event.target as HTMLInputElement;
            if (target.value === "-0") {
              target.value = "0";
            }
          }

          onKeyDown && onKeyDown(event);
        }}
        onChange={(event) => {
          const dotIndex = event.target.value.indexOf(".");
          const hyphenIndex = event.target.value.indexOf("-");
          if (hyphenIndex > 0) {
            // asserts 0, -1
            const primary = event.target.value.slice(0, hyphenIndex);
            const secondary = event.target.value
              .slice(hyphenIndex)
              .replace(/-/g, "");

            event.target.value = `-${secondary}${primary}`;
            onChange && onChange(event);
            return;
          }
          if (dotIndex !== event.target.value.lastIndexOf(".")) {
            const primary = event.target.value.slice(0, dotIndex);
            const secondary = event.target.value
              .slice(dotIndex)
              .replace(/\./g, "");

            event.target.value = `${primary}.${secondary}`;
            onChange && onChange(event);
            return;
          }
          if ("-.0" === event.target.value) {
            event.target.value = "-0.";
            onChange && onChange(event);
            return;
          }
          if (event.target.value.startsWith("-.0")) {
            event.target.value = "-0." + event.target.value.slice(2);
            onChange && onChange(event);
            return;
          }
          if (
            "-." === event.target.value.slice(0, dotIndex + 1).replace(/0/g, "")
          ) {
            event.target.value = "-0" + event.target.value.slice(dotIndex);
          }
          if (event.target.value.endsWith(".")) {
            onChange && onChange(event);
            return;
          }
          if (["-", "-0", "0-", "--"].includes(event.target.value)) {
            event.target.value = "";
            event.target.value = "-0";
            onChange && onChange(event);
            return;
          }
          if ([".0", "0.", ".", "-."].includes(event.target.value)) {
            event.target.value = "0.";
            onChange && onChange(event);
            return;
          }
          if ("00" === event.target.value) {
            event.target.value = "0";
            onChange && onChange(event);
            return;
          }
          if (event.target.value.endsWith("0")) {
            onChange && onChange(event);
            return;
          }

          const isNag = "-" === event.target.value.at(0); // can be sign(-)
          const abs = event.target.value.slice(+isNag);
          const value = +`${isNag ? "-" : ""}${abs.replace(/[^0-9\.]/g, "")}`;

          if (!value) {
            event.target.value = "0";
            onChange && onChange(event);
            return;
          }

          event.target.value = asLocale
            ? value.toLocaleString("ko-KR", {
                maximumFractionDigits: 20,
                minimumFractionDigits: 0,
              })
            : value.toString();

          onChange && onChange(event);
        }}
      />
    );
  }
);
export default NumberInput;
