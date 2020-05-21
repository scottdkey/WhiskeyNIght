import React, { useState, useEffect } from "react";
import "../src/components/scss/App.scss";
import axios from "axios";
import NoSession from "./components/js/NoSession";
import CurrentSession from "./components/js/CurrentSession";
import NewSession from "./components/js/newSession";

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
        <NewSession sesison={session} setSession={setSession} />
      ) : null}

      {session === undefined ? (
        <NoSession />
      ) : (
        <CurrentSession session={session} setSession={setSession} />
      )}
    </div>
  );
}

export default App;
