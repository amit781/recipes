import React, {Component} from 'react';
import { Redirect } from "react-router-dom";

class AddRecipe extends Component {
    constructor(props) {
        super();
        this.state = {
          title: '',
          instructions: '',
          ingredients: '',
          recipeImage: null,
          errorMessage: '',
          toUserPage: false
        }
    }

    onFileChange = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            recipeImage: event.target.files[0],
        })
    }

    onTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    onIngredientsChange = (event) => {
        this.setState({ingredients: event.target.value})
    }

    onInstructionsChange = (event) => {
        this.setState({instructions: event.target.value})
    }

    uploadImage = (data) => {
        return fetch('https://whispering-shelf-53733.herokuapp.com/recipes/image-upload', {
            method: 'POST',
            credentials: 'include',
            body: data
          })
          .then(response => response.json())
          .catch(error => {
            console.error(error)
          })
    } 

    addRecipeToDataBase = (fileName) => {
      const {title, instructions, ingredients} = this.state;
      fetch('https://whispering-shelf-53733.herokuapp.com/recipes/addRecipe', {
              method: 'post',
              credentials: 'include',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                title: title,
                ingredients: ingredients,
                instructions: instructions,
                email: this.props.user.email,
                image: fileName
              })
            })
      .then(response => response.json())
      .then(recipe => {
              if (recipe === 'incorrect form submission') {
                this.setState({errorMessage: 'Title, Instructions and ingredients must be filled in'})
              } else {
                this.setState({toUserPage: true});
                // this.props.onRouteChange('user-page');
              }
            })
      .catch(err => console.log(err));
    }

    onSubmit = () => {
      const data = new FormData();
      data.append('recipeImage', this.state.recipeImage);
      this.uploadImage(data)
      .then(file => {
        if (file.fileName) {
          this.addRecipeToDataBase(file.fileName);
        } else {
          this.addRecipeToDataBase('default.jpg');
        }
      });
    }

    render() {
        if (this.state.toUserPage) {
          return <Redirect to='/userPage' />
        } 
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Add recipe</legend>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Title</label>
                        <input
                         className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                         type="text" 
                         name="title"  
                         id="title"
                         onChange={this.onTitleChange}
                         >
                         </input>
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="image">Upload Image</label>
                        <input
                         className="pa2 ba bg-transparent hover-bg-black hover-white w-95"
                         type="file" 
                         name="image"  
                         id="image"
                         accept="image/*"
                         onChange={this.onFileChange}
                         >
                         </input>
                        </div>
                        <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Instructions</label>
                        <textarea 
                        id="instructions" 
                        rows="10" 
                        style={{resize: "none"}} 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black"
                        onChange={this.onInstructionsChange}
                        >
                        </textarea>
                        </div>
                        <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Ingredients</label>
                        <textarea 
                        id="ingredients" 
                        rows="10" 
                        style={{resize: "none"}} 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black"
                        onChange={this.onIngredientsChange}>
                        </textarea>
                        </div>
                    </fieldset>
                    <div className="">
                    { this.state.errorMessage &&
                          <p className="dark-red">{this.state.errorMessage}</p> }
                    <input
                         className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                         type="submit" 
                         value="Add" 
                         onClick={this.onSubmit}
                    ></input>
                    </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default AddRecipe;