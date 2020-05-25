import React, { useState, useEffect } from "react";
import "../src/components/scss/App.scss";
import axios from "axios";
import NoSession from "./components/jsx/NoSession";
import {useLocalState} from './components/jsx/hooks'
import CurrentSession from "./components/jsx/CurrentSession";
import NewSession from "./components/jsx/newSession";


export const UserContext = React.createContext();
export const EventContext = React.createContext();

function App() {
  const [session, setSession] = useState({});
  const [user, setUser] = useLocalState('user')

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
      <UserContext.Provider value={[user, setUser]}>
        {session === undefined ? (
          <NewSession sesison={session} setSession={setSession} />
        ) : null}

        {session === undefined ? (
          <NoSession />
        ) : (
          <CurrentSession session={session} setSession={setSession} />
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
