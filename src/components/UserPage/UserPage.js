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
    	fetch(`https://whispering-shelf-53733.herokuapp.com/${this.props.user.email}`, {
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
			<div>
          <div className="wrap-user-page">
            <h3 className="f2 lh-copy">{user.name}'s Recipes</h3>
            <p className='f3 link dim black pa3 pointer shadow-5' onClick={() =>onRouteChange('add-recipe')}> Add Recipe </p>
          </div> 
				  <div><RecipesList 
            className="mb3" 
            recipesList={this.state.recipesList} 
            baseUrl="http://localhost:4000/uploads/images/" 
            onRouteChange={onRouteChange} 
            setRecipeId={setRecipeId}
            style={{position: "relative", top: "-100px"}}/>
    			</div>
      </div>
		  )
    }

} 

export default UserPage;