
import * as actionTypes  from "./type.js";
import DynamicService from "../../LocalStorageServices/DynamicService"




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
export const RequestSucceeded = (Entries)=>{
    return {
        type: actionTypes.RequestSucceeded,
        payload:Entries
    }
}
export const GetEntrySucceeded = (Entry)=>{
    return {
        type: actionTypes.GetEntrySucceeded,
        payload:Entry
    }
}
export const GetEntries =  ()=>{
    return   async (dispatch)=>{
        dispatch(RequestInitiated())
        let response =  DynamicService.getDynamic("IntakeEntries")
            if(response){
                dispatch(RequestSucceeded(response))
            }else{
                dispatch(RequestFailed("No Entries"))
            }
    }
}


export const SetEntry =  (Entry)=>{
    return   async (dispatch)=>{
        dispatch(RequestInitiated())
        let response =  DynamicService.getDynamic("IntakeEntries")
            if(response){
                let exist = false;
                response.forEach(element => {
                    if(element.id===Entry.id){
                        exist=true;
                    }
                });
                if(!exist){
                    response.push(Entry)
                    DynamicService.setDynamics("IntakeEntries",response)
                }
                dispatch(RequestSucceeded(response))

            }else{
                dispatch(RequestFailed("No Entries"))
            }
    }
}

export const UpdateEntry =  (Entry)=>{
    return   async (dispatch)=>{
        dispatch(RequestInitiated())
        let response =  DynamicService.getDynamic("IntakeEntries")
            if(response){
                let exist = false;
                let key ;
                response.forEach((element,k) => {
                    if(element.id===Entry.id){
                        exist=true;
                        key=k;
                    }
                });
                if(exist){
                    response.remove(key)
                    response.push(Entry)
                    DynamicService.setDynamics("IntakeEntries",response)
                    dispatch(RequestSucceeded(response))
                }else{
                dispatch(RequestFailed("No Entry Found"))
                }
                
            }else{
                dispatch(RequestFailed("No Entries"))
            }
    }
}
export const DeleteEntry =  (Entry)=>{
    return   async (dispatch)=>{
        dispatch(RequestInitiated())
        let response =  DynamicService.getDynamic("IntakeEntries")
            if(response){
                let exist = false;
                let key ;
                response.forEach((element,k) => {
                    console.log(element,k)
                    console.log(Entry)
                    if(element.id.toString()===Entry.id){
                        exist=true;
                        key=k;
                    }
                });
                if(exist){
                    response.splice(key)
                    DynamicService.setDynamics("IntakeEntries",response)
                    dispatch(RequestSucceeded(response))
                }else{
                dispatch(RequestFailed("No Entry Found"))
                }
                
            }else{
                dispatch(RequestFailed("No Entries"))
            }
    }
}

export const GetEntry =  (id)=>{
    return   async (dispatch)=>{
        dispatch(RequestInitiated())
        let response =  DynamicService.getDynamic("IntakeEntries")
            if(response){
                let exist = false;
                let key ;
                response.forEach((element,k) => {
                    if(element.id===id){
                        exist=true;
                        key=k;
                    }
                });
                if(exist){
                    dispatch(GetEntrySucceeded({entry:response[key],Entries:response}))
                }else{
                dispatch(RequestFailed("No Entry Found"))
                }
                
            }else{
                dispatch(RequestFailed("No Entries"))
            }
    }
}