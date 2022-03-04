
import * as actionTypes  from "./type.js";

export const LoginUser = (user)=>{
    return {
        type: actionTypes.LoginUser,
        payload : user
    }
}
export const LogoutUser = (user)=>{
    return {
        type: actionTypes.LogoutUser,
        payload : null
    }
}

export const GetUser = ()=>{
    return {
        type: actionTypes.GetUser,
        
    }
    
}

export const Register = (userRegistration)=>{
    return { 
        type: actionTypes.Register,
        payload: userRegistration

    }
}

export const setProgress = (progress)=>{
    return { 
        type: actionTypes.setProgress,
        payload: progress

    }
}

export const setGoal = (progress)=>{
    return { 
        type: actionTypes.setGoal,
        payload: progress

    }
}
