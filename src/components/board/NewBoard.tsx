import {FunctionComponent as FC} from "react";
import {CommonDivProps} from "@models/common/props";

interface NewBoardProps extends CommonDivProps{
  setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>;
}

const NewBoard:FC<NewBoardProps> = (props) => {
  const {setIsOpen} = props;
  console.log("호출 됨");
  return (
    <div className="">
      
    </div>
  );
};

export default NewBoard;