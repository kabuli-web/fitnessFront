import * as actionTypes from "./type.js"


export const IntakeEntriesReducer =  (state = {}, action) =>{ 
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
                case actionTypes.GetEntrySucceeded:
                    return {
                        ...state,
                        data:action.payload,
                        entry:action.payload.entry,
                        loading:false
                    }
                case actionTypes.RequestFailed:
                    return {
                        ...state,
                        data:[],
                        loading:false,
                        error:action.payload
                    }
                case actionTypes.AddEntry:
                    return {
                        ...state,
                        data:action.payload,
                        loading:false
                    }
                case actionTypes.UpdateEntry:
                    return {
                        ...state,
                        data:action.payload,
                        loading:false
                    }
                case actionTypes.DeleteEntry:
                    return {
                        ...state,
                        data:action.payload,
                        loading:false
                    }
                default:
                    return state;
                }
             
        }
        