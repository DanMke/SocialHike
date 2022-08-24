import { combineReducers } from "redux";
import { userReducer } from "./users";

export const Reducers = combineReducers({
    user: userReducer,
});