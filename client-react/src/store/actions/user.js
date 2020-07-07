import axios from "axios";

export const userLogin = userPayload => {
	return dispatch => {
		dispatch({
			type: "USER_TOGGLE_LOADING"
		});
		dispatch({
			type: "USER_RESET_ERROR"
		});
		axios({
			method: "post",
			url: "http://localhost:3600/login",
			data: {
				name: userPayload.name,
				password: userPayload.password
			}
		})
			.then(res => {
				console.log(res);
				dispatch({
					type: "SET_CRED",
					payload: res.data.user
				});
				dispatch({
					type: "USER_SET_TOKEN",
					payload: res.data.accessToken
				});
				dispatch({
					type: "SET_HAS_LOGIN",
					payload: true
				});
			})
			.catch(err => {
				console.log(err.response.data);
				dispatch({
					type: "USER_SET_ERROR",
					payload: err.response.data.error
				});
			})
			.finally(_ => {
				dispatch({
					type: "USER_TOGGLE_LOADING"
				});
			});
	};
};

export const userRegister = userPayload => {
	return dispatch => {
		dispatch({
			type: "USER_TOGGLE_LOADING"
		});
		dispatch({
			type: "USER_RESET_ERROR"
		});
		axios({
			method: "post",
			url: "http://localhost:3600/register",
			data: {
				name: userPayload.name,
				password: userPayload.password
			}
		})
			.then(res => {
				dispatch({
					type: "SET_CRED",
					payload: res.data.user
				});
				dispatch({
					type: "USER_SET_TOKEN",
					payload: res.data.accessToken
				});
				dispatch({
					type: "SET_HAS_LOGIN",
					payload: true
				});
			})
			.catch(err => {
				console.log(err.response.data);
				let error = err.response.data.error || err.response.data.errors;
				dispatch({
					type: "USER_SET_ERROR",
					payload: error
				});
			})
			.finally(_ => {
				dispatch({
					type: "USER_TOGGLE_LOADING"
				});
			});
	};
};

export const userLogout = () => {
	return dispatch => {
		dispatch({
			type: "SET_HAS_LOGIN",
			payload: false
		});
		dispatch({
			type: "RESET_CRED"
		});
		dispatch({
			type: "USER_RESET_TOKEN"
		});
	};
};
