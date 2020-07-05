import React from "react";
import { Link } from "react-router-dom";

function TopBar() {
	return (
		<div>
			<h4>TopBar component</h4>
			<Link to="/" data-testid="top-to-home">
				Home
			</Link>
			<Link to="/login" data-testid="top-to-login">
				Login
			</Link>
			<Link to="/register" data-testid="top-to-register">
				Register
			</Link>
		</div>
	);
}

export default TopBar;
