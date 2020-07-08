import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MenuLink from "./MenuLink.js";

function TopBar() {
	const hasLogin = useSelector(state => state.user.hasLogin);
	return (
		<div id="menu-bar">
			<MenuLink link="/" label="home" data-testid="top-to-home" />
			<MenuLink link="/snip" label="snippets" data-testid="top-to-snip" />
			{!hasLogin ? (
				<>
					<MenuLink link="/login" label="login" data-testid="top-to-login" />
					<MenuLink
						link="/register"
						label="register"
						data-testid="top-to-register"
					/>
				</>
			) : (
				<>
					<MenuLink link="/logout" label="logout" data-testid="top-to-logout" />
				</>
			)}
		</div>
	);
}

export default TopBar;
