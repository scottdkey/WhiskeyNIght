import React, { useContext } from "react";
import { UserContext } from "../../App.js";
import "../scss/Modal.scss";

const AttendeeFormat = ({ attendee, attending }) => {
  const [user, setUser] = useContext(UserContext);

  const chooseUser = () => {
    setUser(attendee.name);
  };


  //If this is the last item in array don't have a comma
  if (attending[attending.length - 1] === attendee) {
    return (
      <>
        <div
          className="attendee"
          id={attendee.name === user ? "selected" : null}
          onClick={chooseUser}
        >
          {attendee.name}{" "}
        </div>
      </>
    );
    //if this is not the last item have a space and a comma
  } else {
    return (
      <>
        <div
          className="attendee"
          // id={attendee.name === user ? "selected" : null}
          // onClick={chooseUser}
        >
          {`${attendee.name}, `}{" "}
        </div>
      </>
    );
  }
};

export default AttendeeFormat;
