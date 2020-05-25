import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { UserContext } from "../../App";
import "../scss/buttonstyles.scss";
import "../scss/attendence.scss";

const Attendence = ({ id, setAttendees }) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [names, setNames] = useState("");

  const toggleShow = () => {
    setShow(!show);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const nameArr = names.split(",").map(item => item.trim());
    setUser(names)
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
  }, [show, id, setAttendees]);
  return (
    <>
      <button className="bttn rsvp" onClick={toggleShow}>
        RSVP
      </button>

      <Modal show={show} onHide={toggleShow}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Text>Who is Attending?(Seperate with Commas)</Form.Text>
            <Form.Control value={names} onChange={handleChange}></Form.Control>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleShow}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Attendence;
