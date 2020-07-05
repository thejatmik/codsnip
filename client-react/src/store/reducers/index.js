import { combineReducers, createStore } from "redux";
import userReducers from "./user.js";

const mainReducers = combineReducers({
	user: userReducers
});

const store = createStore(mainReducers);

export default store;
