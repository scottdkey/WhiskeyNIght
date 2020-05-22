import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"
import "../scss/buttonstyles.scss"
import { useState } from "react";

const DeleteModal = ({ text, deleteFunction, customClass, buttonText }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    return setShow(!show);
  };

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
          <Button variant="primary" onClick={deleteFunction}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
