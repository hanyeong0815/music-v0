import musicPlayRes from "@models/player/dto/MusicPlayRes";
import axios from "axios";
import create from "zustand";

interface PlayState {
  musicInfo: musicPlayRes;

  musicPlay: (boardId: string) => void;
}

const usePlay = create<PlayState>((set, get) => ({
  musicInfo: {
    id: "",
    userId: "",
    title: "",
    lyrics: "",
    musicUrl: "",
    imgUrl: "",
    uploadDate: "",
  },

  musicPlay: (boardId) => {
    console.log(boardId);
    const url = `http://localhost:8080/board/play-music?boardId=${boardId}`;

    const loginPromise = axios.get(url);

    loginPromise
      .then(({ data }) => data)
      .then((musicData: musicPlayRes) => {
        set({ musicInfo: musicData });
      })
      .catch((err) => {
        console.error("\n\n\n\n\n\n", err, "\n\n\n\n\n\n\n\n");
      });
  },
}));

export default usePlay;
