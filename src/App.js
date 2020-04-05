import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Welcome from './components/Welcome/Welcome';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import SearchRecipe from './components/SearchRecipe/SearchRecipe';
import RecipePage from './components/RecipePage/RecipePage';

const initialState = {
  route: 'home', 
  isSignedIn: false,
  value: '', 
  recipeId: 0,
  user: {} 
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onRouteChange = (route) => {
  if (route === 'signout') {
      this.setState(initialState);
  } else if (route === 'search') {
    this.setState({isSignedIn: true});
  }
  this.setState({route: route})
  }

  setRecipeId = (id) => {
    this.setState({recipeId: id});
  }

  loadUser = () => {
    fetch("https://whispering-shelf-53733.herokuapp.com/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
    .then(response => {
      this.setState({
        isSignedIn: true,
        user: response.user
        });
    })
    .catch(error => {
      this.setState({
        isSignedIn: false,
        error: "Failed to authenticate user"
      });
    });
  }

  // keep session
  componentDidMount() {
    loadUser();
  }    

  render() {
    const { route, isSignedIn, recipeId, error } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' || route === 'signout'
        ? <Welcome/>
        : ( 
          route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} loadUser={this.loadUser}/>
            : (
              route === 'register'
              ? <Register onRouteChange={this.onRouteChange}/>
              : (
                route === 'search'
                ? <SearchRecipe onRouteChange={this.onRouteChange} SetRecipeId={this.setRecipeId}/>
                : <RecipePage recipeId={recipeId}/>
                ) 
              )
          )
        }
        
      </div>
    );
  }
}

export default App;
