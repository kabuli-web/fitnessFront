import * as actionTypes from "./type.js"


export const WokoutsReducer =  (state = [], action) =>{ 
            switch (action.type){

                case actionTypes.RequestInitiated:
                    return {
                        // ...state,
                        loading:true
                    }
                case actionTypes.RequestSucceeded:
                    return {
                        data:action.payload,
                        loading:false
                    }
                case actionTypes.RequestFailed:
                    return {
                        data:[],
                        loading:false,
                        error:action.payload
                    }
                default:
                    return state;
                }
             
        }
        