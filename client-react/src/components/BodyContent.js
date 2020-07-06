import React from "react";
import { Switch, Route } from "react-router-dom";
import "../styles/test-color.scss";
import classNames from "classnames";

import Jumbotron from "./landing/jumbotron.js";
import LoginForm from "./landing/login.js";
import RegisterForm from "./landing/register.js";
import Dashboard from "./dashboard/Dashboard.js";

function BodyContent() {
	return (
		<div id="main-body" className={classNames("bg-black")}>
			<Switch>
				<Route path="/snip">
					<Dashboard />
				</Route>
				<Route path="/register">
					<RegisterForm />
				</Route>
				<Route path="/login">
					<LoginForm />
				</Route>
				<Route exact path="/">
					<Jumbotron />
				</Route>
			</Switch>
		</div>
	);
}

export default BodyContent;
