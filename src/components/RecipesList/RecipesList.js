import React from 'react';
import './RecipesList.css';
import RecipeCard from '../RecipeCard/RecipeCard'

	 
const RecipesList = ({ recipesList, baseUrl, onRouteChange, setRecipeId }) => {
	return (
	<div className='container'>
		{
			recipesList.map((recipe, i) => {
				return (
					<RecipeCard 
					title={recipe.title} 
					key={i}
					imageUrl={baseUrl + recipe.image}
					recipeId={recipe.id}
					onRouteChange={onRouteChange}
					setRecipeId={setRecipeId}/>
				)
			})
		}
	</div>
	);
}

export default RecipesList;