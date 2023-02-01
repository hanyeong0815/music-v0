import TimerPreview from "./timer/TimerPreview";
import ZustandPreview from "./context/ZustandPreview";
import InputFormPreview from "./input-form/TelInputPreview";

const UIPreview = () => {
  return (
    <div className="min-h-screen px-8 pt-4 flex flex-col items-center gap-8">
      <main className="max-w-[40rem] w-full flex flex-col gap-8">
        <h1 className="text-4xl font-bold">UIPreview</h1>
        <section className="flex flex-col gap-8">
          <InputFormPreview />
          <ZustandPreview />
          <TimerPreview />
        </section>
      </main>
    </div>
  );
};

export default UIPreview;
