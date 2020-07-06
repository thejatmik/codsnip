import React from "react";
import {
	Route,
	Link,
	Switch,
	BrowserRouter as Router,
	useRouteMatch
} from "react-router-dom";

import Sniplist from "./sniplist/Sniplist.js";
import NewSnipForm from "./sniplist/NewSnipForm.js";
import Sidebar from "./sidebar/Sidebar.js";

function Dashboard() {
	let { path } = useRouteMatch();
	return (
		<div>
			<h4>Dashboard placeholder</h4>
			<div className="db-main">
				<Router>
					<Link to={`${path}/new`}>New Snip</Link>
					<Switch>
						<Route path={`${path}/new`}>
							<NewSnipForm />
						</Route>
						<Route path={`${path}/:lang`}>
							<Sniplist />
						</Route>
						<Route path={`${path}/`}>
							<Sniplist />
						</Route>
					</Switch>
				</Router>
			</div>
			<div className="db-side">
				<Sidebar />
			</div>
		</div>
	);
}

export default Dashboard;
