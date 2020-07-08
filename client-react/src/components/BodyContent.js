import React from "react";
import { Switch, Route } from "react-router-dom";

import Jumbotron from "./landing/jumbotron.js";
import LoginForm from "./landing/login.js";
import RegisterForm from "./landing/register.js";
import Dashboard from "./dashboard/Dashboard.js";
import LogoutPage from "./landing/logout.js";

function BodyContent() {
	return (
		<div id="main-body">
			<Switch>
				<Route path="/snip">
					<Dashboard />
				</Route>
				<Route path="/register">
					<div className="landing-form">
						<RegisterForm />
					</div>
				</Route>
				<Route path="/login">
					<div className="landing-form">
						<LoginForm />
					</div>
				</Route>
				<Route path="/logout">
					<div className="landing-form">
						<LogoutPage />
					</div>
				</Route>
				<Route exact path="/">
					<Jumbotron />
				</Route>
			</Switch>
		</div>
	);
}

export default BodyContent;
