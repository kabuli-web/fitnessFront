
import { combineReducers } from "redux";
import {userAuth} from "./User/reducers.js"
const reducers = combineReducers({
user:userAuth
})

export default reducers;