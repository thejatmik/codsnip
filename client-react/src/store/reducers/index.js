import { combineReducers, createStore, applyMiddleware } from "redux";
import userReducers from "./user.js";
import thunk from "redux-thunk";

const mainReducers = combineReducers({
	user: userReducers
});

const store = createStore(mainReducers, applyMiddleware(thunk));

export default store;
