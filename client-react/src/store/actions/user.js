export const userLogin = userPayload => {
	return dispatch => {
		dispatch({
			type: "TOGGLE_HAS_LOGIN"
		});
		dispatch({
			type: "SET_CRED",
			payload: {
				name: userPayload.name,
				id: "1"
			}
		});
		dispatch({
			type: "USER_SET_TOKEN",
			payload: "sometokenwantstotoldme"
		});
	};
};

export const userLogout = () => {
	return dispatch => {
		dispatch({
			type: "TOGGLE_HAS_LOGIN"
		});
		dispatch({
			type: "RESET_CRED"
		});
		dispatch({
			type: "USER_RESET_TOKEN"
		});
	};
};
