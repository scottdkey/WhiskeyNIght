import React, { useState, useEffect } from "react";
import axios from "axios";
import IngredientForm from "./ingredientForm";
import "../scss/buttonstyles.scss";
import "../scss/itemList.scss"
import Modal from "react-bootstrap/Modal";

const ItemList = ({ id, listType }) => {
  const [items, setItems] = useState([]);
  const [label, setLabel] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = e => {
    console.log(e);
    e.preventDefault();
    const item = { label, foodstuff: listType };
    axios
      .post(`/api/sessions/${id}/items`, item)
      .then(res => {
        setItems([...items, res.data]);
        submitIngredients(res.data.id);
        // close modal
        toggleModal();
      })
      .catch(e => console.log(e));

    //clear the modal info after pushing to Database
    setLabel("");
  };

  const submitIngredients = id => {
    ingredients.forEach(i => {
      console.log(i);
      axios
        .post(`/api/items/${id}/ingredients`, i)
        .then(res => console.log(res))
        .catch(e => console.log(e));
    });
  };

  const toggleModal = () => setOpenModal(!openModal);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", assigned: "", complete: false }
    ]);
  };

  const updateIngredients = (newIngredient, i) => {
    const newArray = ingredients.map((ingredient, index) => {
      if (index === i) {
        return newIngredient;
      } else {
        return ingredient;
      }
    });
    setIngredients(newArray);
  };

  useEffect(() => {
    if (id === undefined) {
      //do nothing
    } else {
      axios
        .get(`/api/sessions/${id}/items`)
        .then(res => setItems(res.data))
        .catch(e => console.log(e));
    }
  }, [id]);

  const itemsRender = () =>
    items
      .filter(item => {
        //filter for matching marker
        if (item.foodstuff === listType) {
          return item;
        }
      })
      .map((item, index) => {
        //render each of those items
        return <div key={item + index}>{item.label}</div>;
      });
  const modalContent = () => (
    <React.Fragment>
      <div className="modal-header">
        <h2>Add {listType}</h2>
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
      />
      <label>Ingredients</label>
      <button onClick={addIngredient}>Add Ingredient</button>
      {ingredients.map((ingredient, index) => (
        <IngredientForm
          key={ingredient + index}
          ingredient={ingredient}
          index={index}
          update={updateIngredients}
        />
      ))}
      <div className="modal-footer">
        <button onClick={toggleModal}>Close</button>
        <button onClick={handleSubmit}>Save changes</button>
      </div>
    </React.Fragment>
  );
  return (
    <>
      <div className="list-head">
        <h2 id="list-name">{listType}</h2>
        <button id="list-add" onClick={toggleModal} className="bttn plus">
          {String.fromCharCode(65291)}
        </button>
      </div>

      <div>{itemsRender()}</div>

      <Modal
        show={openModal}
        onClose={toggleModal}
        onSubmit={handleSubmit}
        title={listType}
      >
        {modalContent()}
      </Modal>
    </>
  );
};

export default ItemList;
