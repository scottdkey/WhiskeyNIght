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
    axios
      .post(`/api/sessions/${id}/items`, { label })
      .then(res => {
        console.log(res.data.id);
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
  }, [id, openModal]);
  const ItemIngredients = ({ id }) => {
    const ingredients = [];
    axios
      .get(`/api/items/${id}/ingredients`)
      .then(res => {
        ingredients.push(...res.data);
      })
      .catch(e => console.log(e));


    return (
      <>
        {ingredients.map(i => {
          console.log(i)
          return (
          <>
            <h3>{i.name}</h3>
            <p>Complete: {i.complete}</p>
            <p>Assigned: {i.assigned}</p>
          </>
        )})}
      </>
    );
  };

  const itemsRender = () => {
    return items.map((item, index) => {
      return (
        <div key={item + index}>
          <Form.Group>
            {item.label}
            <ItemIngredients id={item.id} />
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
