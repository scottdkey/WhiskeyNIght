import React, { useState } from "react";
import Checkbox from "react-simple-checkbox";
import "../scss/ItemCard.scss"

const IngredientRender = ({ ingredient }) => {
  const [checked, setChecked] = useState(false)

  const handleChange = () =>{
    console.log('handling change')
  }
  const toggleChecked = () =>{
    setChecked(!checked)
  }
  return (
    <div className="ingredient" onClick={toggleChecked}>
      <Checkbox
        color={checkboxColor}
        checked={checked}
        borderThickness="3"
        onChange={handleChange}
        size="4"
      />
      <div className="i-name">{ingredient.name}</div>
      <div>{ingredient.assigned}</div>
    </div>
  );
};

export default IngredientRender;

const checkboxColor = {
  backgroundColor: "#8b55ff",
  tickColor: "white",
  borderColor: "purple",
  uncheckedBorderColor: "yellow"
};