import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function RegisterForm() {
	const history = useHistory();
	const hasLogin = useSelector(state => state.user.hasLogin);

	if (hasLogin) {
		history.push("/snip");
	}

	const [inputName, setInputName] = useState("");
	const [inputPass, setInputPass] = useState("");
	const [inputVerify, setInputVerify] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = event => {
		event.preventDefault();
		setError("");
		const notEmpty = inputName && inputPass && inputVerify;
		const passVerify = inputPass == inputVerify;
		if (notEmpty && passVerify) {
			setInputName("");
			setInputPass("");
			setInputVerify("");
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
	const handleVerifyInput = event => {
		setInputVerify(event.target.value);
	};

	return (
		<div>
			<h4>Register</h4>
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
				<input
					type="password"
					placeholder="verify password"
					autoComplete="off"
					onChange={handleVerifyInput}
					value={inputVerify}
					data-testid="verifyInput"
				/>
				<br />
				<input type="submit" value="Register" data-testid="submitRegister" />
				<br />
				<span data-testid="registerError">{error}</span>
			</form>
		</div>
	);
}

export default RegisterForm;
