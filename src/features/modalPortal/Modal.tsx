import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps): React.ReactPortal => {

  return ReactDOM.createPortal(
    <></>
  , document.body)
}

export default Modal;
