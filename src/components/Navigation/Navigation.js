import React from 'react';

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
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>				
					<p onClick={() => onRouteChange('user-page')} className='f3 link dim black pa3 pointer shadow-5'> My recipes </p>
					<p onClick={() => onRouteChange('search')} className='f3 link dim black pa3 pointer shadow-5'> Search </p>
					<p onClick={onSignOut} className='f3 link dim black pa3 pointer shadow-5'> Sign Out </p>
			</nav> );
	} else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>				
				<p onClick={() => onRouteChange('signin')} className='f3 link dim black pa3 pointer shadow-5'> Sign In </p>
				<p onClick={() => onRouteChange('register')} className='f3 link dim black pa3 pointer shadow-5'> Register </p>
			</nav> ); 
	}
}

export default Navigation;