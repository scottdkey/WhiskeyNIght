import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import axios from "axios";
import BringModal from "./BringModal";

import "../scss/ItemCard.scss";

const IngredientRender = ({
  item_id,
  id,
  allCompleteCheck,
  ingredients,
  setIngredients,
  index
}) => {
  const [show, setShow] = useState(false);
  const [ingredient, setIngredient] = useState({});

  const toggleModal = () => {
    setShow(!show);
  };

  const handleSubmit = async user => {
    const assigned = ingredient.complete ? "" : user;
    const res = await axios.patch(
      `/api/items/${ingredient.item_id}/ingredients/${ingredient.id}`,
      {
        assigned,
        complete: !ingredient.complete
      }
    );
    setIngredient(res.data);
    const newIngredients = ingredients;
    newIngredients[index] = res.data;
    setIngredients(newIngredients);
    allCompleteCheck(newIngredients);
    setShow(false);
  };

  const whichSubmit = ingredient.complete ? handleSubmit : toggleModal;

  const getIngredient = async () => {
    const res = await axios.get(`/api/items/${item_id}/ingredients/${id}`);
    setIngredient(res.data);
  };

  useEffect(() => {
    getIngredient();
  }, [item_id, id, ingredients]);

  return (
    <div className="ingredient">
      <div className="check-area" onClick={whichSubmit}>
        <Checkbox checked={ingredient.complete} />
        <div className="i-name">{ingredient.name}</div>
        <div className="assigned">{ingredient.assigned}</div>
      </div>

      <BringModal
        name={ingredient.name}
        toggleShow={toggleModal}
        handleSubmit={handleSubmit}
        show={show}
        bringAll="true"
      />
    </div>
  );
};

export default IngredientRender;
