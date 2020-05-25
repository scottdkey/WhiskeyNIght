import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import DeleteModal from "./DeleteModal";
import IngredientRender from "./ingredientRender";
import Modal from "react-bootstrap/Modal";
import Checkbox from "./Checkbox";
import "../scss/ItemCard.scss";
import "../scss/buttonstyles.scss";

//TODO: Make the ingredients populate on submit
//TODO: Make the Top level checkbox go when ingredients are all checked/uncheck if one is unchecked

const ItemCard = ({ item, removeItem }) => {
  const [ingredients, setIngredients] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [bringAll, setBringAll] = useState(false);
  const [user] = useContext(UserContext);

  const deleteItem = () => {
    axios
      .delete(`/api/sessions/${item.session_id}/items/${item.id}`)
      .then(res => removeItem(item))
      .catch(e => console.log(e));
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const infoHead = () => {
    return (
      <div className="head">
        <div onClick={toggleModal}>
          <Checkbox checked={bringAll} />
          <h3 className="name">{item.label}</h3>
        </div>
        <div className="delete-ingredient bttn ingredient-delete">
          <DeleteModal
            customClass="bttn ingredient-delete"
            deleteFunction={deleteItem}
            text={item.label}
            buttonText={String.fromCharCode(8722)}
          />
        </div>
      </div>
    );
  };

  const infoBody = () => {
    return (
      <>
        {ingredients.map((i, index) => (
          <IngredientRender
            key={i.id + i}
            ingredient={i}
            item={item}
            ingredients={ingredients}
            setIngredients={setIngredients}
            index={index}
          />
        ))}
      </>
    );
  };
  const assigned = bringAll ? "" : user;

  const handleSubmit = () => {
    const newIngredients = ingredients.map(i => {
      return { name: i.name, assigned: assigned, id: i.id };
    });
    axios
      .patch(`/api/sessions/${item.session_id}/items/${item.id}`, {
        assigned: assigned
      })
      .then(res => {})
      .catch(e => console.log(e));
    newIngredients.forEach(i => {
      axios
        .patch(`/api/items/${item.id}/ingredients/${i.id}`, {
          name: i.name,
          assigned: assigned
        })
        .then(res => {
          toggleModal();
          checkIngredients(res.data);
        })
        .catch(e => console.log(e));
    });
    setIngredients([...newIngredients]);
  };

  const checkIngredients = ing => {
    const newArray = ing.filter(i => {
      return i.assigned !== "";
    });
    if (newArray.length === ing.length) {
      setBringAll(true);
    } else {
      setBringAll(false);
    }
  };

  useEffect(() => {
    axios
      .get(`/api/items/${item.id}/ingredients`)
      .then(res => {
        setIngredients(res.data);
        checkIngredients(res.data);
      })
      .catch(e => console.log(e));
  }, [item.id, item.assigned]);

  return (
    <div className="info-area">
      {infoHead()}
      {infoBody()}

      <Modal show={openModal} onHide={toggleModal}>
        <div className="custom-modal">
          <div className="head">{bringAll ? "Uncheck All?" : "Bring All?"}</div>
          <div className="body">
            {bringAll
              ? `Remove your name from ${item.label}?`
              : `Bring everything from the item ${item.label}?`}
          </div>
          <button className="bttn cancel" onClick={toggleModal}>
            Cancel
          </button>
          <button className="bttn submit" onClick={handleSubmit}>
            Yes!
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ItemCard;
