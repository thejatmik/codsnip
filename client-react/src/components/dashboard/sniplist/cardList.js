import React from "react";
import { useSelector } from "react-redux";

import Card from "./card.js";

function CardList() {
	const snippets = useSelector(state => state.snips.snippets);
	const loading = useSelector(state => state.snips.snippets_loading);
	let snippetList = snippets.map(item => <Card key={item.id} item={item} />);

	if (loading) {
		return (
			<div className="snips-list">
				<p style={{ fontSize: "1.5em" }}>
					Loading<span className="blinking-cursor">_</span>
				</p>
			</div>
		);
	}
	if (snippets.length === 0) {
		return (
			<div className="snips-list">
				<p style={{ fontSize: "1.5em" }}>Empty</p>
			</div>
		);
	}

	return <div className="snips-list">{snippetList}</div>;
}

export default CardList;
