import React, { useState, useEffect } from "react";
import "./App.css";
import NewSession from "./components/newSession";
import axios from "axios";
import Attendence from "./components/attendence";

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
    const pickedDate = new Date(session.date)
    return (
      <>
        <p>{session.host}</p>
        <div>{pickedDate.toDateString()}</div>
        <div>{pickedDate.toLocaleTimeString()} </div>
        <Attendence />
      </>
    );
  };

  return (
    <div className="App">
      <h1>SuperFun Whiskey Night</h1>
      <NewSession session={session} setSession={setSession} />
      {session === undefined ? null : <CurrentSession/>}
    </div>
  );
}

export default App;
