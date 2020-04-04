import React from 'react';
import './RecipesList.css';
import RecipeCard from '../RecipeCard/RecipeCard'

	 
const RecipesList = ({ recipesList, baseUrl, fetchInformation, onRouteChange, SetRecipeId }) => {
	return (
	<div className='container' style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridGap:'20px'}}>
		{
			recipesList.map((recipe, i) => {
				return (
					<RecipeCard 
					title={recipe.title} 
					key={i}
					imageUrl={baseUrl + recipe.image}
					recipeId={recipe.id}
					onRouteChange={onRouteChange}
					SetRecipeId={SetRecipeId}/>
					)
			})
		}
	</div>
	);
}

export default RecipesList;