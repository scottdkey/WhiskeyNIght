import React from "react";
import IngredientForm from "./ingredientForm";
import "../scss/Modal.scss";

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
  <div className="custom-modal">
    <div className="header">
      <div className="title">Add {listType}</div>
      <button className="cancel" type="button" onClick={toggleModal}>
        {String.fromCharCode(65291)}
      </button>
    </div>
    <div className="body">
      <div className="items-body">
        <input
          className="item-input"
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
      </div>
    </div>
    <div className="modal-footer">
      <button onClick={handleSubmit}>Save changes</button>
    </div>
  </div>
);
export default ModalContent;
