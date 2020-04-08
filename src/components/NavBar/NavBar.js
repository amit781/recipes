import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const NavBar = ({ isSignedIn, signout }) => {
	if (isSignedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>				
				<p className='f3 link dim black pa3 pointer shadow-5'><Link to="/search"> Search </Link></p>
				<p className='f3 link dim black pa3 pointer shadow-5'><Link to="/userPage"> My Recipes </Link></p>
				<p onClick={signout} className='f3 link dim black pa3 pointer shadow-5'><Link to="/" > Sign Out </Link></p>
			</nav> );
	} else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>				
				<p className='f3 link dim black pa3 pointer shadow-5'><Link to="/signin"> SignIn </Link></p>
				<p className='f3 link dim black pa3 pointer shadow-5'><Link to="/register"> Register </Link></p>
			</nav> );
	}

}

export default NavBar;