import * as actionTypes from "./type.js"

const initialState = {
        user: {
            type: "anonymouse",
            username:"anonymouse"
        }
    }

export const userAuth = (state = initialState, action)=>{
    switch (action.type){
        case actionTypes.LoginUser:
            state.user = action.payload.user
            return state;
        case actionTypes.LogoutUser:
            state.user = initialState.user
            return state;
        default:
            return state;
    }
}