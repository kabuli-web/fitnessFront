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
        if(bodyparts===null || bodyparts===undefined){
            bodyparts = []
       }else{
        
         bodyparts.forEach(element => {
          data.forEach(ele=>{
            if(element.bodypart===ele.bodyPart){
                exists=true;
                return;
                }
          })
        });
        }
        if(exists){
            return {
              succeed: false,
              error: "Target Muscle Already exists"
            }
           }
          if(!exists){
            
            localStorage.setItem('workouts',JSON.stringify(data)) 
          }

    }
    
    return {
        getWorkouts: getWorkoutsByBodyPart,
        setTargetWorkout:setBodyPartWorkout
    }
})();
export default WorkoutService;