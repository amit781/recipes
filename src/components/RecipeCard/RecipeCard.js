import React from 'react';
import defaultImage from "./default.jpg";

const RecipeCard = ({ title, imageUrl, onRouteChange, setRecipeId, recipeId }) => {
	const onClick = () => {
		onRouteChange('recipe-page');
		setRecipeId(recipeId);
	}

	// if (!imageUrl) {
	// 	imageUrl = defaultImage;
	// }
	console.log(imageUrl);
	return (
		<article className="pa2" width='200px'>
			<img src={imageUrl} alt='recipe' width='auto' height='200px' className="pointer" onClick={onClick} />
            <div>
                <h3 className="pointer" onClick={onClick}>{title}</h3>
            </div>
	    </article>
	)
}

export default RecipeCard;