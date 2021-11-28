
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
        payload : user
    }
}