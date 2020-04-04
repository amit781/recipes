import React from 'react';

const IngredientsList = ({ ingredients }) => {
	if(ingredients) {
		return (
			<div>
				<h3>Ingredients</h3>
				{
					ingredients.map((ingredient, i) => {
						return (
							<p key={i}>{ingredient.amount} {ingredient.unit} {ingredient.name}</p>
						)
					})
				}
			</div>
		);
	} else {
		return <h1 className='welcome'>Loading</h1>
	}
}

export default IngredientsList;
