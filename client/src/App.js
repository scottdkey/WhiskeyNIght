import React, { useState, useEffect } from "react";
import "./App.css";
import NewSession from "./components/newSession";
import axios from "axios";
import NoSession from "./components/NoSession";
import CurrentSession from "./components/CurrentSession";

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

  return (
    <div className="App">
      {session === undefined ? (
        <NewSession session={session} setSession={setSession} />
      ) : null}

      {session === undefined ? NoSession() : CurrentSession(session)}
    </div>
  );
}

export default App;
