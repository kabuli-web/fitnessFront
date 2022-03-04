
import * as actionTypes  from "./type.js";

import WorkoutServices from "../../LocalStorageServices/WorkoutServices";
import fetchByBodyPart from "../../Api/WorkoutApiCaller"
import * as helpers from "../../helpers/helpers.js"

let getWorkoutsFetchOrLocal =  async (bodyPart)=>{
    let workouts = WorkoutServices.getWorkouts(bodyPart);
    if(!helpers.checkUndefinedOrNull(workouts)){
       let response =  await fetchByBodyPart(bodyPart);
        console.log( response.length>0)
        if(response.length>0){
            WorkoutServices.setTargetWorkout(response)
            return response;
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

export const GetWorkoutRequest = ()=>{
    return {
        type: actionTypes.RequestWorkouts
    }
}
export const GetWorkoutFailed = (error)=>{
    return {
        type: actionTypes.GetWorkoutsFailed,
        payload:error
    }
}
export const GetWorkoutSuccess = (workouts)=>{
    return {
        type: actionTypes.GetWorkoutsSucceeded,
        payload:workouts
    }
}
export const GetWorkout =  (bodyPart)=>{
    return   async (dispatch)=>{
        dispatch(GetWorkoutRequest())
        let response =  await getWorkoutsFetchOrLocal(bodyPart);
        
             console.log( response)
            if(response!==null && response!==undefined && response.length>0){
                
                dispatch(GetWorkoutSuccess(response))
                
            }
         
    }
}



