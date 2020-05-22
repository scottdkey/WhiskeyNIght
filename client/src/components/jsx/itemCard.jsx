import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteModal from "./deleteConfirmation";
import IngredientRender from "./ingredientRender";
import AssignModal from "./AssignModal";
import Checkbox from "react-simple-checkbox";
import "../scss/ItemCard.scss";

const ItemCard = ({ item, removeItem }) => {
  const [ingredients, setIngredients] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const deleteItem = () => {
    axios
      .delete(`/api/sessions/${item.session_id}/items/${item.id}`)
      .then(res => removeItem(item))
      .catch(e => console.log(e));
  };
  const toggleChecked = () => {
    setOpenModal(!openModal);
  };

  const bringAll = item.assigned === null ? false : true;

  useEffect(() => {
    axios
      .get(`/api/items/${item.id}/ingredients`)
      .then(res => setIngredients(res.data))
      .catch(e => console.log(e));
  }, [item.id]);

  const infoHead = () => {
    return (
      <div className="head">
        <Checkbox
          color={checkboxColor}
          checked={bringAll}
          borderThickness="3"
          onChange={toggleChecked}
          size="4"
        />
        <h3 className="name">{item.label}</h3>
        <div className="delete-area">
          <DeleteModal
            customClass="bttn delete-item"
            deleteFunction={deleteItem}
            buttonText={String.fromCharCode(8722)}
            text={item.label}
          />
        </div>
      </div>
    );
  };

  const infoBody = () => {
    return (
      <>
        {ingredients.map(i => (
          <IngredientRender key={i.id} ingredient={i} item={item} />
        ))}
      </>
    );
  };

  return (
    <div className="info-area">
      {infoHead()}
      {infoBody()}

      <AssignModal open={openModal} toggleModal={toggleChecked} item={item} />
    </div>
  );
};

export default ItemCard;

const checkboxColor = {
  backgroundColor: "purple",
  tickColor: "white",
  borderColor: "purple",
  uncheckedBorderColor: "yellow"
};
