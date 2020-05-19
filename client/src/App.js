import React, { useState, useEffect } from "react";
import "./App.css";
import NewSession from "./components/newSession";
import axios from "axios";
import Attendence from "./components/attendence";
import ItemList from "./components/itemList";
import Form from "react-bootstrap/Form";

function App() {
  const [session, setSession] = useState({});

  useEffect(() => {
    axios
      .get("api/sessions")
      .then(res => {
        const session = [...res.data].pop();
        setSession(session);
      })
      .catch(e => console.log(e));
  }, []);

  const CurrentSession = () => {
    const pickedDate = new Date(session.date);
    return (
      <>
        <p>{session.host}</p>
        <div>{pickedDate.toDateString()}</div>
        <div>{pickedDate.toLocaleTimeString()} </div>

        <Attendence id={session.id} />
        <Form>
          <Form.Group style={styles.foodForm}>
            <ItemList id={session.id} listType="food" />
          </Form.Group>
          <Form.Group style={styles.foodForm}>
            <ItemList id={session.id} listType="drinks" />
          </Form.Group>
        </Form>
      </>
    );
  };

  const noSession = () => (
    <div className="no-session">
      <div id="right-triangle"></div>
      <div className="left">
        <div className="diamond medium" id="one" />
        <div className="diamond medium" id="four" />
        <div className="diamond small" id="five" />
        <div id="boxGroupLeft">
          <div className="diamond large" id="two" />
          <div className="diamond small" id="three" />
        </div>
      </div>
      <div className="right">
        <div className="diamond small" id="six" />
        <div className="diamond medium" id="seven" />
        <div className="diamond medium-large" id="eight" />
        <div className="diamond large" id="nine" />
        <div className="diamond medium" id="ten" />
        <div className="diamond medium-small" id="eleven" />
        <div className="diamond medium" id="twelve" />
      </div>
    </div>
  );

  return (
    <div className="App">
      <NewSession session={session} setSession={setSession} />
      {session === undefined ? noSession() : CurrentSession()}
    </div>
  );
}

export default App;

const styles = {
  foodForm: {
    width: "50%",
    display: "inline-block"
  }
};
