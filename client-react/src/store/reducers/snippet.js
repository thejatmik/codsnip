const initialState = {
	snippets: [],
	category: "all",
	snippets_loading: false,
	snippets_error: null
};

function snipReducers(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case "APPEND_SNIPPET":
			return {
				snippets: [payload, ...state.snippets]
			};
		case "APPEND_SNIPS":
			return {
				...state,
				snippets: [...payload, ...state.snippets]
			};
		case "RESET_SNIPS":
			return {
				...state,
				snippets: payload
			};
		case "SNIPS_SET_ERROR":
			return {
				...state,
				snippets_error: payload
			};
		case "SNIPS_RESET_ERROR":
			return {
				...state,
				snippets_error: null
			};
		case "SNIPS_TOGGLE_LOADING":
			return {
				...state,
				snippets_loading: !state.snippets_loading
			};
		default:
			return state;
	}
}

export default snipReducers;
