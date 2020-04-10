import React from 'react';
import defaultImage from "./default.jpg";
import './RecipeCard.css';

const RecipeCard = ({ title, imageUrl, onRouteChange, setRecipeId, recipeId }) => {
	const onClick = () => {
		onRouteChange('recipe-page');
		setRecipeId(recipeId);
	}
	return (
		<article className="pa2" style={{display: 'flex', flexDirection: 'column'}}>
			<div className="card-container">
				<img src={imageUrl} alt='recipe' className="pointer card-image" onClick={onClick} />
			</div>
            <div>
                <h3 className="pointer" onClick={onClick}>{title}</h3>
            </div>
	    </article>
	)
}

export default RecipeCard;