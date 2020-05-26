import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import axios from "axios";
import AttendeeFormat from "./AttendeeFormat";
import moment from "moment";
import "moment-timezone";
import "../scss/Header.scss";
import RSVPModal from "./RSVPModal";

const Header = ({ session, setSession }) => {
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

  return (
    <div className="main-header">
      <div className="shape" />
      <div className="sub-header">
        <div className="event">
          <div id="date">{event}</div>
          <div id="host">{session.host}</div>
          <div id="count">{attending.length} {attending.length === 1 ? "Person" : "People"}</div>
          <div id="attendees">
            {attending.map(attendee => (
              <AttendeeFormat
                attendee={attendee}
                attending={attending}
                key={attendee.id}
              />
            ))}
          </div>
          <div>
            <RSVPModal id={session.id} setAttendees={setAttending} />
          </div>
        </div>

        <div className="delete-area">
          <DeleteModal
            text="Event"
            buttonText="Delete Event"
            deleteFunction={deleteSession}
            customClass="bttn delete-confirmation"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
