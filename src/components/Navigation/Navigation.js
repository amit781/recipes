import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn, setIsSignedIn }) => {
	const onSignOut = () => {
		onRouteChange('signout');
		fetch('https://whispering-shelf-53733.herokuapp.com/auth/logout', {
	      method: 'get',
	      credentials: "include",
	      headers: {
	      	'Content-Type': 'application/json',
	      },
		})
	}

	if (isSignedIn) {
		return (
			<nav className="navbar">				
					<p onClick={() => onRouteChange('user-page')} className='f3 link dim black pa3 pointer shadow-5'> My recipes </p>
					<p onClick={() => onRouteChange('search')} className='f3 link dim black pa3 pointer shadow-5'> Search </p>
					<p onClick={onSignOut} className='f3 link dim black pa3 pointer shadow-5'> Sign Out </p>
			</nav> );
	} else {
		return (
			<nav className="navbar">				
				<p onClick={() => onRouteChange('signin')} className='f3 link dim black pa3 pointer shadow-5'> Sign In </p>
				<p onClick={() => onRouteChange('register')} className='f3 link dim black pa3 pointer shadow-5'> Register </p>
			</nav> ); 
	}
}

export default Navigation;