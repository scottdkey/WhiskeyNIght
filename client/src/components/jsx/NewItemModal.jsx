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
  <form className="custom-modal">
    <div className="header">
      <div className="title">Add {listType}</div>
      <button className="cancel" type="button" onClick={toggleModal}>
        {String.fromCharCode(65291)}
      </button>
    </div>
    <div className="body">
      <div className="items-body">
        <div className="head">
          <div className="symbol head-float" />
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
        </div>
        <div className="ingredient-form-container">
          {ingredients.map((ingredient, index) => (
            <IngredientForm
              key={ingredient + index}
              ingredient={ingredient}
              index={index}
              update={updateIngredients}
            />
          ))}
        </div>
        <div className="add-ingredient" onClick={addIngredient}>
          <div className="symbol filled">{String.fromCharCode(65291)}</div>
          <button type="button" className="bttn add-button">
            Add Ingredient
          </button>
        </div>
      </div>
    </div>
    <div className="footer">
      <button className="bttn add-item" type="submit">
        Add {listType}
      </button>
    </div>
  </form>
);
export default ModalContent;
