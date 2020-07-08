import React from "react";
import { useHistory } from "react-router-dom";

function MenuLink(props) {
	const history = useHistory();
	const { link, label } = props;

	const handleClick = event => {
		event.preventDefault();
		history.push(link);
	};

	return (
		<div className="menu-link" onClick={handleClick}>
			{label.toUpperCase()}
			&nbsp;
		</div>
	);
}

export default MenuLink;
