import React from "react";
import CheckMark from "../../images/check_icon.svg";
import "../scss/Checkbox.scss";

const Checkbox = ({ checked }) => {
  const className = checked ? "checked" : "unchecked";

  return (
    <>
      <div className="checkbox">
        {/* actual checkbox shape */}
        <div className={className}>
          {checked ? <img src={CheckMark} alt="checkmark"/> : null}
        </div>
      </div>
    </>
  );
};

export default Checkbox;
