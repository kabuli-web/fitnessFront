
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
// const reducers = (state = {}, action) => ({
//     // username: UsernameReducer(state.username, action),
//     // builds: BuildsReducer(state.builds, action),
//     user:userAuth(state.user,action),
//     workouts:WokoutsReducer(state.workouts,action),
//     recipes:RecipesReducer(state.recipes,action),
//     Entries:IntakeEntriesReducer(state.Entries,action)
// })
export default reducers;