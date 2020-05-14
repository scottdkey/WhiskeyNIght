import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"
import { useState } from "react";

const DeleteModal = ({ deleteItemName, deleteFunction }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  return (
    <>
      <Button variant="primary" onClick={toggleShow}>
        Delete
      </Button>
      <Modal show={show} onHide={toggleShow}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you Sure you want to Delete {deleteItemName}?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary" onClick={deleteFunction}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default DeleteModal;
