import React, { useState } from "react";
import DeleteModal from "./deleteConfirmation";
import axios from "axios";
import Attendence from "./attendence";
import moment from "moment";
import "moment-timezone";
import "../scss/Header.scss";

const Header = ({ session, setSession }) => {
  const [attending, setAttending] = useState([]);
  const event = moment(session.date)
    .tz("America/Boise")
    .format("MMM Do hh:mm a");

  const deleteSession = () => {
    axios
      .delete(`/api/sessions/${session.id}`)
      .then(res => {
        console.log(res);
      })
      .catch(e => console.log(e));
    setSession();
  };
  const attendeeFormat = attendee => {
    //If this is the last item in array don't have a comma
    if (attending[attending.length - 1] === attendee) {
      return <React.Fragment key={attendee.id}>{attendee.name}</React.Fragment>;
      //if this is not the last item have a space and a comma
    } else {
      return (
        <React.Fragment
          key={attendee.id}
        >{`${attendee.name}, `}</React.Fragment>
      );
    }
  };
  return (
    <div className="main-header">
      <div className="shape" />
      <div className="sub-header">
        <div className="event">
          <div id="date">{event}</div>
          <div id="host">{session.host}</div>
          <div id="count">{attending.length} People</div>
          <div id="attendees">
            {attending.map(attendee => attendeeFormat(attendee))}
          </div>
          <div>
            <Attendence id={session.id} setAttendees={setAttending} />
          </div>
        </div>

        <div className="delete-area">
          <DeleteModal
            text="Event"
            buttonText="Delete Event"
            deleteFunction={deleteSession}
            customClass="bttn delete-confirmation"
          >
            Delete Session
          </DeleteModal>
        </div>
      </div>
    </div>
  );
};

export default Header;
