import React from "react";
import { Link } from "react-router-dom";

function Content() {
	return (
		<div>
			<h5>Sidebar content</h5>
			<Link to="/snip/new">New Snip</Link>
			<p>Open Profile</p>
			<p>My Snips</p>
		</div>
	);
}

export default Content;
