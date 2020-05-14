import React, { useState, useEffect } from "react";
import "./App.css";
import NewSession from "./components/newSession";
import axios from "axios";

function App() {
  const [session, setSession] = useState({});

  const currentSession = () => {
    return (
      <>
        <p>now in session</p>
        <p>{session.date}</p>
        <p>{session.host}</p>
      </>
    );
  };
  useEffect(() => {
    axios
      .get("api/sessions")
      .then(res => {
        const session = [...res.data].pop();
        setSession(session);
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <div className="App">
      <h1>SuperFun Whiskey Night</h1>
      <NewSession session={session} setSession={setSession} />
      {session === undefined ? (
        null
      ) : (
        currentSession()
      )}
    </div>
  );
}

export default App;
