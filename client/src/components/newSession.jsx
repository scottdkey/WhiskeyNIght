import React, { useState } from "react";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import "react-datepicker/dist/react-datepicker.css";
import "./newSession.scss";

const Session = props => {
  const [host, setHost] = useState(values.te);
  const [date, setDate] = useState(new Date());

  const handleSubmit = e => {
    axios
      .post("api/sessions", { host, date })
      .then(res => {
        console.log(res);
        props.setSession({ id: res.data.id, date: res.data.date, host });
        setDate(new Date());
        setHost("");
        // setOpenModal(false);
      })
      .catch(e => console.log(e));
  };

  return (
    <div className="new-session">
      <div>
        <div className="header">
          <h1>Create New Whiskey Night</h1>
        </div>
        <Flatpickr
          data-enable-time
          value={date}
          onChange={date => {
            setDate(date);
          }}
        />
        {/* <Datetime onChange={date => setDate(date)} value={date} className="datetime"/> */}
        <div className="button-container">
          <button
            className={`leftmost ${host === values.te ? "active" : ""}`}
            active={values.te}
            onClick={e => setHost(e.target.name)}
            name={values.te}
          >
            {values.te}
          </button>
          <button
            className={`rightmost ${host === values.kj ? "active" : ""}`}
            isactive={host === values.kj ? values.kj : null}
            onClick={e => setHost(e.target.name)}
            name={values.kj}
          >
            {values.kj}
          </button>
        </div>

        <button onClick={handleSubmit} className="button" id="submit">
          Create New
        </button>
      </div>
    </div>
  );
};

export default Session;

const values = {
  te: "Tyler and Emily's",
  kj: "Kevin and Jill's"
};
