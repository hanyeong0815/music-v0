import React, {ChangeEvent, FunctionComponent as FC, useCallback, useEffect, useRef, useState} from "react";
import {IFileTypes} from "@/page/UploadPage";

interface UploadProps {
  files: IFileTypes | null;
  setFiles:  React.Dispatch<React.SetStateAction<IFileTypes | null>>;
}

const Upload:FC<UploadProps> = (props) => {
  const { files, setFiles } = props;
  const ALLOW_FILE_EXTENSION = ["image/jpg", "image/jpeg", "image/png"];
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [musicName, setMusicName] = useState<string>("");
  const [imgName, setImgName] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string | ArrayBuffer | null>("");


  const dragRef = useRef<HTMLLabelElement | null>(null);

  const bgImgStyle = !files?.img ? "bg-gray-400" : `bg-[url('${imgUrl}')]`;
  const fileStyle = `w-full h-[200px] flex flex-col justify-center items-center border-2 border-solid border-black rounded-3xl cursor-pointer ease-in duration-100 opacity-60 ${bgImgStyle}`;
  const dragStyle = `w-full h-[200px] flex flex-col justify-center items-center border-2 border-solid border-black rounded-3xl cursor-pointer ease-in duration-100 bg-gray-600 text-white`;

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles;
      let tempFiles = files;

      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }

      const file = selectFiles[0];

      const fileExtension = file.type;
      if (ALLOW_FILE_EXTENSION.includes(fileExtension)) {
        setImgName(file.name);
        tempFiles = {
          object: tempFiles?.object!,
          img: file,
        };
        imgChangeHandler(file);
      } else {
        setMusicName(file.name);
        tempFiles = {
          object: file!,
          img: files?.img!,
        };
      }
      setFiles(tempFiles);
    },
    [files]
  );

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback((): void => {

    if (dragRef.current === null) {
      return;
    }
    dragRef.current.addEventListener("dragenter", handleDragIn);
    dragRef.current.addEventListener("dragleave", handleDragOut);
    dragRef.current.addEventListener("dragover", handleDragOver);
    dragRef.current.addEventListener("drop", handleDrop);
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current === null) {
      return;
    }
    dragRef.current.removeEventListener("dragenter", handleDragIn);
    dragRef.current.removeEventListener("dragleave", handleDragOut);
    dragRef.current.removeEventListener("dragover", handleDragOver);
    dragRef.current.removeEventListener("drop", handleDrop);
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  const handleFilterFile = useCallback((): void => {
    // 매개변수로 받은 id와 일치하지 않는지에 따라서 filter 해줍니다.
    setFiles(null);
  }, [files]);

  const imgChangeHandler = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgUrl(reader.result);
      console.log(imgUrl);
    };
  };

  return (
    <div>
      <div className="flex flex-col w-full pt-8 px-10">
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          multiple={true}
          onChange={onChangeFiles}
          accept="image/gif, image/jpeg, image/png, audio/*"
        />
        <label htmlFor="fileUpload"
               ref={dragRef}
               className={isDragging ? dragStyle : fileStyle}
        >
          <div className="m-4">
            {files?.object || files?.img ?
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col">
                    {musicName !== "" && <div>{musicName}</div>}
                    {imgName !== "" && <div>{imgName}</div>}
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleFilterFile()}
                  >
                    X
                  </div>
                </div> : <div>클릭 혹은 파일을 드래그 해주세요.</div>}
          </div>
        </label>
        <div className="text-red-600">노래 파일은 필수로 등록해야 합니다. 노래파일 등록 후 이미지 파일을 등록해 주세요.</div>
      </div>
    </div>
  );
};

export default Upload;