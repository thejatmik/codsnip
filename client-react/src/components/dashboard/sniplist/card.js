import React from "react";

function Card({ item }) {
	return (
		<div>
			<h6>{item.title}</h6>
			<p>{item.code}</p>
			<p>{item.description}</p>
		</div>
	);
}

export default Card;
