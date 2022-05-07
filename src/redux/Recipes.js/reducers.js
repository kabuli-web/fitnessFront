import * as actionTypes from "./type.js"


export const RecipesReducer =  (state = [], action) =>{ 
            switch (action.type){

                case actionTypes.RequestInitiated:
                    
                    return {
                        ...state,
                        loading:true
                    }
                case actionTypes.RequestSucceeded:
                    
                    return {
                        ...state,
                        data:action.payload,
                        loading:false
                    }
                case actionTypes.RequestFailed:
                    return {
                        ...state,
                        data:[],
                        loading:false,
                        error:action.payload
                    }
                default:
                    return state;
                }
             
        }
        