import React from 'react'

const BringAllModal = ({bringAll, item, toggleModal, handleSubmit}) =>{


  return (
    <form className="custom-modal">
      <div className="head">{bringAll ? "Uncheck All?" : "Bring All?"}</div>
      <div className="body">
        {bringAll
          ? `Remove your name from ${item.label}?`
          : `Bring everything from the item ${item.label}?`}
      </div>
      <button type="button" className="bttn cancel" onClick={toggleModal}>
        Cancel
      </button>
      <button type="submit" className="bttn submit" onClick={handleSubmit}>
        Yes!
      </button>
    </form>
  );
}


export default BringAllModal