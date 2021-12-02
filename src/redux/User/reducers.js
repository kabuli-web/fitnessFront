import * as actionTypes from "./type.js"

const user={
            type: "anonymouse",
            username:"anonymouse"
        }
    

export const userAuth = (state = user, action)=>{
    switch (action.type){
        case actionTypes.LoginUser:
            state = action.payload
            return state;
        case actionTypes.LogoutUser:
            state = user
            return state;
        default:
            return state;
    }
}