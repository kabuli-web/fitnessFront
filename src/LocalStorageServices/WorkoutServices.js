import * as helpers from "../helpers/helpers.js"


let WorkoutService = (()=>{

    var getWorkoutsByBodyPart = function (bodyPart){
        let workouts = JSON.parse(localStorage.getItem("workouts"));
        if(workouts===null){
            return null;
        }
        let result = [];
        if((bodyPart===null || bodyPart===undefined) && workouts!==null ){
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
        let bodyparts = JSON.parse(localStorage.getItem("workouts"));
        let exists =false;
        if(bodyparts===null){
            bodyparts = []
       }else{
         console.log(bodyparts)
         bodyparts.forEach(element => {
          if(element.bodypart===data.bodyPart){
            exists=true;
            }
        });
        }
        if(exists){
            return {
              succeed: false,
              error: "Target Muscle Already exists"
            }
           }
           bodyparts.push({
               workouts: data.workouts 
           })
           localStorage.setItem('workouts',JSON.stringify(bodyparts))         
    }
    
    return {
        getWorkouts: getWorkoutsByBodyPart,
        setTargetWorkout:setBodyPartWorkout
    }
})();
export default WorkoutService;