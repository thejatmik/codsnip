import React from "react";
import CodeViewer from "./CodeViewer.js";

function Card({ item }) {
	return (
		<div className="snips-card">
			<div className="snips-card-title">{item.title}</div>
			<CodeViewer code={item.code} />
			<div className="snips-card-detail">{item.description}</div>
		</div>
	);
}

export default Card;
