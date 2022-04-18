


export const getError =  (user,def)=> {
    if(user!==undefined && user!==null && user.error!==undefined ){
        if(user.error!==def){
            user.errorExists = true;
        }
        return user
       }
        
       
       if(user===undefined || user===null){
           user = {}
       }
        
        user.errorExists = false;
        user.error = def
        return user;
       
}
export const checkUser = (user,getUserFunction)=>{
    if(user===undefined || user===null ){
        getUserFunction()
      }
     
}

export const checkUndefinedOrNull = (item,child = "")=>{
    if(item===null || item ===undefined || item==='' || child === undefined || item==={}){
        return false;
    }
    return true;
}

export const checkIfLoggedIn =(user)=>{
    if(user !==null && user.username!==undefined && user.username!=="anonymouse"){
        return true
    }
    return false;
}