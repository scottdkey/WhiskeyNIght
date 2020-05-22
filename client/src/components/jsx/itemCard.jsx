import React, { useEffect, useState } from "react";
import Axios from "axios";
import DeleteModal from "./deleteConfirmation";
import IngredientRender from "./ingredientRender";
import "../scss/ItemCard.scss";

const ItemCard = ({ item }) => {
  const [ingredients, setIngredients] = useState([]);
  const [checked, setChecked] = useState(true);

  const deleteItem = () => {
    Axios.delete(`/api/session/${item.session_id}/item/${item.id}`);
  };
  const toggleChecked = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    Axios.get(`/api/items/${item.id}/ingredients`)
      .then(res => setIngredients(res.data))
      .catch(e => console.log(e));
  }, [item.id]);

  return (
    <div className="info-area">
      <div className="info-head">
        <input type="checkbox" checked={checked} onChange={toggleChecked} className="checkbox"/>
        <h3 className="item-name">{item.label}</h3>
        <div className="delete-area">
          <DeleteModal
            customClass="bttn delete-item"
            deleteFunction={deleteItem}
            buttonText={String.fromCharCode(8722)}
            text={item.label}
          />
        </div>
      </div>
      <div className="card-body">
        {ingredients.map(i => (
          <IngredientRender key={i.id} ingredient={i} />
        ))}
      </div>
    </div>
  );
};
export default ItemCard;
