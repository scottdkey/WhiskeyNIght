import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { UserContext } from "../../App";
import "../scss/buttonstyles.scss";
import "../scss/Modal.scss";

const RSVPModal = ({ id, setAttendees, toggleShow, show }) => {
 
  const [user, setUser] = useContext(UserContext);
  const [names, setNames] = useState("");


  const handleSubmit = e => {
    e.preventDefault();
    const nameArr = names.split(",").map(item => item.trim());
    setUser(names);
    nameArr.forEach(name =>
      axios
        .post(`/api/sessions/${id}/attendees`, { name, going: true })
        .then(res => {
          setNames("");
          toggleShow();
          console.log(res);
        })
        .catch(e => console.log(e))
    );
    setNames("");
  };
  const handleChange = e => {
    // e.preventDefault();
    setNames(e.target.value);
  };

  useEffect(() => {
    if (id === undefined) {
      //do nothing
    } else {
      axios
        .get(`/api/sessions/${id}/attendees`)
        .then(res => setAttendees(res.data))
        .catch(e => console.log(e));
    }
  }, [show, id, setAttendees]);
  return (
    <>
      <Modal show={show} onHide={toggleShow}>
        <form className="custom-modal" onSubmit={handleSubmit}>
          <div className="header">
            <div className="rsvp-header">
              <div className="title">RSVP</div>
              <button
                className="bttn cancel"
                type="button"
                onClick={toggleShow}
              >
                {String.fromCharCode(65291)}
              </button>
            </div>
          </div>
          <div className="body">
            <div className="rsvp-label">Who is coming?</div>
            <div className="name-input-container">
              <input
                style={{ textAlign: "center" }}
                className="name-input"
                type="text"
                value={names}
                onChange={handleChange}
                placeholder="Name(s)"
                required
                autoFocus
              />
            </div>
            <div className="name-support">Supports comma seperated names</div>
          </div>
          <div className="footer">
            <button className="bttn save-changes" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default RSVPModal;
