import React from 'react';
import './RecipesList.css';
import RecipeCard from '../RecipeCard/RecipeCard'

	 
const RecipesList = ({ recipesList, baseUrl, onRouteChange, setRecipeId }) => {
	return (
	<div className='container' style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridGap:'20px', margin: '20px'}}>
		{
			recipesList.map((recipe, i) => {
				//if no image was uploaded - set default image
				if (recipe.image === 'no file uploaded') {
					return (
						<RecipeCard 
						title={recipe.title} 
						key={i}
						imageUrl=''
						recipeId={recipe.id}
						onRouteChange={onRouteChange}
						setRecipeId={setRecipeId}/>
					)
				} else {
					return (
						<RecipeCard 
						title={recipe.title} 
						key={i}
						imageUrl={baseUrl + recipe.image}
						recipeId={recipe.id}
						onRouteChange={onRouteChange}
						setRecipeId={setRecipeId}/>
					)
				}
			})
		}
	</div>
	);
}

export default RecipesList;