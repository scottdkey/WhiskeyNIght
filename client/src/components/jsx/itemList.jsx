import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../App";
import axios from "axios";
import NewItemModal from "./NewItemModal";
import ItemCard from "./itemCard";
import "../scss/buttonstyles.scss";
import "../scss/itemList.scss";

const ItemList = ({ listType }) => {
  const [items, setItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [session] = useContext(SessionContext);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };



  const removeItem = item => {
    const newItems = items.filter(i => {
      if (i !== item) {
        return i;
      }
      return null;
    });
    setItems(newItems);
    return null;
  };

  const itemsRender = () =>
    items
      .filter(item => {
        //filter for matching marker
        if (item.foodstuff === listType) {
          return item;
        }
        return null;
      })
      .map(item => {
        //render each of those items
        return <ItemCard item={item} key={item.id} removeItem={removeItem} />;
      },[items]);

  useEffect(() => {
    if (session.id === undefined) {
      //nothing
    } else {
      axios
        .get(`/api/sessions/${session.id}/items`)
        .then(res => setItems(res.data))
        .catch(e => console.log(e));
    }
  }, [session]);
  return (
    <>
      <div className="list-head">
        <h2 id="list-name">{listType}</h2>
        <button id="list-add" onClick={toggleModal} className="bttn plus">
          {String.fromCharCode(65291)}
        </button>
      </div>

      <div>{itemsRender()}</div>
      <NewItemModal
        open={openModal}
        listType={listType}
        toggle={toggleModal}
        setItems={setItems}
        items={items}
        session_id={session.id}
      />
    </>
  );
};

export default ItemList;
