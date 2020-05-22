import React, { useState, useEffect } from "react";
import axios from "axios";
import IngredientForm from "./ingredientForm";
import "../scss/buttonstyles.scss";
import "../scss/itemList.scss";
import Modal from "react-bootstrap/Modal";
import ItemCard from "./itemCard";

const ItemList = ({ id, listType }) => {
  const [items, setItems] = useState([]);
  const [label, setLabel] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => setOpenModal(!openModal);

  const handleSubmit = e => {
    e.preventDefault();
    const item = { label, foodstuff: listType };
    axios
      .post(`/api/sessions/${id}/items`, item)
      .then(res => {
        //add the new items to the current state
        setItems([...items, res.data]);
        //submit the ingredients seperately(different submit method)
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
      axios
        .post(`/api/items/${id}/ingredients`, i)
        .then(res => {
          return res;
        })
        .catch(e => console.log(e));
    });
  };

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

  const removeItem = item => {
    const newItems = items.filter(i => {
      if (i !== item) {
        return i;
      }
    });
    setItems(newItems);
  };

  const itemsRender = () =>
    items
      .filter(item => {
        //filter for matching marker
        if (item.foodstuff === listType) {
          return item;
        }
      })
      .map(item => {
        //render each of those items
        return <ItemCard item={item} key={item.id} removeItem={removeItem} />;
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
