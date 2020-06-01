import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import IngredientRender from "./ingredientRender";
import Checkbox from "./Checkbox";
import "../scss/ItemCard.scss";
import "../scss/buttonstyles.scss";
import BringModal from "./BringModal";

const ItemCard = ({ item_id, setItems, items, session_id }) => {
  const [ingredients, setIngredients] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});

  const getItem = async () => {
    const res = await axios.get(`/api/sessions/${session_id}/items/${item_id}`);
    setItem(res.data);
  };

  const getIngredients = async () => {
    const res = await axios.get(`/api/items/${item_id}/ingredients/`);
    const sortedIngredients = res.data.sort((a, b) => a.id - b.id);
    setIngredients(sortedIngredients);
  };

  const alterItem = async payloadObject => {
    const res = await axios.patch(
      `/api/sessions/${session_id}/items/${item_id}`,
      payloadObject
    );
    setItem(res.data);
  };

  const allCompleteCheck = () => {
    const length = ingredients.length;
    const completedLength = ingredients.filter(i => {
      if (i.complete) {
        return i;
      }
      return null;
    }).length;
    if (length === completedLength) {
      alterItem({ complete: true });
    } else{
      alterItem({complete: false})
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
      return i.id !== item.id;
    });
    console.log(newItems);
    setItems(newItems);
  };

  const bringItem = async (assignedName) => {
    if (item.complete) {
      alterItem({ assigned: "", complete: false });
    } else {
      alterItem({ assigned: assignedName, complete: true });
    }
    allCompleteCheck(ingredients)
    bringAllIngredients(assignedName);
  };

  const bringAllIngredients = (assignedName) => {
    //change the values of each object in array
    const newIngredients = ingredients.map(ing => {
      //check if its already complete and hold on to assigned name
      const assigned = ing.complete ? ing.assigned : assignedName;
      ing.assigned = assigned;
      ing.complete = true;
      return ing;
    });
    //send new array to state
    setIngredients(newIngredients);

    //push array to database
    newIngredients.forEach(async ingredient => {
      const res = await axios.patch(
        `/api/items/${item_id}/ingredients/${ingredient.id}`,
        { assigned: ingredient.assigned, complete: ingredient.complete }
      );
      return res;
    });
    getIngredients();
    //check if the top level should be marked off
    allCompleteCheck(ingredients);
  };

  //check if item boolean is complete
  const bringItemModal = () => {
    if (item.complete) {
      bringItem(true);

      
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
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemCard;
