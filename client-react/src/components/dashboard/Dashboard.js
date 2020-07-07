import React from "react";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";

import Sniplist from "./sniplist/Sniplist.js";
import NewSnipForm from "./sniplist/NewSnipForm.js";
import Sidebar from "./sidebar/Sidebar.js";

function Dashboard() {
	let { path } = useRouteMatch();
	return (
		<div className="container-fluid">
			<div className="row row-cols-2">
				<div className="col-3 db-side">
					<Sidebar />
				</div>
				<div className="col-9 pl-2 db-main">
					<Switch>
						<Route path={`${path}/new`}>
							<NewSnipForm />
						</Route>
						<Route path={`${path}/:lang`}>
							<Sniplist />
						</Route>
						<Route path={`${path}/`}>
							<Link to={`${path}/new`}>New Snip</Link>
							<Sniplist />
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
