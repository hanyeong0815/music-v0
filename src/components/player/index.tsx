import React, {useRef, useState} from 'react';
import H5AudioPlayer from "react-h5-audio-player";

const Index = () => {

  const playerRef = useRef<HTMLAudioElement | null>(null);
  const [musicLength, setMusicLength] = useState(playerRef.current?.duration);
  // const src = URL.createObjectURL()
  return (
    <div>
      <audio ref={playerRef}/>
    </div>
  );
};

export default Index;