import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogin } from "../../store/actions/user.js";

function LoginForm() {
	const history = useHistory();
	const dispatch = useDispatch();
	const hasLogin = useSelector(state => state.user.hasLogin);

	if (hasLogin) {
		history.push("/snip");
	}

	const [inputName, setInputName] = useState("");
	const [inputPass, setInputPass] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = event => {
		event.preventDefault();
		setError("");
		if (inputName && inputPass) {
			dispatch(
				userLogin({
					name: inputName,
					password: inputPass
				})
			);
			setInputName("");
			setInputPass("");
		} else {
			setError("invalid input");
		}
	};
	const handleNameInput = event => {
		setInputName(event.target.value);
	};
	const handlePassInput = event => {
		setInputPass(event.target.value);
	};

	return (
		<div>
			<h4>Login</h4>
			<p>{JSON.stringify(hasLogin)}</p>
			<form onSubmit={handleSubmit} autoComplete="off">
				<input
					type="text"
					placeholder="name"
					autoComplete="off"
					onChange={handleNameInput}
					value={inputName}
					data-testid="nameInput"
				/>
				<br />
				<input
					type="password"
					placeholder="password"
					autoComplete="off"
					onChange={handlePassInput}
					value={inputPass}
					data-testid="passInput"
				/>
				<br />
				<input type="submit" value="Login" data-testid="submitLogin" />
				<br />
				<span data-testid="errorLogin">{error}</span>
			</form>
			<div>
				<small>
					Don't have account? <a href="/register">Register</a>
				</small>
			</div>
		</div>
	);
}

export default LoginForm;
