import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSnippets } from "../../../store/actions/snippet.js";
import CardList from "./cardList.js";

function Sniplist() {
	const dispatch = useDispatch();
	const snippets = useSelector(state => state.snips.snippets);

	useEffect(() => {
		dispatch(fetchSnippets());
	}, [dispatch]);

	let { lang } = useParams();
	lang = lang || "all";

	let snippetList = snippets ? <p>Empty</p> : <CardList />;
	return (
		<div>
			<h4>Sniplist: {lang}</h4>
			{snippetList}
		</div>
	);
}

export default Sniplist;
