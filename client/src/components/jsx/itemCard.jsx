import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import DeleteModal from "./DeleteModal";
import IngredientRender from "./ingredientRender";
import Checkbox from "./Checkbox";
import "../scss/ItemCard.scss";
import "../scss/buttonstyles.scss";
import BringModal from "./BringModal";

const ItemCard = ({ item_id, setItems, items, session_id }) => {
  const [ingredients, setIngredients] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [user] = useContext(UserContext);
  const [item, setItem] = useState({});

  const getItem = async () => {
    const res = await axios.get(`/api/sessions/${session_id}/items/${item_id}`);
    setItem(res.data);
  };

  const getIngredients = async () => {
    const res = await axios.get(`/api/items/${item_id}/ingredients/`);
    setIngredients(res.data);
    allCompleteCheck(res.data)
  };

  const alterItem = async payloadObject => {
    const res = await axios.patch(
      `/api/sessions/${session_id}/items/${item_id}`,
      payloadObject
    );
    setItem(res.data);
  };

  const allCompleteCheck = async (ing) => {
    const length = ing.length;
    const completedLength = ing.filter(i => {
      if(i.complete){
        return i
      }
      return null
    }).length;
    if (length === completedLength) {
      alterItem({ complete: true });
    } else {
      alterItem({ complete: false });
    }
  };

  const deleteItem = async () => {
    //delete item from database
    const res = await axios.delete(
      `/api/sessions/${item.session_id}/items/${item.id}`
    );
    console.log(res.data);
    //Remove this item from items array
    const newItems = items.filter(i => {
      return i.id != item.id
    });
    console.log(newItems)
    setItems(newItems);
  };

  const bringItem = async () => {
    const assigned = item.complete ? "" : user;
    alterItem({ assigned, complete: !item.complete });
    if (ingredients.length > 0) {
      bringAllIngredients();
    }
    getItem();
  };

  const bringAllIngredients = () => {
    const newIngredients = [];
    ingredients.forEach(async ingredient => {
      const assigned = ingredient.complete ? ingredient.assigned : user;
      const res = await axios.patch(
        `/api/items/${ingredient.item_id}/ingredients/${ingredient.id}`,
        {
          assigned,
          complete: !ingredient.complete
        }
      );
      newIngredients.push(...res.data);
    });
    setIngredients(...newIngredients);
    getIngredients();
    allCompleteCheck();
  };

  //check if item boolean is complete
  const bringItemModal = () => {
    if (item.complete) {
      bringItem();
    } else {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    getItem();
    getIngredients();
  }, [item_id]);

  return (
    <div className="info-area">
      <div className="head">
        <div onClick={bringItemModal}>
          <Checkbox checked={item.complete} />
          <h3 className="name">{item.label}</h3>
        </div>
        <div className="delete-ingredient">
          <BringModal
            name={item.label}
            toggleShow={() => setOpenModal(!openModal)}
            handleSubmit={bringItem}
            show={openModal}
          />
          <DeleteModal
            customClass="bttn ingredient-delete"
            deleteFunction={deleteItem}
            text={item.label}
            buttonText={String.fromCharCode(8722)}
          />
        </div>
      </div>
      <div className="body">
        {ingredients.map((i, index) => (
          <IngredientRender
            key={i.id + i}
            id={i.id}
            item_id={item_id}
            ingredients={ingredients}
            setIngredients={setIngredients}
            allCompleteCheck={allCompleteCheck}
            user={user}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemCard;
