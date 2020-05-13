import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const Session = () => {
  const [openModal, setOpenModal] = useState(false);
  const [location, setLocation] = useState("");
  const [sessionID, setSessionID] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleChange = e => {
    setLocation(e.target.name);
  };

  const handleSubmit = e => {
    axios
      .post("api/sessions", { host: location, date: selectedDate })
      .then(res => {
        setLocation(res.data.host)
        setSessionID(res.data.id)
        setSelectedDate(new Date(res.data.date))

        setOpenModal(false);
      })
      .catch(e => console.log(e));
  };

  const createSession = (
    <>
      <Modal show={openModal} animation={false}>
        <Modal.Header closeButton onClick={toggleModal}>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {location === "" ? "Choose Location" : location}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleChange} name={values.te}>
                {values.te}
              </Dropdown.Item>
              <Dropdown.Item onClick={handleChange} name={values.kj}>
                {values.kj}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            fixedHeight={true}
          />
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
    const getSessions = () => {
      axios
        .get("api/sessions")
        .then(res => {
          const session = [...res.data].pop();
          setSelectedDate(session.date);
          setLocation(session.host);
          setSessionID(session.id);
        })
        .catch(e => console.log(e));
    };

    const deleteSession = () => {
      axios
        .delete(`/api/sessions/${sessionID}`)
        .then(res => {
          setSessionID(null)
          setSelectedDate(new Date())
          setLocation("")
        })
        .catch(e => console.log(e));

      getSessions()
    };

  useEffect(() => {
    getSessions()
  }, [getSessions]);



  const currentSession = () => {
    return (
      <>
        <p>now in session</p>

        <Button onClick={deleteSession}>Delete Session</Button>
      </>
    );
  };

  return (
    <>
      <h1>Whiskey Night</h1>
      {sessionID != null ? (
        currentSession()
      ) : (
        <Button variant="outline-success" onClick={toggleModal}>
          Create WN
        </Button>
      )}
      {createSession}
    </>
  );
};

export default Session;

const values = {
  te: "Tyler and Emily's",
  kj: "Kevin and Jill's"
};
