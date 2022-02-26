import * as actionTypes from "./type.js"
import WorkoutServices from "../../LocalStorageServices/WorkoutServices";
import fetchByBodyPart from "../../Api/WorkoutApiCaller"
import * as helpers from "../../helpers/helpers.js"

let workouts = WorkoutServices.getWorkouts(); 


let getWorkoutsFetchOrLocal = (bodyPart)=>{
    workouts = WorkoutServices.getWorkouts(bodyPart);
    if(!helpers.checkUndefinedOrNull(workouts)){
        let fetchWorkouts = fetchByBodyPart.getWorkouts(bodyPart);
        console.log(fetchWorkouts)
        if(fetchWorkouts.length>0){
            WorkoutServices.setTargetWorkout(fetchWorkouts)
            return fetchWorkouts;
        }
        return null
    }
    let localWorkouts = []
    workouts.forEach(element => {
        if(element.bodyPart===bodyPart){
            localWorkouts.push(element)
        }
        if(localWorkouts.length>0){
            return localWorkouts;
        }else{
            return null;
        }
    });
}

export const WokoutsReducer = (state = workouts, action) =>{ 
            switch (action.type){
                case actionTypes.GetWorkouts:
                    var result = getWorkoutsFetchOrLocal(action.payload);
                    if(result>0){
                        return result
                    }
                    return null;
                    default:
                        return state;
                }
             
        }
        