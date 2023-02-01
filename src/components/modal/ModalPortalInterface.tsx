import ReactDOM from "react-dom";
import React from "react";

type ModalInterfaceFun = (arg: {
  isOpen: boolean;
  children?: React.ReactNode;
}) => JSX.Element;

const ModalPortalInterface: ModalInterfaceFun = ({ isOpen, children }) => {
  if (!isOpen) return <></>;

  return ReactDOM.createPortal(children, document.getElementById("modal")!);
};

export default ModalPortalInterface;






