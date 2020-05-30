import React, { useState } from "react";
import IngredientForm from "./ingredientForm";
import Modal from "react-bootstrap/Modal"
import axios from "axios";
import "../scss/Modal.scss";

const NewItemModal = ({
  listType,
  toggle,
  open,
  items,
  setItems,
  session_id
}) => {
  const [label, setLabel] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  const toggleModal = () => {
    setLabel("");
    setIngredients([]);
    toggle()
  };

  const updateIngredients = (newIngredient, i) => {
    const newArray = ingredients.map((ing, index) => {
      if (index === i) {
        return newIngredient;
      } else {
        return ing;
      }
    });
    setIngredients(newArray);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const item = { label, foodstuff: listType };
    const res = await axios.post(`/api/sessions/${session_id}/items`, item);

    //seperate function to seperate and submit all ingredients to database
    submitIngredients(res.data.id);

    //don't set items before ingredients have been submitted so card will include all ingredients
    await setItems([...items, res.data]);

    //clear and close the modal info after pushing to Database
    toggleModal();
  };

  const submitIngredients = id => {
    ingredients.forEach(async i => {
      const res = await axios.post(`/api/items/${id}/ingredients`, i)

      console.log(res)
    });
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", assigned: "", complete: false }
    ]);
  };
  return (
    <Modal
      show={open}
      onClose={toggleModal}
      onSubmit={handleSubmit}
      title={listType}
    >
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
    </Modal>
  );
};
export default NewItemModal;
