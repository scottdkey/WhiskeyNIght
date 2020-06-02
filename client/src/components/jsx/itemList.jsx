import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import NewItemModal from './NewItemModal';
import ItemCard from './itemCard';
import '../scss/buttonstyles.scss';
import '../scss/itemList.scss';

const ItemList = ({ listType, session }) => {
	const [ items, setItems ] = useState([]);
	const [ openModal, setOpenModal ] = useState(false);
	const itemsRender = () =>
		items.map((item, index) => {
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
		});

	const getItems = useCallback(
		async () => {
			if (session === undefined || null) {
				//do nothing
			} else {
				const { id } = session;
				const res = await axios.get(`/api/sessions/${id}/items`);
				const currentItems = res.data
					.filter((item) => {
						//filter for matching marker
						if (item.foodstuff === listType) {
							return item;
						}
						return null;
					})
					.sort((a, b) => a.id > b.id);
				setItems(currentItems);
			}
		},
		[ session, listType ]
	);

	useEffect(
		() => {
			getItems();
		},
		[ getItems ]
	);

	if (session === undefined) {
		return <div>Loading</div>;
	} else {
		return (
			<div>
				<div className="list-head">
					<h2 id="list-name">{listType}</h2>
					<button onClick={() => setOpenModal(!openModal)} className="bttn plus" />
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
			</div>
		);
	}
};

export default ItemList;
