import * as helpers from "../helpers/helpers.js"


let WorkoutService = (()=>{

    var getWorkoutsByBodyPart = function (bodyPart){
        console.log("local storage service ran")
        let workouts = JSON.parse(localStorage.getItem("workouts"));
        if(workouts===null){
            return null;
        }
        let result = [];
        if(!(bodyPart===null || bodyPart===undefined) && workouts!==null ){
            return workouts;
        }
        workouts.forEach(element=>{
            if(element.bodyPart===bodyPart){
                result.push(element)
            }
        })
        if(result.length===0){
            return null
        }
        return result;
    }

    var setBodyPartWorkout = function(data){
        let bodyparts = getDynamic("workouts");
        let exists =false;
        if(bodyparts===null || bodyparts===undefined || bodyparts.length===0  ){
            bodyparts = []
       }else{
        
         bodyparts.forEach(element => {
          
            if(element.bodypart===data[0].bodyPart){
                exists=true;
                return;
                }
         
        });
        }
       
        //TODO Continue Here
        if(exists){
            return {
              succeed: false,
              error: "Target Muscle Already exists"
            }
           }
          if(!exists){
              //TODO CODE DOESNT WORK
             setDynamics("workouts",data,true)
          }

    }
    var getDynamic = function(dynamicName,){
        console.log("local storage service ran")
        let dynamics = JSON.parse(localStorage.getItem(dynamicName));
        if(dynamics===null){
            return null;
        }
        return dynamics;
    }
    var setDynamics = function(dynamicName,data,append){
        console.log("dynamic set ran" )
        let dynamics = JSON.parse(localStorage.getItem(dynamicName));
        if(!helpers.checkUndefinedOrNull(dynamics)){
            dynamics = []
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
        getWorkouts: getWorkoutsByBodyPart,
        setTargetWorkout:setBodyPartWorkout,
        getDynamic:getDynamic,
        setDynamics:setDynamics
    }
})();
export default WorkoutService;