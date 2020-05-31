import React, { useState, useEffect } from "react";
import axios from "axios";
import NewItemModal from "./NewItemModal";
import ItemCard from "./itemCard";
import "../scss/buttonstyles.scss";
import "../scss/itemList.scss";

const ItemList = ({ listType, session_id }) => {
  const [items, setItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const itemsRender = () =>
    items
      .filter(item => {
        //filter for matching marker
        if (item.foodstuff === listType) {
          return item;
        }
        return null;
      })
      .map(
        (item, index) => {
          //render each of those items
          return (
            <ItemCard
              item_id={item.id}
              key={item.id}
              items={items}
              setItems={setItems}
              session_id={session_id}
              index={index}
            />
          );
        },
        [items]
      );

  useEffect(() => {
    axios
      .get(`/api/sessions/${session_id}/items`)
      .then(res => setItems(res.data))
      .catch(e => console.log(e));
  }, [session_id]);

  return (
    <>
      <div className="list-head">
        <h2 id="list-name">{listType}</h2>
        <button
          id="list-add"
          onClick={() => setOpenModal(!openModal)}
          className="bttn plus"
        >
          {String.fromCharCode(65291)}
        </button>
      </div>

      <div>{itemsRender()}</div>
      <NewItemModal
        open={openModal}
        listType={listType}
        toggle={() => setOpenModal(!openModal)}
        setItems={setItems}
        items={items}
        session_id={session_id}
      />
    </>
  );
};

export default ItemList;
