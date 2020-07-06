import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../../store/actions/user.js";

function LogoutPage() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(userLogout());
	}, [dispatch]);

	return (
		<div>
			<h4>You have been logged out</h4>
			<Link to="/login">Login</Link>
		</div>
	);
}

export default LogoutPage;
