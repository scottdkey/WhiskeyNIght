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
    <>
      <Form.Control value={name} onChange={handleChange} />
    </>
  );
};

export default IngredientForm;
