import useSampleStore from "@store/SampleState";
import { DarkButton } from "@styles/button";
import IntegerInput from "@utils/common/form/IntegerInput";
import NumberInput from "@utils/common/form/NumberInput";
import { useEffect, useState } from "react";

const ZustandPreview = () => {
  const store = useSampleStore();

  const [targetNum, setTargetNum] = useState(0);

  useEffect(() => {
    console.log(store.num);
  }, [store.num]);

  return (
    //
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">ZustandPreview</h1>
      <section className="flex flex-row gap-8">
        <article className="flex flex-col gap-8">
          <fieldset className="grid grid-cols-4 gap-4">
            <span className="font-bold">Num</span>
            <input
              readOnly
              className="col-span-3 border bg-gray-100 text-right px-2 py-4 text-2xl"
              value={store.num}
            />
          </fieldset>
          <DarkButton onClick={store.increase}>Increase</DarkButton>
        </article>
        <article className="flex flex-col gap-8 bg-gray-200 rounded-md shadow-inner p-4">
          <fieldset className="grid grid-cols-4 gap-4">
            <span className="font-bold">Target Num</span>
            <div className="col-span-3">
              <span>Integer</span>
              <IntegerInput
                className="border bg-gray-100 text-right px-2 py-4 text-2xl"
                onChange={(evt) => {
                  const targetNum = +(
                    evt.target as HTMLInputElement
                  ).value.replace(/[^0-9\-]/g, "");

                  setTargetNum(targetNum);
                }}
              />
              <span>Number</span>
              <NumberInput
                className="border bg-gray-100 text-right px-2 py-4 text-2xl"
                onKeyDown={(event) => {
                  setTargetNum(0); // default
                }}
                onChange={(evt) => {
                  const targetNum = +(
                    evt.target as HTMLInputElement
                  ).value.replace(/[^0-9\-\.]/g, "");

                  setTargetNum(targetNum);
                }}
              />
            </div>
          </fieldset>
          <DarkButton onClick={() => store.setNum(targetNum || 0)}>
            Apply
          </DarkButton>
        </article>
      </section>
    </div>
  );
};

export default ZustandPreview;
