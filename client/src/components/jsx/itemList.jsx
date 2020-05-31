import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import NewItemModal from "./NewItemModal";
import ItemCard from "./itemCard";
import "../scss/buttonstyles.scss";
import "../scss/itemList.scss";
import { SessionContext } from "../../App";

const ItemList = ({ listType }) => {
  const [items, setItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [session] = useContext(SessionContext);
  const itemsRender = () =>
    items.map(
      (item, index) => {
        //render each of those items
        return (
          <ItemCard
            item_id={item.id}
            key={item.id}
            items={items}
            setItems={setItems}
            session_id={session.id}
            index={index}
          />
        );
      }
    );

  const getItems = async () => {
    const res = await axios.get(`/api/sessions/${session.id}/items`);
    const currentItems = res.data.filter(item => {
        //filter for matching marker
        if (item.foodstuff === listType) {
          return item;
        }
        return null;
      }).sort((a, b) => a.id > b.id)
    setItems(currentItems);
  };

  useEffect(() => {
    getItems();
  }, [session.id]);

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
        session_id={session.id}
      />
    </>
  );
};

export default ItemList;
