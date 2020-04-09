import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './NavBar.css';

const NavBar = ({ isSignedIn, signout }) => {
	if (isSignedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end', margin: '10px'}}>
				<ul className="pointer">
					<li className="Menu">Menu
						<ul>
							<li><Link style={{ textDecoration: 'underline #b7db50' }} to="/search"> Search </Link></li>
							<li><Link style={{ textDecoration: 'underline #b7db50' }} to="/userPage"> My Recipes </Link></li>
							<li onClick={signout} ><Link style={{ textDecoration: 'underline #b7db50' }} to="/" > Sign Out </Link></li>
						</ul>
					</li>
				</ul>
			</nav>
		)
	} else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end', margin: '10px'}}>
				<ul className="pointer">
					<li className="Menu">Menu
						<ul>
							<li><Link style={{ textDecoration: 'underline #b7db50' }} to="/signin"> SignIn </Link></li>
							<li><Link style={{ textDecoration: 'underline #b7db50' }} to="/register"> Register </Link></li>
						</ul>
					</li>
				</ul>
			</nav>
		)
	}

}

export default NavBar;