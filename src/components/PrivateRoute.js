import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(componentProps) => {
				if (localStorage.getItem("token")) {
					return <Component {...componentProps} />;
				} else {
					return <Redirect to="/login" />;
				}
			}}
		/>
	);
};

export default PrivateRoute;
//Task List:
//1. Build a PrivateRoute component that redirects if user is not logged in
