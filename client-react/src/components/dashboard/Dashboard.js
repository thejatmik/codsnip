import React from "react";

import Sniplist from "./sniplist/Sniplist.js";
import Sidebar from "./sidebar/Sidebar.js";

function Dashboard() {
	return (
		<div>
			<h4>Dashboard placeholder</h4>
			<div className="db-main">
				<Sniplist />
			</div>
			<div className="db-side">
				<Sidebar />
			</div>
		</div>
	);
}

export default Dashboard;
