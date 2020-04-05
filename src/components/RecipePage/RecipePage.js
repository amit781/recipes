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
        this.getInformation(this.props.recipeId)
        .then(information => this.setState({information: information}))
    }

    getInformation = (id) => {
        return fetch('https://whispering-shelf-53733.herokuapp.com/getInformation', {
          method: 'post',
          // mode: 'no-cors',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: id
            })
        }).then(response => response.json());
    }

    render() {
        const { extendedIngredients, instructions, title, readyInMinutes, image} = this.state.information;
        return (
            <div className='center'>
                <article style={{width: '70%'}} className='pa2'>
                    <h1 className='title'>{title}</h1>
                    <div style={{overflow: 'hidden'}}>
                        <div style={{float: 'left', borderRadius: '20px'}}><img src={image} alt={title}/></div>
                        <div style={{float: 'left'}}><IngredientsList ingredients={extendedIngredients}/></div>
                    </div>
                    <h3>Instructions</h3>
                    <p>{instructions}</p>
                </article>
            </div>
        )
    }
}

export default RecipePage;