
import * as actionTypes  from "./type.js";


export const GetWorkout = (bodyPart)=>{
    return {
        type: actionTypes.GetWorkouts,
        payload:bodyPart
    }
}



