import React, { useState, useContext, useEffect } from "react";
import Checkbox from "./Checkbox";
import "../scss/ItemCard.scss";
import { UserContext } from "../../App";
import axios from "axios";

const IngredientRender = ({
  ingredient,
  ingredients,
  setIngredients,
  index
}) => {
  const [checked, setChecked] = useState(false);
  const [user] = useContext(UserContext);

  const addRemoveAssigned = checked ? "" : user;

  const toggleChecked = () => {
    const newIngredient = {
      name: ingredient.name,
      assigned: addRemoveAssigned
    };
    const newArray = ingredients.filter(i => {
      if (i.id !== ingredient.id) {
        return i;
      } else{
        //return nothing. NOTHING I SAY
      }
      return
    })

    axios
      .patch(
        `/api/items/${ingredient.item_id}/ingredients/${ingredient.id}`,
        newIngredient
      )
      .then(res => {
        newArray.splice(index, 0, res.data);
        setIngredients([...newArray]);
        setChecked(!checked);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    if ((ingredient.assigned === "") | null) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [ingredient.assigned]);

  return (
    <div className="ingredient" onClick={toggleChecked}>
      <Checkbox
        checked={checked}
      />
      <div className="i-name">{ingredient.name}</div>
      <div className="assigned">{ingredient.assigned}</div>
    </div>
  );
};

export default IngredientRender;

const checkboxColor = {
  backgroundColor: "#8b55ff",
  tickColor: "white",
  borderColor: "purple",
  uncheckedBorderColor: "yellow"
};
