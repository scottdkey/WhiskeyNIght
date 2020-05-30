import React, { useContext } from "react";
import ItemList from "./itemList";
import Header from "./Header";
import NoSession from "./NoSession";
import NewSession from "./newSession"
import { SessionContext } from "../../App";
import "../scss/Session.scss";

const Session = () => {
  const [session, setSession] = useContext(SessionContext);
  if (session === undefined) {
    return (
      <>
        <NewSession />
        <NoSession />
      </>
    );
  } else {
    return (
      <>
        <Header session={session} setSession={setSession} />
        <div className="content-container">
          <div className="offset">
            <ItemList id={session.id} listType="Food" />
          </div>
          <div>
            <ItemList id={session.id} listType="Drinks" />
          </div>
        </div>
      </>
    );
  }
};

export default Session;
