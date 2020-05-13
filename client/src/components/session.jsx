import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function Session() {
  const [session, setSession] = useState("");
  const [created, setCreated] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const createSession = (
    <>
      <Modal show={openModal} animation={false}>
        <Modal.Header closeButton onClick={toggleModal}>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  const currentSession = () => {};

  return (
    <>
      <h1>Whiskey Night</h1>
      {created ? (
        currentSession
      ) : (
        <Button variant="outline-success" onClick={toggleModal}>
          Create WN
        </Button>
      )}
      {createSession}
    </>
  );
}

export default Session;
