import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import BodyContent from "./components/BodyContent.js";

function App() {
	return (
		<Router>
			<div>
				<Header />
				<Switch>
					<Route path="/">
						<BodyContent />
					</Route>
				</Switch>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
