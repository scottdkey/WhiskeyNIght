import React, { useState, useContext } from "react";
import { SessionContext } from "../../App";
import DeleteModal from "./DeleteModal";
import axios from "axios";
import AttendeeFormat from "./AttendeeFormat";
import moment from "moment";
import "moment-timezone";
import "../scss/Header.scss";
import "../scss/buttonstyles.scss";
import RSVPModal from "./RSVPModal";
import trashIcon from "../../images/trash_icon.svg"
import map from "../../images/map_icon.svg"

const Header = () => {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [attending, setAttending] = useState([]);
  const [session, setSession] = useContext(SessionContext);

  const event = moment(session.date)
    .tz("America/Boise")
    .format("MMM Do, h a");

  const deleteSession = () => {
    axios
      .delete(`/api/sessions/${session.id}`)
      .then(res => {})
      .catch(e => console.log(e));
    setSession();
  };

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className="main-header">
      <div className="shape" />
      <div className="sub-header">
        <div className="event">
          <div className="date">{event}</div>
          <div className="host">
            <div className="name">{session.host}</div>
            <img src={map} className="image"/>
          </div>
          <div id="count">
            {attending.length} {attending.length === 1 ? "Person" : "People"}
          </div>
          <div className="attendees">
            {attending.map(attendee => (
              <AttendeeFormat
                attendee={attendee}
                attending={attending}
                key={attendee.id}
              />
            ))}
          </div>
          <div>
            <button className="bttn rsvp button-position" onClick={toggleShow}>
              RSVP
            </button>
          </div>
        </div>

        <div className="delete-area">
          <button
            className="bttn delete-button"
            onClick={() => setShowDelete(true)}
          >
            {/* <div className="delete-text">Delete Event</div> */}
            <img className="trash-icon" src={trashIcon} alt="trash can" />
          </button>
          <DeleteModal
            text="Event"
            deleteFunction={deleteSession}
            show={showDelete}
            toggleModal={() => setShowDelete(!showDelete)}
          />
          <RSVPModal
            id={session.id}
            setAttendees={setAttending}
            show={show}
            toggleShow={toggleShow}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
