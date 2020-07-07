import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function TopBar() {
	const hasLogin = useSelector(state => state.user.hasLogin);
	return (
		<div id="top-bar">
			<Link to="/" data-testid="top-to-home">
				Home&nbsp;
			</Link>
			<Link to="/snip" data-testid="top-to-snip">
				Snippets&nbsp;
			</Link>
			{!hasLogin ? (
				<>
					<Link to="/login" data-testid="top-to-login">
						Login&nbsp;
					</Link>
					<Link to="/register" data-testid="top-to-register">
						Register&nbsp;
					</Link>
				</>
			) : (
				<>
					<Link to="/logout" data-testid="top-to-logout">
						Logout&nbsp;
					</Link>
				</>
			)}
		</div>
	);
}

export default TopBar;
