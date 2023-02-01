import {FunctionComponent as FC} from "react";
import {CommonDivProps} from "@models/common/props";
import ModalPortalInterface from "@components/modal/ModalPortalInterface";

export interface ModalProps extends CommonDivProps {
  isOpen: boolean;
}

const Modal:FC<ModalProps> = (props) => {
  const { isOpen, children, className, ...restProp } = props;

  return (
    <ModalPortalInterface isOpen={isOpen}>
      <div {...restProp} className={`border rounded-md shadow-md p-8 ${className}`}>
        {children}
      </div>
    </ModalPortalInterface>
  );
};

export default Modal;