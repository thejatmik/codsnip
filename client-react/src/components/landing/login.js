import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { userLogin } from "../../store/actions/user.js";

function LoginForm() {
	const history = useHistory();
	const dispatch = useDispatch();
	const hasLogin = useSelector(state => state.user.hasLogin);
	const stateError = useSelector(state => state.user.error);
	const userLoading = useSelector(state => state.user.loading);

	if (hasLogin) {
		history.push("/snip");
	}

	const [inputName, setInputName] = useState("");
	const [inputPass, setInputPass] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = event => {
		event.preventDefault();
		setError("");
		dispatch({
			type: "USER_RESET_ERROR"
		});
		if (inputName && inputPass) {
			dispatch(
				userLogin({
					name: inputName,
					password: inputPass
				})
			);
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

	if (userLoading) {
		return <div className="loading-test loader"></div>;
	}

	return (
		<div>
			<h4>Login</h4>

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

				<span data-testid="errorLogin">{stateError || error}</span>
			</form>
			<div>
				<small>
					Don't have account? <Link to="/register">Register</Link>
				</small>
			</div>
		</div>
	);
}

export default LoginForm;
