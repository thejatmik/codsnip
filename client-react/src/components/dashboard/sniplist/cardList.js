import React from "react";
import { useSelector } from "react-redux";

import Card from "./card.js";

function CardList() {
	const snippets = useSelector(state => state.snips.snippets);
	let snippetList = snippets.map(item => <Card key={item.id} item={item} />);
	return <div>{snippetList}</div>;
}

export default CardList;
