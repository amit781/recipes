import React, {Component} from 'react';
import IngredientsList from '../IngredientsList/IngredientsList'

class RecipePage extends Component{
    constructor(props){
        super();
        this.state = {
            information:{}
        }
    }

        componentDidMount() {
        if (this.props.recipesFrom === 'api') {
            this.getInformationFromApi(this.props.recipeId)
            .then(information => this.setState({information: information}));
        } else {
            fetch(`https://whispering-shelf-53733.herokuapp.com/recipes/getRecipe/${this.props.recipeId}`, {
              method: "GET",
              credentials: "include",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
             })
            .then(response => response.json())
            .then(information => this.setState({information: information}))
        }
    }

    getInformationFromApi = (id) => {
        return fetch('https://whispering-shelf-53733.herokuapp.com/api/getInformation', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: id
            })
        }).then(response => response.json());
    }

    render() {
        const { extendedIngredients, ingredients, instructions, title, readyInMinutes, image} = this.state.information;
        const imageUrl = 'http://localhost:4000/uploads/images/' + image;
        return (
            <div className='flex-center'>
                <article style={{width: '70%'}} className='pa2'>
                    <h1 className='title'>{title}</h1>
                    <div style={{overflow: 'hidden'}}>
                        { this.props.recipesFrom === 'user'
                            ? <div className="pa3" style={{float: 'left', borderRadius: '20px'}}><img src={imageUrl} alt={title} style={{width: "400px", height: "400px", objectFit: "cover"}}/></div>
                            : <div className="pa3" style={{float: 'left', borderRadius: '20px'}}><img src={image} alt={title}/></div>
                        }
                        { this.props.recipesFrom === 'user' 
                            ? <div style={{float: 'left'}}> <h3>ingredients</h3> {ingredients} </div> 
                            : <div style={{float: 'left'}}><IngredientsList ingredients={extendedIngredients}/></div>
                        }
                    </div>
                    <h3>Instructions</h3>
                    <p>{instructions}</p>
                </article>
            </div>
        )
    }
}

export default RecipePage;