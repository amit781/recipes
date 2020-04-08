import React, {Component} from 'react';
import { Redirect } from "react-router-dom";

class SignIn extends Component{

  constructor(props) {
    super();
    this.state = {
      signInEmail: '',
      signInPassword: '',
      errorMessage: '',
      toSearchPage: false, 
      toRegister: false
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('https://whispering-shelf-53733.herokuapp.com/auth/signin', {
      method: 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail ,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.updateUser(user)
        this.setState({toSearchPage: true});
        // this.props.onRouteChange('search');
        // this.props.loadUser();
      } else {
        this.setState({errorMessage: user})
      }
    })
  }  

  render() {
    // const { onRouteChange } = this.props;
    if (this.state.toSearchPage) {
      return <Redirect to='/search' />
    } 
    if (this.state.toRegister) {
      return <Redirect to='/register' />
    }
	  return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                { this.state.errorMessage &&
                  <p className="dark-red">Email or Password is incorrect</p> }
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={this.onSubmitSignIn}
              />
            </div>
            <div className="lh-copy mt3">
              <p className="f6 link dim black db pointer" onClick={() => this.setState({toRegister: true})}>Register</p>
              </div>
          </div>
        </main>
      </article>
    );
  }
}


export default SignIn;