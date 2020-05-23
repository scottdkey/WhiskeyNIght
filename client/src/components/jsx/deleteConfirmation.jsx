import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"
import { useState } from "react";
import "../scss/buttonstyles.scss";

const DeleteModal = ({ text, deleteFunction, customClass, buttonText }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    return setShow(!show);
  };

  const handleSubmit = () => {
    toggleShow()
    deleteFunction()
  }

  return (
    <>
      <button className={customClass} onClick={toggleShow}>
        {buttonText}
      </button>
      <Modal show={show} onHide={toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete {text}?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={toggleShow}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
