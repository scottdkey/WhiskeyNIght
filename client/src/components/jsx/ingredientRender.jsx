import React, { useContext, useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { UserContext } from "../../App";
import axios from "axios";
import BringModal from "./BringModal";

import "../scss/ItemCard.scss";

const IngredientRender = ({
  ingredient,
  ingredients,
  setIngredients,
  index,
  checkIngredients
}) => {
  const [user] = useContext(UserContext);
  const [show, setShow] = useState(false);

  const toggleModal = () => {
    setShow(!show);
  };

  const handleSubmit = () => {
    const newIngredient = {
      name: ingredient.name,
      assigned: addRemoveAssigned,
      complete: !ingredient.complete
    };
    const newArray = ingredients.filter(i => {
      if (i.id !== ingredient.id) {
        return i;
      }
      return null;
    });

    axios
      .patch(
        `/api/items/${ingredient.item_id}/ingredients/${ingredient.id}`,
        newIngredient
      )
      .then(res => {
        newArray.splice(index, 0, res.data);
        setIngredients([...newArray]);
      })
      .catch(e => console.log(e));
  };

  const whichSubmit = ingredient.complete ? handleSubmit : toggleModal;

  const addRemoveAssigned = ingredient.complete ? "" : user;

  useEffect(() => {
    checkIngredients();
  }, [ingredients, checkIngredients]);

  return (
    <div className="ingredient">
      <div className="check-area" onClick={whichSubmit}>
        <Checkbox checked={ingredient.complete} />
        <div className="i-name">{ingredient.name}</div>
        <div className="assigned">{ingredient.assigned}</div>
      </div>

      <BringModal
        ingredient={ingredient}
        toggleShow={toggleModal}
        handleSubmit={handleSubmit}
        show={show}
      />
    </div>
  );
};

export default IngredientRender;
