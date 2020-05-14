import React, { useState, useEffect } from "react";
import "./App.css";
import NewSession from "./components/newSession";
import axios from "axios";
import moment from "moment";
import "moment-timezone";

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
    console.log(session)
    return (
      <>
        <p>now in session</p>
        <div>{session.date}</div>
        <p>{session.host}</p>
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
