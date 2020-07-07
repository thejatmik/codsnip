import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postSnippet } from "../../../store/actions/snippet.js";
import CodeEditor from "./CodeEditor.js";

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
	const handleDescInput = event => {
		setInputDesc(event.target.value);
	};

	return (
		<div className="snips-form">
			<Link to="/snip">Snips</Link>
			<h4>New Snip Form</h4>
			<form autoComplete="off" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Title"
					value={inputTitle}
					onChange={handleTitleInput}
					className="snips-input"
				/>
				<br />

				<CodeEditor code={inputCode} setCode={setInputCode} />

				<textarea
					placeholder="Description"
					value={inputDesc}
					onChange={handleDescInput}
					className="snips-input"
				/>
				<br />

				{notEmpty && hasLogin ? (
					<input type="submit" value="Submit" />
				) : (
					<input disabled type="submit" value="Submit" />
				)}
			</form>
			<small>{error || stateError}</small>
		</div>
	);
}

export default NewSnipForm;
