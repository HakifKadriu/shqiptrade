import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const CenteredModal = () => {
  const [show, setshow] = useState(false);

  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);

  return (
    <Modal show={show} centered>
      <Modal.Header
        closeButton
        className="dark:bg-secondd dark:text-white border-0 rounded-0"
        onHide={handleClose}
      >
        <Modal.Title>Hi</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default CenteredModal;
