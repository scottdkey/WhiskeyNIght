import React, { useContext, useEffect } from "react";
import Checkbox from "./Checkbox";
import "../scss/ItemCard.scss";
import { UserContext } from "../../App";
import axios from "axios";

const IngredientRender = ({
  ingredient,
  ingredients,
  setIngredients,
  index,
  checkIngredients
}) => {
  const [user] = useContext(UserContext);

  const addRemoveAssigned = ingredient.complete ? "" : user;

  const toggleChecked = () => {
    const newIngredient = {
      name: ingredient.name,
      assigned: addRemoveAssigned,
      complete: !ingredient.complete
    };
    const newArray = ingredients.filter(i => {
      if (i.id !== ingredient.id) {
        return i;
      }
      return null
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

  useEffect(() => {
    checkIngredients();
  }, [ingredients, checkIngredients]);

  return (
    <div className="ingredient" onClick={toggleChecked}>
      <Checkbox checked={ingredient.complete} />
      <div className="i-name">{ingredient.name}</div>
      <div className="assigned">{ingredient.assigned}</div>
    </div>
  );
};

export default IngredientRender;
