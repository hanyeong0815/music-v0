import React, {ChangeEvent, FunctionComponent as FC, useCallback, useEffect, useRef, useState} from "react";

interface UploadProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFileTypes {
  id: number; // 파일들의 고유값 id
  object: File;
  img: File | null;
}

const Upload:FC<UploadProps> = ({setIsOpen}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragRef = useRef<HTMLLabelElement | null>(null);

  const fileStyle = "w-full h-[200px] flex flex-col justify-center items-center border-2 border-solid border-black rounded-3xl cursor-pointer ease-in duration-100 bg-gray-300";
  const dragStyle = `w-full h-[200px] flex flex-col justify-center items-center border-2 border-solid border-black rounded-3xl cursor-pointer ease-in duration-100 bg-gray-600 text-white`;

  // 각 선택했던 파일들의 고유값 id
  const fileId = useRef<number>(0);
  const [files, setFiles] = useState<IFileTypes[]>([]);

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
      let selectFiles: File[];
      let tempFiles: IFileTypes[] = files;

      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }


      for (const file of selectFiles) {
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++,
            object: file,
            img: null,
          }
        ];
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
    // 앞서 말했던 4개의 이벤트에 Listener를 등록합니다. (마운트 될때)

    if (dragRef.current === null) {
      return;
    }
    dragRef.current.addEventListener("dragenter", handleDragIn);
    dragRef.current.addEventListener("dragleave", handleDragOut);
    dragRef.current.addEventListener("dragover", handleDragOver);
    dragRef.current.addEventListener("drop", handleDrop);
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    // 앞서 말했던 4개의 이벤트에 Listener를 삭제합니다. (언마운트 될때)

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

  const handleFilterFile = useCallback((id: number): void => {
    // 매개변수로 받은 id와 일치하지 않는지에 따라서 filter 해줍니다.
    setFiles(files.filter((file: IFileTypes) => file.id !== id));
  }, [files]);

  return (
    <div>
      <div>
        <div className="flex flex-col justify-center items-center w-full pt-8 px-10">
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
              {files.length > 0 ?
                files.map((file: IFileTypes) => {
                  const {
                    id,
                    object: { name }
                  } = file;

                  return (
                    <div key={id} className=" flex flex-row gap-4">
                      <div>{name}</div>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleFilterFile(id)}
                      >
                        X
                      </div>
                    </div>
                  );
                }) : <div>클릭 혹은 파일을 드래그 해주세요.</div>}
            </div>
          </label>
          <div className="text-red-600">노래 파일은 필수로 등록해야 합니다. 노래파일 등록 후 이미지 파일을 등록해 주세요.</div>
        </div>
      </div>
    </div>
  );
};

export default Upload;