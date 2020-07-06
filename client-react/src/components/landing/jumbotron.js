import React from "react";
import { useSelector } from "react-redux";

function Jumbotron() {
	const userStatus = useSelector(state => state.user.status);
	return (
		<div>
			<h4 data-testid="jumbotronTitle">Jumbotron placeholder</h4>
		</div>
	);
}

export default Jumbotron;
