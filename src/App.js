import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import BubblePage from "./components/BubblePage";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { axiosWithAuth } from "./helpers/axiosWithAuth";
import "./styles.scss";

function App() {
	const logout = () => {
		axiosWithAuth()
			.post(`http://localhost:5000/api/logout`)
			.then((res) => localStorage.removeItem("token"))
			.catch((err) => console.log(err));
	};

	return (
		<Router>
			<div className="App">
				<header>
					Color Picker Sprint Challenge
					<a data-testid="logoutButton" href="/login" onClick={logout}>
						logout
					</a>
				</header>
				<Route exact path="/login" component={Login} />
				<Route exact path="/" render={() => <Redirect to="/login" />} />
				<PrivateRoute exact path="/bubblepage" component={BubblePage} />
			</div>
		</Router>
	);
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.*
//2. Render BubblePage as a PrivateRoute*
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.*
