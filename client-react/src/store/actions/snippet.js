import axios from "axios";

export const fetchSnippets = () => {
	return dispatch => {
		dispatch({
			type: "SNIPS_RESET_ERROR"
		});
		dispatch({
			type: "SNIPS_TOGGLE_LOADING"
		});
		axios({
			method: "get",
			url: "http://localhost:3602/allSnip"
		})
			.then(res => {
				dispatch({
					type: "APPEND_SNIPS",
					payload: res.data.snippets
				});
			})
			.catch(err => {
				console.log(err.response.data);
				dispatch({
					type: "SNIPS_SET_ERROR",
					payload: err.response.data.error
				});
			})
			.finally(_ => {
				dispatch({
					type: "SNIPS_TOGGLE_LOADING"
				});
			});
	};
};

export const postSnippet = ({ snippetPayload, accessToken, history }) => {
	return dispatch => {
		dispatch({
			type: "SNIPS_TOGGLE_LOADING"
		});
		axios({
			method: "post",
			url: "http://localhost:3602/newSnips",
			headers: {
				accessToken: accessToken
			},
			data: snippetPayload
		})
			.then(res => {
				console.log(res.data);
				dispatch({
					type: "APPEND_SNIPPET",
					payload: res.data.created
				});
				history.push("/snip");
			})
			.catch(err => {
				console.log(err.response.data);
				let error = err.response.data.error || err.response.data.errors;
				dispatch({
					type: "SNIPS_SET_ERROR",
					payload: error
				});
			})
			.finally(_ => {
				dispatch({
					type: "SNIPS_TOGGLE_LOADING"
				});
			});
	};
};
