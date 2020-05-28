import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import deleteIcon from "../../images/trash-can.svg";
import "../scss/buttonstyles.scss";
import "../scss/Modal.scss";

const DeleteModal = ({ text, deleteFunction, customClass, buttonText }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    return setShow(!show);
  };

  const handleSubmit = () => {
    toggleShow();
    deleteFunction();
  };

  return (
    <>
      <button className={customClass} onClick={toggleShow}>
        <div className="delete-text">{buttonText}</div>
        <img className="delete-icon" src={deleteIcon} alt="trash can"/>
      </button>
      <Modal show={show} onHide={toggleShow}>
        <div
          className="custom-modal modal-content"
          style={{ borderRadius: "20px" }}
        >
          <div className="header" closebutton="true">
            <div className="title">Delete</div>
          </div>

          <div className="body">
            <p className="text">Are you sure you want to delete</p>
            <h3 className="item-name">{text}</h3>
          </div>

          <div className="footer">
            <button className="bttn cancel" onClick={toggleShow}>
              Cancel
            </button>

            <button className="bttn delete" onClick={handleSubmit}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
