import React, {Component} from 'react';
import GoogleButton from 'react-google-button';

class Register extends Component {
	constructor(props) {
		super();
		this.state = {
      	email: '',
      	password: '',
      	name: '',
      	errorMessage: ''
    	}
	}

	onNameChange = (event) => {
  		this.setState({name: event.target.value})
  	}

 	onEmailChange = (event) => {
  		this.setState({email: event.target.value})
  	}

  	onPasswordChange = (event) => {
  		this.setState({password: event.target.value})
  	}

  	onSubmitRegister = () => {
  		const {name, password, email} = this.state;
  		fetch('https://whispering-shelf-53733.herokuapp.com/auth/register', {
	      method: 'post',
	      credentials: 'include',
	      headers: {
	      	'Content-Type': 'application/json',
        	// "Access-Control-Allow-Credentials": true
	      },
	      body: JSON.stringify({
	        email: email,
	        password: password,
	        name: name
	      })
	    })
	    .then(response => response.json())
	    .then(user => {
	    	if (user.id) {
	    		alert('Succesfully added');
	    		this.props.onRouteChange('signin');
	    	} else {
	    		this.setState({errorMessage: user})
	    	}
	    })
	    .catch(err => console.log(err, "*******"));
  	}

  	onSubmitRegisterGoogle = () => {
  		window.open('https://whispering-shelf-53733.herokuapp.com/auth/google', "_self")
  	}

	render() {
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 flex-center">
		        <main className="pa4 black-80">
		          <div className="measure">
		          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		            <legend className="f1 fw6 ph0 mh0">Register</legend>
		            { this.state.errorMessage &&
                  		<p className="dark-red">{this.state.errorMessage}</p> }
		            <div className="mt3">
		            <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
		            <input
		             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		             type="text" 
		             name="full-name"  
		             id="full-name"
		             onChange={this.onNameChange}
		             >
		             </input>
		            </div>
		            <div className="mt3">
		            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
		            <input
		             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		             type="email" 
		             name="email-address"  
		             id="email-address"
		             onChange={this.onEmailChange}
		             >
		             </input>
		            </div>
		            <div className="mv3">
		            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
		            <input
		             className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		             type="password" 
		             name="password"  
		             id="password"
		             onChange={this.onPasswordChange}
		             >
		             </input>
		            </div>
		          </fieldset>
		          <div className="">
		            <input
		             className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
		             type="submit" 
		             value="Register" 
		             onClick={this.onSubmitRegister}
		             ></input>
		          </div>
		           <div className="">
		             <GoogleButton className='ma2' type='light' onClick={this.onSubmitRegisterGoogle}/>
		          </div> 
		          </div>
		        </main>
		      </article>
	    );
	}
}

export default Register;