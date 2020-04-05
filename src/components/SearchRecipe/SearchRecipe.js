import React, {Component} from 'react';
import './SearchRecipe.css';
import RecipesList from '../RecipesList/RecipesList'

class SearchRecipe extends Component{

    constructor(props) {
        super();
        this.state = {
            input: '',
            query: '', 
            baseUrl: '', 
            recipesList: [], 
            errorMessage: ''
        }
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    getRecipes = (query) => {
        return fetch('https://whispering-shelf-53733.herokuapp.com/api/searchRecipes', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            query: query
            })
        })
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                return false;
            }
        })
        .catch(err => console.log(err))
    }

    onSubmit = () => { 
        this.getRecipes(this.state.input)
        .then(response => {
            if (response) {
                // if no results
                if(response.results.length === 0){
                    this.setState({errorMessage: 'No results found', recipesList: []})
                } else {
                    this.setState({recipesList: response.results, baseUrl: response.baseUri, errorMessage: ''});
                }
            } else {
                this.setState({errorMessage: 'No results found', recipesList: []})
            }
        })
    }

    render() {
        // const { onRouteChange, isSignedIn } = this.props;
        const { baseUrl, recipesList } = this.state;
        return (
            <div>
                <div className="wrap">
                    <h3>Serarch for a recipe</h3>
                    { this.state.errorMessage &&
                        <div>
                      <p>{this.state.errorMessage}<i style={{position: 'absolute', width: 0, height: 0}} className="material-icons">sentiment_dissatisfied</i></p> 
                    </div>}
                    <div className="search">
                        <input type="text" className="searchTerm" placeholder="What are you looking for?" onChange={this.onInputChange}></input>
                        <button type="submitwr
                        " className="searchButton" onClick={this.onSubmit}>
                            <i className="material-icons">search</i>
                        </button>
                    </div>
                </div> 

                <RecipesList 
                 baseUrl={baseUrl} 
                 recipesList={recipesList} 
                 onRouteChange={this.props.onRouteChange}
                 SetRecipeId={this.props.SetRecipeId}/>
            </div>
        )
    }
}
export default SearchRecipe;