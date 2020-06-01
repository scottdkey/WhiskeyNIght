import React from "react";
import Modal from "react-bootstrap/Modal";

import "../scss/buttonstyles.scss";
import "../scss/Modal.scss";
import "../scss/DeleteModal.scss";

const DeleteModal = ({ text, deleteFunction, toggleModal, show }) => {
  const handleSubmit = () => {
    toggleModal();
    deleteFunction();
  };

  return (
    <Modal show={show} onHide={toggleModal}>
      <div className="custom-modal">
        <div className="header">
          <div className="title">Delete</div>
          <button className="bttn cancel" type="button" onClick={toggleModal} />
        </div>

        <div className="body">
            <div className="question">Are you sure you want to delete</div>
            <h3 className="item-name">{text}</h3>
        </div>

        <div className="footer">
          <button className="bttn cancel" onClick={toggleModal}>
            Cancel
          </button>

          <button className="bttn delete" onClick={handleSubmit}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
