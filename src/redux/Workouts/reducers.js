import * as actionTypes from "./type.js"


export const WokoutsReducer =  (state = [], action) =>{ 
            switch (action.type){

                case actionTypes.RequestWorkouts:
                    return {
                        // ...state,
                        loading:true
                    }
                case actionTypes.GetWorkoutsSucceeded:
                    return {
                        workouts:action.payload,
                        loading:false
                    }
                case actionTypes.GetWorkoutsFailed:
                    return {
                        workouts:[],
                        loading:false,
                        error:action.payload
                    }
                default:
                    return state;
                }
             
        }
        