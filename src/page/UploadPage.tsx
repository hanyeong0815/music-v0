import React, {
  FunctionComponent as FC,
  useCallback,
  useRef,
  useState,
} from "react";
import Upload from "@components/upload/Upload";
import axios from "axios";
import StorageManager from "@utils/common/storage";
import Board from "@components/upload/Board";

interface UploadPageProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IFileTypes {
  object: any;
  img: any;
}

const UploadPage: FC<UploadPageProps> = ({ setIsOpen }) => {
  const [files, setFiles] = useState<IFileTypes | null>({object: null, img: null});

  const titleRef = useRef<HTMLInputElement | null>(null);
  const lyricsRef = useRef<HTMLTextAreaElement | null>(null);

  const buttonStyle = "px-4 py-2 border-2 rounded-xl";

  const submit = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    const musicFile = files?.object;
    const musicCoverImg = files?.img;

    const title = titleRef.current?.value;
    const lyrics = lyricsRef.current?.value;

    if (musicFile === null || title === null) {
      console.log("설마 여기?");
      return;
    }
    const url = "http://localhost:8080/board/upload";
    const userId = StorageManager.getItem("userId");
    const token = StorageManager.getItem("token");

    const userDate = new Blob([JSON.stringify({
      userId: userId,
      title: title,
      lyrics: lyrics,
    })], {
      type: 'application/json'
    });

    axios
      .post(
        url,
        { data:userDate, music: musicFile, cover: musicCoverImg },
        {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token!}` },
        }
      )
      .then(({ data }) => data)
      .then((data: boolean) => {
        if (data) {
          setIsOpen(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [files]);

  return (
    <div className="w-full h-full flex flex-col gap-1 justify-items-start items-center">
      <Upload files={files} setFiles={setFiles} />
      <Board titleRef={titleRef} lyricsRef={lyricsRef} />
      <div className="flex flex-row gap-4">
        <button onClick={submit} className={buttonStyle}>
          확인
        </button>
        <button
          onClick={() => {
            setIsOpen(false);
          }}
          className={buttonStyle}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
