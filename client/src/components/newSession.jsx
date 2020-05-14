import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import Datetime from "react-datetime";
import moment from "moment";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const Session = props => {
  const [openModal, setOpenModal] = useState(false);
  const [host, setHost] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const deleteSession = () => {
    axios
      .delete(`/api/sessions/${props.session.id}`)
      .then(res => {
        console.log(res);
      })
      .catch(e => console.log(e));

    props.setSession();
  };

  const handleSubmit = e => {
    const completeDate = new Date(`${date} ${time}`);
    console.log(completeDate);
    axios
      .post("api/sessions", { host, date: completeDate })
      .then(res => {
        console.log(res);
        props.setSession({ id: res.data.id, date: res.data.date, host });
        setDate(new Date());
        setHost("");
        setOpenModal(false);
      })
      .catch(e => console.log(e));
  };

  return (
    <>
      {props.session === undefined ? (
        <Button variant="outline-success" onClick={toggleModal}>
          Create WN
        </Button>
      ) : (
        <Button onClick={deleteSession}>Delete Session</Button>
      )}

      <Modal show={openModal} animation={false}>
        <Modal.Header closeButton onClick={toggleModal}>
          <Modal.Title>Create New Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {host === "" ? "Choose Location" : host}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={e => setHost(e.target.name)}
                name={values.te}
              >
                {values.te}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={e => setHost(e.target.name)}
                name={values.kj}
              >
                {values.kj}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Datetime onChange={date => setDate(date)} value={date} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Session;

const values = {
  te: "Tyler and Emily's",
  kj: "Kevin and Jill's"
};
