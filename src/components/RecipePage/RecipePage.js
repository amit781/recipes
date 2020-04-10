import React, {Component} from 'react';
import IngredientsList from '../IngredientsList/IngredientsList'
import './RecipePage.css';

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
        const imageUrl = 'https://perfectrecipesbucket.s3-us-west-1.amazonaws.com/' + image; 
        return (
            <div className='flex-center'>
                <article className='pa2 w-70-l w-90-m w-100'>
                    <h1 className='title headline'>{title}</h1>
                    <div style={{overflow: 'hidden'}}>
                        { this.props.recipesFrom === 'user'
                            ? <div className="recipe-image pa3"><img src={imageUrl} alt={title} style={{width: "400px", height: "400px", objectFit: "cover"}}/></div>
                            : <div className="recipe-image pa3"><img src={image} alt={title}/></div>
                        }
                        { this.props.recipesFrom === 'user' 
                            ? <div className="ingredients headline"> <h3>ingredients</h3> {ingredients} </div> 
                            : <div className="ingredients text"><IngredientsList ingredients={extendedIngredients}/></div>
                        }
                    </div>
                    <h3 className="headline">Instructions</h3>
                    <p className="text">{instructions}</p>
                </article>
            </div>
        )
    }
}

export default RecipePage;