import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const IngredientForm = ({ ingredient, index, update }) => {
  const [name, setName] = useState("");

  const handleChange = e => {
    setName(e.target.value);
    ingredient.name = e.target.value;
    update(ingredient, index);
  };

  return (
    <div className="ingredient-item">
      <div className="symbol lead"/>
      <input
        className="ingredient-form"
        required="true"
        value={name}
        onChange={handleChange}
        placeholder="ingredient of the thing"
      />
    </div>
  );
};

export default IngredientForm;
