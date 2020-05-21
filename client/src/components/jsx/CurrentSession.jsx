import React from "react";
import ItemList from "./itemList";
import Header from "./Header";

const CurrentSession = ({session, setSession}) => {
  return (
    <>
      <Header session={session} setSession={setSession}/>
      <div>
        <div style={styles.foodForm}>
          <ItemList id={session.id} listType="food" />
        </div>
        <div style={styles.foodForm}>
          <ItemList id={session.id} listType="drinks" />
        </div>
      </div>
    </>
  );
};

export default CurrentSession;

const styles = {
  foodForm: {
    width: "50%",
    display: "inline-block"
  }
};
