import React, {Component} from 'react';
import defaultImage from "./default.jpg";


class RecipeCard extends Component {
	constructor() {
		super();
		this.state = {
			toRcipePage: false
		}
	};

	onClick = () => {
		this.setState({toRcipePage: true});
		this.props.setRecipeId(this.props.recipeId);
	}

	render() {
		const { title, imageUrl, onRouteChange, setRecipeId, recipeId } = this.props;
		if (this.state.toRcipePage) {
			return <Redirect to="/recipePage"/>
		}
		return (
			<article className="pa2" width='200px'>
				<img style={{objectFit: 'cover'}} src={imageUrl} alt='recipe' width='200px' height='200px' className="pointer" onClick={this.onClick} />
	            <div>
	                <h3 className="pointer" onClick={this.onClick}>{title}</h3>
	            </div>
		    </article>
		)
	}
}

// const RecipeCard = ({ title, imageUrl, onRouteChange, setRecipeId, recipeId }) => {
// 	const onClick = () => {
// 		onRouteChange('recipe-page');
// 		setRecipeId(recipeId);
// 	}
// 	return (
// 		<article className="pa2" width='200px'>
// 			<img src={imageUrl} alt='recipe' width='200px' height='200px' style={{objectFit: 'cover'}} className="pointer" onClick={onClick} />
//             <div>
//                 <h3 className="pointer" onClick={onClick}>{title}</h3>
//             </div>
// 	    </article>
// 	)
// }

export default RecipeCard;