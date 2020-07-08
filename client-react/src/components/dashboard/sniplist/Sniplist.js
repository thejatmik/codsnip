import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewSnippets } from "../../../store/actions/snippet.js";
import CardList from "./cardList.js";

function Sniplist() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchNewSnippets());
	}, [dispatch]);

	let { lang } = useParams();
	lang = lang || "all";

	return (
		<div>
			<h4>Sniplist: {lang}</h4>
			<CardList />
		</div>
	);
}

export default Sniplist;
