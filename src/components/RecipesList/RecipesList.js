import React from 'react';
import './RecipesList.css';
import RecipeCard from '../RecipeCard/RecipeCard'

	 
const RecipesList = ({ recipesList, baseUrl, onRouteChange, setRecipeId }) => {
	return (
	<div className='container' style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridGap:'20px', margin: '20px'}}>
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