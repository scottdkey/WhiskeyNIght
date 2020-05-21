import React from "react";
import ItemList from "./itemList";
import Header from "./Header";

const CurrentSession = ({session, setSession}) => {
  return (
    <>
      <Header session={session} setSession={setSession}/>
      <div className="row">
        <div className="column" style={{paddingRight: "100px"}}>
          <ItemList id={session.id} listType="Food" />
        </div>
        <div className="column" style={{paddingLeft:"100px"}}>
          <ItemList id={session.id} listType="Drinks" />
        </div>
      </div>
    </>
  );
};

export default CurrentSession;

