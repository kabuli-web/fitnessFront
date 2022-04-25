import * as actionTypes from "./type.js"


export const IntakeEntriesReducer =  (state = [], action) =>{ 
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
                case actionTypes.GetEntrySucceeded:
                    return {
                        data:action.payload.Entries,
                        entry:action.payload.entry,
                        loading:false
                    }
                case actionTypes.RequestFailed:
                    return {
                        data:[],
                        loading:false,
                        error:action.payload
                    }
                case actionTypes.AddEntry:
                    return {
                        data:action.payload,
                        loading:false
                    }
                case actionTypes.UpdateEntry:
                    return {
                        data:action.payload,
                        loading:false
                    }
                case actionTypes.DeleteEntry:
                    return {
                        data:action.payload,
                        loading:false
                    }
                default:
                    return state;
                }
             
        }
        