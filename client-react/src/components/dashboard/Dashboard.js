import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";

import Sniplist from "./sniplist/Sniplist.js";
import NewSnipForm from "./sniplist/NewSnipForm.js";
import Sidebar from "./sidebar/Sidebar.js";

function Dashboard() {
	let { path } = useRouteMatch();
	const [currentFocused, setCurrentFocused] = useState(-1);
	let snippets = useSelector(state => state.snips.snippets);
	let cardsNum = snippets.length;

	const keypressHandler = event => {
		const tagName = document.activeElement.tagName;
		const notInput = tagName !== "INPUT";
		const notTextArea = tagName !== "TEXTAREA";
		if (!notInput || !notTextArea) {
			return;
		}

		let next = currentFocused;
		if (event.code === "KeyJ") {
			next++;
		}
		if (event.code === "KeyK") {
			next--;
		}
		if (next < 0) next = 0;
		if (next >= cardsNum) next = cardsNum - 1;

		let el = document.getElementsByClassName("snips-card")[next];
		if (!el) {
			return;
		}
		el.focus();
		el.scrollIntoView(false);
		setCurrentFocused(next);
	};

	useEffect(() => {
		window.addEventListener("keypress", keypressHandler, false);
		return function cleanup() {
			window.removeEventListener("keypress", keypressHandler);
		};
	});

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
