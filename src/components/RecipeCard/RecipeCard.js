import React from 'react';
import defaultImage from "./default.jpg";

const RecipeCard = ({ title, imageUrl, onRouteChange, setRecipeId, recipeId }) => {
	const onClick = () => {
		onRouteChange('recipe-page');
		setRecipeId(recipeId);
	}

	console.log(imageUrl);
	return (
		<article className="pa2" width='200px'>
			<img src={imageUrl} alt='recipe' width='200px' height='200px' object-fit="cover" className="pointer" onClick={onClick} />
            <div>
                <h3 className="pointer" onClick={onClick}>{title}</h3>
            </div>
	    </article>
	)
}

export default RecipeCard;