import React, { useRef, useState } from "react";

const Index = () => {
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const [musicLength, setMusicLength] = useState(playerRef.current?.duration);
  // const src = URL.createObjectURL()
  return (
    <div>
      <audio ref={playerRef} />
    </div>
  );
};

export default Index;
