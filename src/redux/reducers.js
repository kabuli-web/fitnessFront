
import { combineReducers } from "redux";
import {userAuth} from "./User/reducers.js"
import {WokoutsReducer} from "./Workouts/reducers.js"
import {RecipesReducer} from "./Recipes.js/reducers.js"

const reducers = combineReducers({
user:userAuth,
workouts:WokoutsReducer,
recipes:RecipesReducer
})

export default reducers;