import React from "react";

const Header = session => {
  const pickedDate = new Date(session.date);
  return (
    <>
      <p>{session.host}</p>
      <div>{pickedDate.toDateString()}</div>
      <div>{pickedDate.toLocaleTimeString()} </div>
    </>
  );
};

export default Header;
