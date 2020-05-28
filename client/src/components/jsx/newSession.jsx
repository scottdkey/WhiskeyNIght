import React, { useState } from "react";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import "../scss/buttonstyles.scss";
import "../scss/newSession.scss";

const Session = props => {
  const [host, setHost] = useState(values.te);
  const [date, setDate] = useState(new Date());

  const handleSubmit = e => {
    console.log(date);
    axios
      .post("api/sessions", { host, date })
      .then(res => {
        props.setSession({ id: res.data.id, date, host });
        setDate(new Date());
        setHost("");
      })
      .catch(e => console.log(e));
  };

  return (
    <div className="new-session">
      <div>
        <div className="header">Create New Whiskey Night</div>
        <div className="date-area">
          <Flatpickr
            className="picker"
            data-enable-time
            value={date}
            options={{
              minDate: "today",
              dateFormat: "F J\\, h K",
              enableTime: true,
              minTime: "16:00",
              maxTime: "22:00"
            }}
            onChange={date => {
              setDate(...date);
            }}
          />
          <div className="info">Pick Date</div>
        </div>
        <div className="button-container">
          <button
            className={`bttn host left-host ${
              host === values.te ? "active" : ""
            }`}
            active={values.te}
            onClick={e => setHost(e.target.name)}
            name={values.te}
          >
            {values.te}
          </button>
          <button
            className={`bttn host right-host ${
              host === values.kj ? "active" : ""
            }`}
            isactive={host === values.kj ? values.kj : null}
            onClick={e => setHost(e.target.name)}
            name={values.kj}
          >
            {values.kj}
          </button>
        </div>
        <div className="create-new">
          <button onClick={handleSubmit} className="bttn submit">
            Create New
          </button>
        </div>
      </div>
    </div>
  );
};

export default Session;

const values = {
  te: "Tyler and Emily's",
  kj: "Kevin and Jill's"
};
