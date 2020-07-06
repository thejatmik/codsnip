import React from "react";
import { useSelector } from "react-redux";

import LoginForm from "../../landing/login.js";
import Content from "./content.js";

function Sidebar() {
	const hasLogin = useSelector(state => state.user.hasLogin);

	return (
		<div>
			<h4>Sidebar</h4>
			{hasLogin ? <Content /> : <LoginForm />}
		</div>
	);
}

export default Sidebar;
