import React, { useState } from "react";

function LoginForm() {
	const [inputName, setInputName] = useState("");
	const [inputPass, setInputPass] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = event => {
		event.preventDefault();
		setError("");
		if (inputName && inputPass) {
			// send login cred here, then empty
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
		</div>
	);
}

export default LoginForm;
