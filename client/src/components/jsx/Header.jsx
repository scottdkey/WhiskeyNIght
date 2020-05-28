import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import axios from "axios";
import AttendeeFormat from "./AttendeeFormat";
import moment from "moment";
import "moment-timezone";
import "../scss/Header.scss";
import "../scss/buttonstyles.scss";
import RSVPModal from "./RSVPModal";

const Header = ({ session, setSession }) => {
  const [show, setShow] = useState(false);
  const [attending, setAttending] = useState([]);
  const event = moment(session.date)
    .tz("America/Boise")
    .format("MMM Do hh:mm a");

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
      <div className="shape">
        {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon fill="white" points="0,0 100%,0 100%,21% 0,39%" />
          </svg> */}
      </div>
      <div className="sub-header">
        <div className="event">
          <div className="date">{event}</div>
          <div className="host">{session.host}</div>
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
            <RSVPModal
              id={session.id}
              setAttendees={setAttending}
              show={show}
              toggleShow={toggleShow}
            />
          </div>
        </div>

        <div className="delete-area">
          <DeleteModal
            text="Event"
            buttonText="Delete Event"
            deleteFunction={deleteSession}
            customClass="bttn delete-button"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
