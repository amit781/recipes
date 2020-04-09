import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Welcome from './components/Welcome/Welcome';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import SearchRecipe from './components/SearchRecipe/SearchRecipe';
import RecipePage from './components/RecipePage/RecipePage';
import UserPage from './components/UserPage/UserPage';
import AddRecipe from './components/AddRecipe/AddRecipe';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const initialState = {
  route: 'home', 
  isSignedIn: false,
  value: '', 
  recipeId: 0,
  user: {},
  recipesFrom: '', 
  toWelcomePage: false
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

  setRecipesFrom = (recipesFrom) => {
    this.setState({recipesFrom: recipesFrom});
  }  

  updateUser = (user) => {
    this.setState({user: user, isSignedIn: true});
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
    this.loadUser();
  }  

  onSignOut = () => {
    fetch('https://whispering-shelf-53733.herokuapp.com/auth/logout', {
        method: 'get',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
    }).then(res => res.json).then(console.log);
    this.setState(initialState);    
  } 

  render() {
      const { route, isSignedIn, recipeId, error, user, recipesFrom } = this.state;
      return (
       <Router>
        <main className="App"> 
          <NavBar isSignedIn={isSignedIn} signout={this.onSignOut}/>
          <Route path="/" exact component={Welcome} />
          <Route path="/signin"  render={(props) => <SignIn isSignedIn={isSignedIn} updateUser={this.updateUser}/>} />
          <Route path="/register" component={Register}/>
          <Route path="/search"  render={(props) => (isSignedIn ? <SearchRecipe user={user} loadUser={this.loadUser} setRecipeId={this.setRecipeId} setRecipesFrom={this.setRecipesFrom}/> : <Redirect to="/signin"/>)} />
          <Route path="/recipePage"  render={(props) => (isSignedIn ? <RecipePage recipeId={recipeId} recipesFrom={recipesFrom}/> : <Redirect to="/signin"/>)} />
          <Route path="/userPage"  render={(props) => (isSignedIn ? <UserPage user={user} setRecipeId={this.setRecipeId} setRecipesFrom={this.setRecipesFrom}/> : <Redirect to="/signin"/>)} />
          <Route path="/addRecipe"  render={(props) => (isSignedIn ? <AddRecipe user={user}/> : <Redirect to="/signin"/>)} />
        </main>
      </Router>
    );
  } 

  render2() {
    const { route, isSignedIn, recipeId, error, user, recipesFrom } = this.state;
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
                ? <SearchRecipe user={user} onRouteChange={this.onRouteChange} setRecipeId={this.setRecipeId} setRecipesFrom={this.setRecipesFrom}/>
                : (
                  route === 'recipe-page'
                  ? <RecipePage recipeId={recipeId} recipesFrom={recipesFrom}/>
                  : (
                    route === 'user-page'
                    ? <UserPage user={user} onRouteChange={this.onRouteChange} setRecipeId={this.setRecipeId} setRecipesFrom={this.setRecipesFrom}/>
                    : <AddRecipe user={user} onRouteChange={this.onRouteChange}/>
                    )
                  )
                ) 
              )
          )
        }
        
      </div>
    );
  }
}

export default App;
