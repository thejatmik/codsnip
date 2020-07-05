const initialState = {
	status: "user state status is ok",
	loading: false,
	error: null,
	cred: null
};

function userReducers(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		default:
			return state;
	}
}

export default userReducers;
