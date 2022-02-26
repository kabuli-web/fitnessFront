
import { combineReducers } from "redux";
import {userAuth} from "./User/reducers.js"
import {WokoutsReducer} from "./Workouts/reducers.js"

const reducers = combineReducers({
user:userAuth,
workouts:WokoutsReducer
})

export default reducers;