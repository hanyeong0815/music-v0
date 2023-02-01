import ReactDOM from "react-dom";
import { FunctionComponent as FC } from "react";
import {CommonDivProps} from "@models/common/props";

const ModalInterface: FC<CommonDivProps> = ({ children }) => {
  return ReactDOM.createPortal(children, document.getElementById("modal")!);
};

export default ModalInterface;