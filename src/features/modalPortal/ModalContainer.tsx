import { useState, useCallback } from "react";
import Modal from "./Modal";

const ModalContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onModalOpen = () => {
    setIsModalOpen(true);
  }

  return (
    <>
      <h3>Modal Window</h3>
      <button onClick={onModalOpen}>Open Modal</button>
      <Modal onClose={onModalClose} isOpen={isModalOpen}>
        <h4>Modal title</h4>
        <p>Modal description</p>
      </Modal>
    </>
  );
};

export default ModalContainer;
