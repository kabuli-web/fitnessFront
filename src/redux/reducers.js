
import { combineReducers } from "redux";
import {userAuth} from "./User/reducers.js"
import {WokoutsReducer} from "./Workouts/reducers.js"
import {RecipesReducer} from "./Recipes.js/reducers.js"
import {IntakeEntriesReducer} from "./DailyIntake/reducers"
const reducers = combineReducers({
user:userAuth,
workouts:WokoutsReducer,
recipes:RecipesReducer,
Entries:IntakeEntriesReducer
})

export default reducers;