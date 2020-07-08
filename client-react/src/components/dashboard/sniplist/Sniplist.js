import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewSnippets } from "../../../store/actions/snippet.js";
import CardList from "./cardList.js";

function Sniplist() {
	const dispatch = useDispatch();
	const snippets = useSelector(state => state.snips.snippets);

	useEffect(() => {
		dispatch(fetchNewSnippets());
	}, [dispatch]);

	let { lang } = useParams();
	lang = lang || "all";

	let snippetList = snippets.length > 0 ? <CardList /> : <p>Empty</p>;
	return (
		<div>
			<h4>Sniplist: {lang}</h4>
			{snippetList}
		</div>
	);
}

export default Sniplist;
