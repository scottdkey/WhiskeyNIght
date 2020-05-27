import React from "react";
import "../scss/Checkbox.scss";

const Checkbox = ({checked}) => {

  const className = checked ? "checked" : "unchecked";

  return (
    <>
      <div className="checkbox">
        {/* actual checkbox shape */}
        <div className={className}>{checked ? "\u2713" : null}</div>
      </div>
    </>
  );
};

export default Checkbox;
