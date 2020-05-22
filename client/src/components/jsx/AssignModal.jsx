import React from 'react'
import Modal from 'react-bootstrap/Modal'

const AssignModal = ({open, toggleModal, item}) =>{

  const handleSubmit = () => {
    console.log("submit hit")
  }
  return (
    <Modal show={open} onHide={toggleModal}>
      <div className="modal-head"></div>
      <div>Modal Content</div>
      <button onClick={toggleModal}>Close</button>
      <button onClick={handleSubmit}>Submit</button>
    </Modal>
  )
}

export default AssignModal