import axios from "axios";
import { useState } from "react";

const initialFormValues = {
	username: "Lambda",
	password: "School",
};

export const Login = (props) => {
	const [formValues, setFormValues] = useState(initialFormValues);

	const onChangeHandler = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const login = { ...formValues };
		axios
			.post(`http://localhost:5000/api/login`, login)
			.then((res) => {
				localStorage.setItem("token", res.data.payload);
				setFormValues(initialFormValues);
				props.history.push("/bubblepage");
			})
			.catch((err) => setError(JSON.stringify(err.message)));
	};

	const [error, setError] = useState(null);

	return (
		<div>
			<h1>Welcome to the Bubble App!</h1>
			<div data-testid="loginForm" className="login-form">
				<h2>Login</h2>
				<form onSubmit={onSubmitHandler}>
					<input
						id="username"
						type="text"
						name="username"
						value={formValues.username}
						onChange={onChangeHandler}
					/>

					<input
						id="password"
						type="password"
						name="password"
						value={formValues.password}
						onChange={onChangeHandler}
					/>
					<button id="submit">Submit</button>
				</form>
			</div>

			<p id="error" className="error">
				{error}
			</p>
		</div>
	);
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.*
//2. Add whatever state necessary for form functioning. *
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"*
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"
