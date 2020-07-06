import React from "react";
import { Link } from "react-router-dom";

function TopBar() {
	return (
		<div>
			<Link to="/" data-testid="top-to-home">
				Home
			</Link>
			<Link to="/snip" data-testid="top-to-snip">
				Snippets
			</Link>
			<Link to="/login" data-testid="top-to-login">
				Login
			</Link>
			<Link to="/register" data-testid="top-to-register">
				Register
			</Link>
			<Link to="/logout" data-testid="top-to-logout">
				Logout
			</Link>
		</div>
	);
}

export default TopBar;
