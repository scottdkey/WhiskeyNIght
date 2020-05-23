import React, { useState, useContext, useEffect } from "react";
import Checkbox from "react-simple-checkbox";
import "../scss/ItemCard.scss";
import {UserContext} from '../../App'
import axios from "axios";

const IngredientRender = ({ ingredient, ingredients, setIngredients }) => {
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const addRemoveAssigned = (checked ? "" : user)

  const toggleChecked = () => {
    const newIngredient = ({...ingredient, assigned: addRemoveAssigned});
    const newArray = ingredients.filter(i =>{ 
      if(i.id !== ingredient.id){
        return i
      }
      
    });
    axios
      .patch(
        `/api/items/${ingredient.item_id}/ingredients/${ingredient.id}`,
        newIngredient
      )
      .then(res => {
        setIngredients([...newArray, newIngredient]);
        setChecked(!checked)
      })
      .catch(e => console.log(e));
  };

  useEffect(() =>{
    checkAssigned()
  },[])

  const checkAssigned = () => {
    if(ingredient.assigned === '' | null){
      setChecked(false)
    }else {
      setChecked(true)
    }
  }


  return (
    <div className="ingredient" onClick={toggleChecked}>
      <Checkbox
        color={checkboxColor}
        checked={checked}
        borderThickness="3"
        // onChange={handleChange}
        size="4"
      />
      <div className="i-name">{ingredient.name}</div>
      <div>{ingredient.assigned}</div>
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
