import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import NewItemModal from "./NewItemModal"
import ItemCard from "./itemCard";
import "../scss/buttonstyles.scss";
import "../scss/itemList.scss";

const ItemList = ({ id, listType }) => {
  const [items, setItems] = useState([]);
  const [label, setLabel] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
    setLabel("");
    setIngredients([])
  };

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
      })
      .catch(e => console.log(e));
    // close modal
    toggleModal();
    //clear the modal info after pushing to Database
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
    const newArray = ingredients.map((ing, index) => {
      if (index === i) {
        return newIngredient;
      } else {
        return ing;
      }
    });
    setIngredients(newArray);
  };

  const removeItem = item => {
    const newItems = items.filter(i => {
      if (i !== item) {
        return i;
      }
      return null
    });
    setItems(newItems);
    return null
  };

  const itemsRender = () =>
    items
      .filter(item => {
        //filter for matching marker
        if (item.foodstuff === listType) {
          return item;
        }
        return null
      })
      .map(item => {
        //render each of those items
        return <ItemCard item={item} key={item.id} removeItem={removeItem} />;
      });

  useEffect(() => {
    if (id === undefined) {
      //do nothing
    } else {
      axios
        .get(`/api/sessions/${id}/items`)
        .then(res => setItems(res.data))
        .catch(e => console.log(e));
    }
  }, [id, ingredients]);
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
        <NewItemModal
          listType={listType}
          ingredients={ingredients}
          addIngredient={addIngredient}
          toggleModal={toggleModal}
          handleSubmit={handleSubmit}
          updateIngredients={updateIngredients}
          setLabel={setLabel}
          label={label}
        />
      </Modal>
    </>
  );
};

export default ItemList;
