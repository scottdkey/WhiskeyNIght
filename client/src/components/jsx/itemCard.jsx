import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import DeleteModal from "./DeleteModal";
import IngredientRender from "./ingredientRender";
import Modal from "react-bootstrap/Modal";
import Checkbox from "./Checkbox";
import "../scss/ItemCard.scss";
import "../scss/buttonstyles.scss";
import BringModal from "./BringModal";

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
        <div className="delete-ingredient">
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
      <div className="body">
        {ingredients.map((i, index) => (
          <IngredientRender
            key={i.id + i}
            ingredient={i}
            item={item}
            ingredients={ingredients}
            setIngredients={setIngredients}
            checkIngredients={checkIngredients}
            index={index}
          />
        ))}
      </div>
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

  const checkIngredients = () => {
    const length = ingredients.length
    const complete = ingredients.filter(i => i.complete === true).length
    if(length === 0){
      setBringAll(false)
    } else if(length === complete){
      setBringAll(true)
    } else{
      setBringAll(false)
    }
  };

    const getIngredients = async () => {
      const res = await axios.get(`/api/items/${item.id}/ingredients`);

      setIngredients(res.data);
    };


  useEffect(() => {
    getIngredients()
  }, [item.id, item.assigned, getIngredients]);




  return (
    <div className="info-area">
      {infoHead()}
      {infoBody()}

      <Modal show={openModal} onHide={toggleModal}>
      <BringModal 
        bringAll={bringAll}
        item={item}
        toggleModal={toggleModal}
        handleSubmit={handleSubmit}
      />
      </Modal>
    </div>
  );
};

export default ItemCard;
