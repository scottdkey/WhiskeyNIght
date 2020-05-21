import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import IngredientForm from "./ingredientForm";

const ItemList = ({ id, listType }) => {
  const [items, setItems] = useState([]);
  const [label, setLabel] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = () => {
    const item = { label, foodstuff: listType };
    axios
      .post(`/api/sessions/${id}/items`, item)
      .then(res => {
        setItems([...items, res.data])
        submitIngredients(res.data.id);
      })
      .catch(e => console.log(e));

    //close modal
    toggleModal();
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

  const addItem = () => (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add {listType}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="label"
            placeholder="babaganoosh or something"
            value={label}
            onChange={e => {
              setLabel(e.target.value);
            }}
          />
          <Form.Label>Ingredients</Form.Label>
          <Button onClick={addIngredient}>Add Ingredient</Button>
          {ingredients.map((ingredient, index) => (
            <IngredientForm
              key={ingredient + index}
              ingredient={ingredient}
              index={index}
              update={updateIngredients}
            />
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save changes
        </Button>
      </Modal.Footer>
    </>
  );

  const toggleModal = () => {
    setOpenModal(!openModal);
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



  const itemsRender = () => {
    items
      .filter(item => {
        //filter for matching marker
        if (item.foodstuff === listType) {
          return item;
        }
      })
      .map((item, index) => {
        //render each of those items
        return (
          <div key={item + index}>
            <Form.Group>
              {item.label}
            </Form.Group>
          </div>
        );
      });
  };

  return (
    <>
      <h1>{listType}</h1>
      <Button onClick={toggleModal}>Add</Button>
      <Form.Group>{itemsRender()}</Form.Group>

      <Modal show={openModal} onHide={toggleModal}>
        {addItem()}
      </Modal>
    </>
  );
};

export default ItemList;
