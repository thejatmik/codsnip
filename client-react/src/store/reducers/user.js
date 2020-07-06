const initialState = {
	status: "user state status is ok",
	loading: false,
	error: null,
	cred: null,
	hasLogin: false,
	token: null
};

function userReducers(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case "USER_SET_TOKEN":
			return {
				...state,
				token: payload
			};
		case "USER_RESET_TOKEN":
			return {
				...state,
				token: null
			};
		case "TOGGLE_HAS_LOGIN":
			return {
				...state,
				hasLogin: !state.hasLogin
			};
		case "SET_CRED":
			return {
				...state,
				cred: payload
			};
		case "RESET_CRED":
			return {
				...state,
				cred: null
			};
		case "USER_SET_ERROR":
			return {
				...state,
				error: payload
			};
		case "USER_RESET_ERROR":
			return {
				...state,
				error: null
			};
		case "USER_TOGGLE_LOADING":
			return {
				...state,
				loading: !state.loading
			};
		default:
			return state;
	}
}

export default userReducers;
