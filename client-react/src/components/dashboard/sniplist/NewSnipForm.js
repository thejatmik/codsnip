import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postSnippet } from "../../../store/actions/snippet.js";

function NewSnipForm() {
	const dispatch = useDispatch();
	const accessToken = useSelector(state => state.user.token);
	const hasLogin = useSelector(state => state.user.hasLogin);
	const stateError = useSelector(state => state.snips.snippets_error);
	const history = useHistory();

	const [inputTitle, setInputTitle] = useState("");
	const [inputCode, setInputCode] = useState("");
	const [inputDesc, setInputDesc] = useState("");
	const [error, setError] = useState("");
	const notEmpty = inputTitle && inputCode;

	const handleSubmit = event => {
		event.preventDefault();
		let snippetPayload = {
			title: inputTitle,
			code: inputCode,
			description: inputDesc
		};
		if (!notEmpty) {
			setError("title and code are required");
		}
		console.log(snippetPayload, accessToken);
		dispatch(postSnippet({ snippetPayload, accessToken, history }));
	};
	const handleTitleInput = event => {
		setInputTitle(event.target.value);
	};
	const handleCodeInput = event => {
		setInputCode(event.target.value);
	};
	const handleDescInput = event => {
		setInputDesc(event.target.value);
	};

	return (
		<div>
			<h4>New Snip Form</h4>
			<form autoComplete="off" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Title"
					value={inputTitle}
					onChange={handleTitleInput}
				/>
				<br />

				<input
					type="text"
					placeholder="Code"
					value={inputCode}
					onChange={handleCodeInput}
				/>
				<br />

				<input
					type="text"
					placeholder="Description"
					value={inputDesc}
					onChange={handleDescInput}
				/>
				<br />

				{notEmpty && hasLogin ? (
					<input type="submit" value="Submit" />
				) : (
					<input disabled type="submit" value="Submit" />
				)}
			</form>
			<small>{error || stateError}</small>
			<Link to="/snip">Snips</Link>
		</div>
	);
}

export default NewSnipForm;
