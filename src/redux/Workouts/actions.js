
import * as actionTypes  from "./type.js";

import WorkoutServices from "../../LocalStorageServices/WorkoutServices";
import WorkoutApi from "../../Api/WorkoutApiCaller"


import * as helpers from "../../helpers/helpers.js"

let getWorkoutsFetchOrLocal =  async (bodyPart)=>{
    let workouts = WorkoutServices.getWorkouts(bodyPart);
    // console.log("The condition is "+ helpers.checkUndefinedOrNull(workouts));
    // console.log(`These are the workouts returned from the local storage ${workouts}`)
    
    let apiWorkouts = []
    workouts?.forEach(element => {
       
        if(element.bodyPart===bodyPart){
            apiWorkouts.push(element)
        }
        
    });
    console.log(apiWorkouts)
    if(!helpers.checkUndefinedOrNull(apiWorkouts) || apiWorkouts.length===0){
        console.log("api service ran")
      try {
        let response =  await WorkoutApi.fetchExercisesByBodyPart(bodyPart);
        console.log( response)
        if(response.length>0){
            WorkoutServices.setTargetWorkout(response)
            return {data:response};
        }
      } catch (error) {
          return {error}
      }
       
        
      return {error:"error"};
    }
    console.log(workouts.length)
    if(apiWorkouts.length>0){
        console.log("local storage service ran")
        return {data:apiWorkouts};
    }else{
        return {data:workouts};
        
    }
    
}
let getDynamicFetchOrLocal =  async (dynamicName,dynamicApiFunction)=>{
    let dynamics = WorkoutServices.getDynamic(dynamicName);
    // console.log("The condition is "+ helpers.checkUndefinedOrNull(workouts));
    // console.log(`These are the workouts returned from the local storage ${workouts}`)
    
    
    console.log(dynamics)
    if(!helpers.checkUndefinedOrNull(dynamics) || dynamics.length===0){
        console.log("api service ran")
      try {
          //TODO Change Api Calling to Dynamic when needed
        let apiDynamics =  await dynamicApiFunction();
        console.log( apiDynamics)
        if(apiDynamics.length>0){
            WorkoutServices.setDynamics(dynamicName,apiDynamics,false)
            return {data:apiDynamics};
        }
      } catch (error) {
          console.log(error)
          return {error}
      }
       
        
      return {error:"Something went wrong with the api"};
    }
    console.log(dynamics.length)
    
    return {data:dynamics};
        
    
}

export const RequestInitiated = ()=>{
    return {
        type: actionTypes.RequestInitiated
    }
}
export const RequestFailed = (error)=>{
    return {
        type: actionTypes.RequestFailed,
        payload:error
    }
}
export const RequestSucceeded = (workouts)=>{
    return {
        type: actionTypes.RequestSucceeded,
        payload:workouts
    }
}
export const GetWorkout =  (bodyPart)=>{
    return   async (dispatch)=>{
        dispatch(RequestInitiated())
        let response =  await getWorkoutsFetchOrLocal(bodyPart);
        
            
            if(response!==null && response.data!==null && response.data!==undefined && response.data.length>0){
                
                dispatch(RequestSucceeded(response.data))
                
            }else{
                dispatch(RequestFailed(response.error))
            }

            
         
    }
}

export const GetBodyParts =  ()=>{
    return   async (dispatch)=>{
        dispatch(RequestInitiated())
        let response =  await getDynamicFetchOrLocal("bodyParts",WorkoutApi.fetcnbodyparts);
        
            
            if(response!==null&& response.data!==null && response.data!==undefined && response.data.length>0){
                
                dispatch(RequestSucceeded(response.data))
                
            }else{
                dispatch(RequestFailed(response.error))
            }

            
         
    }
}



