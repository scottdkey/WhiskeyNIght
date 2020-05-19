import React from "react";
import DeleteModal from "./deleteConfirmation";
import axios from "axios";
import Attendence from './attendence'
import moment from 'moment'
import "moment-timezone"
import "./Header.scss";

const Header = ({ session, setSession }) => {
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
  return (
    <div className="header">
      <div className="shape" />
      <div className="event-info">
        <p>{session.host}</p>
        <div>{event}</div>
        <div className="rsvp-modal">
          <Attendence id={session.id} />
        </div>
      </div>
      <div className="right-box">
        <DeleteModal
          deleteItemName="This Session"
          deleteFunction={deleteSession}
        >
          Delete Session
        </DeleteModal>
      </div>
    </div>
  );
};

export default Header;

const month = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]