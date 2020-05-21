import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState, useEffect } from "react";
import "../scss/buttonstyles.scss";
import "../scss/attendence.scss";

const Attendence = ({ id, setAttendees}) => {
  const [show, setShow] = useState(false);

  const [names, setNames] = useState("");

  const toggleShow = () => setShow(!show);
  const handleSubmit = e => {
    e.preventDefault();
    const nameArr = names.split(",");
    nameArr.forEach(name =>
      axios
        .post(`/api/sessions/${id}/attendees`, { name, going: true })
        .then(res => {
          setNames("");
          toggleShow();
          console.log(res);
        })
        .catch(e => console.log(e))
    );
  };
  const handleChange = e => {
    e.preventDefault();
    setNames(e.target.value);
  };

  useEffect(() => {
    if (id === undefined) {
      //do nothing
    } else {
      axios
        .get(`/api/sessions/${id}/attendees`)
        .then(res => setAttendees(res.data))
        .catch(e => console.log(e));
    }
  }, [show, id]);
  return (
    <>
      <button className="bttn rsvp" onClick={toggleShow}>
        RSVP
      </button>

      <Modal show={show} onHide={toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Text>Who is Attending?(Seperate with Commas)</Form.Text>
            <Form.Control value={names} onChange={handleChange}></Form.Control>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleShow}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Attendence;
