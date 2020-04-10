import React, {Component} from 'react';
import RecipesList from '../RecipesList/RecipesList';
import './UserPage.css';

const myRecipes = [{title: "cookie", image: "", recipeId: "7"},
									 {title: "burger", image: "", recipeId: "9"}]

class UserPage extends Component {

	constructor(props) {
    	super();
    	this.state = {
      		recipesList: []
    	}
    }

    componentDidMount() {
    	fetch(`https://whispering-shelf-53733.herokuapp.com/recipes/${this.props.user.email}`, {
      		method: "GET",
      		credentials: "include",
      		headers: {
        		Accept: "application/json",
        		"Content-Type": "application/json",
      		},
    	})
    	.then(response => response.json())
    	.then(recipes => this.setState({recipesList: recipes}))
      this.props.setRecipesFrom('user');
  	}

    render() {
    	const { user, onRouteChange, setRecipeId } = this.props;
    	return (
      <div className="ma0 pa0">
          <h3 className="recipes-title f2 lh-copy">{user.name}'s Recipes</h3>
          <p className='add-recipe-btn f3 link dim black pa3 pointer shadow-5 w-50 w-30-m w-20-l center' onClick={() =>onRouteChange('add-recipe')}> Add Recipe </p>
          <RecipesList 
            className="mb3" 
            recipesList={this.state.recipesList} 
            baseUrl='https://perfectrecipesbucket.s3-us-west-1.amazonaws.com/' 
            onRouteChange={onRouteChange} 
            setRecipeId={setRecipeId}
            />
      </div>
		  )
    }

} 

export default UserPage;