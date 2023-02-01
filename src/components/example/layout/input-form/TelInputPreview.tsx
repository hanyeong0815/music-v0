import { DarkButton } from "@styles/button";
import TelInput from "@utils/common/form/TelInput";
import { useEffect, useRef } from "react";

const InputFormPreview = () => {
  const refs = [0, 0, 0].map(() => useRef<HTMLInputElement | null>(null));
  let refIdx = 0;

  useEffect(() => {
    if (refs.some((ref) => !ref.current)) {
      return;
    }

    refs.forEach((ref, idx) => {
      ref.current!.onfocus = () => {
        refIdx = (idx + 1) % 3;
      };
    });
  }, [refs]);

  return (
    <form className="desc-input:outline-none desc-input:px-1 flex flex-col gap-2">
      <h1 className="my-2 text-2xl font-bold">Input Form Preview</h1>
      <fieldset className="grid grid-cols-4 gap-2">
        <DarkButton
          onClick={() => {
            refs[refIdx++].current?.focus();
            refIdx %= 3; // 화면에 그리지 않는 변수는 state로 다루지 않아도 적용 가능함.
          }}
        >
          Focus
        </DarkButton>
      </fieldset>
      <fieldset className="grid grid-cols-4 gap-2" key={1}>
        <span className="flex items-center">TEL(max len 12): </span>
        <TelInput className="border col-span-3" maxLength={12} ref={refs[0]} />
      </fieldset>
      <fieldset className="grid grid-cols-4 gap-2" key={2}>
        <span className="flex items-center">TEL(max len 13): </span>
        <TelInput className="border col-span-3" maxLength={13} ref={refs[1]} />
      </fieldset>
      <fieldset className="grid grid-cols-4 gap-2" key={3}>
        <span className="flex items-center">TEL(max None): </span>
        <TelInput className="border col-span-3" ref={refs[2]} />
      </fieldset>
    </form>
  );
};

export default InputFormPreview;
