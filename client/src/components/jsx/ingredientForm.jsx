import React, { useState } from 'react';

const IngredientForm = ({ ingredient, index, update, ingredients, setIngredients }) => {
	const [ name, setName ] = useState('');

	const handleChange = (e) => {
		setName(e.target.value);
		ingredient.name = e.target.value;
		update(ingredient, index);
	};

	const removeIngredient = () => {
		const newIngredents = ingredients;
		newIngredents.splice(index, 1);
		setIngredients([ ...newIngredents ]);
	};

	return (
		<div className="ingredient-item">
			<div className="symbol lead" onClick={removeIngredient} />
			<input
				className="ingredient-form"
				required
				value={name}
				onChange={handleChange}
				placeholder="ingredient of the thing"
			/>
		</div>
	);
};

export default IngredientForm;
