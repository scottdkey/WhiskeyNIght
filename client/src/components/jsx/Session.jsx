import React, { useContext } from "react";
import ItemList from "./itemList";
import Header from "./Header";
import NoSession from "./NoSession";
import NewSession from "./newSession"
import { SessionContext } from "../../App";
import "../scss/Session.scss";

const Session = () => {
  const [session] = useContext(SessionContext);
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
        <Header/>
        <div className="content-container">
          <div className="offset">
            <ItemList session={session} listType="Food" />
          </div>
          <div>
            <ItemList session={session} listType="Drinks" />
          </div>
        </div>
      </>
    );
  }
};

export default Session;
