import React from "react";
import IngredientForm from "./ingredientForm"

const ModalContent = ({
  listType,
  ingredients,
  addIngredient,
  toggleModal,
  handleSubmit,
  updateIngredients,
  label,
  setLabel
}) => (
  <div className="modal-body">
    <div className="modal-header">
      <div>Add {listType}</div>
    </div>
    <label>Name</label>
    <input
      type="text"
      placeholder="babaganoosh or something"
      value={label}
      onChange={e => {
        e.preventDefault();
        setLabel(e.target.value);
      }}
      required
    />
    <label>Ingredients</label>

    {ingredients.map((ingredient, index) => (
      <IngredientForm
        key={ingredient + index}
        ingredient={ingredient}
        index={index}
        update={updateIngredients}
      />
    ))}
    <button onClick={addIngredient}>Add Ingredient</button>
    <div className="modal-footer">
      <button onClick={toggleModal}>Close</button>
      <button onClick={handleSubmit}>Save changes</button>
    </div>
  </div>
);
export default ModalContent;
