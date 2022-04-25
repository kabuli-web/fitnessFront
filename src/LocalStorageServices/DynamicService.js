import * as helpers from "../helpers/helpers.js"


let DynamicService = (()=>{
    var getDynamic = function(dynamicName){
        console.log("local storage service ran")
        let dynamics = JSON.parse(localStorage.getItem(dynamicName));
        if(dynamics===null || dynamics===undefined || dynamics.length=== 0){
            if(dynamics===null){
                localStorage.setItem(dynamicName,JSON.stringify([]))
            }
            return [];
        }
        return dynamics;
    }
    var setDynamics = function(dynamicName,data,append){
        console.log("dynamic set ran" )
        let dynamics = JSON.parse(localStorage.getItem(dynamicName));
        if(!helpers.checkUndefinedOrNull(dynamics)){
            dynamics=[]
        }
        if(append){
            data.forEach(element=>{
                dynamics.push(element);
            })
          localStorage.setItem(dynamicName,JSON.stringify(dynamics)) 
       
        }else{
          localStorage.setItem(dynamicName,JSON.stringify(data)) 
        }
    }
    return {
        getDynamic:getDynamic,
        setDynamics:setDynamics
    }
})();
export default DynamicService;