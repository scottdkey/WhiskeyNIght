import React from "react";
import ItemList from "./itemList";
import Header from "./Header";
import "../scss/CurrentSession.scss";

const CurrentSession = ({ session, setSession }) => {
  return (
    <div>
      <Header session={session} setSession={setSession} />
      <div className="content-container">
        <div>
          <ItemList id={session.id} listType="Food" />
        </div>
        <div>
          <ItemList id={session.id} listType="Drinks" />
        </div>
      </div>
    </div>
  );
};

export default CurrentSession;
