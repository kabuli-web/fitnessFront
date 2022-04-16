import * as helpers from "../helpers/helpers.js"


let RecipesService = (()=>{

    var getRecipesByFoodType = function (foodType){
        console.log("local storage service ran")
        let recipes = JSON.parse(localStorage.getItem("recipes"));
        if(recipes===null){
            return null;
        }
        let result = [];
        if(!(foodType===null || foodType===undefined) && recipes!==null ){
            return recipes;
        }
        recipes.forEach(element=>{
            if(element["tracking-id"].includes(foodType)){
                result.push(element)
            }
        })
        if(result.length===0){
            return null
        }
        return result;
    }

    var setFoodTypeRecipes = function(data){
        let bodyparts = getDynamic("recipes");
        let exists =false;
        if(bodyparts===null || bodyparts===undefined || bodyparts.length===0  ){
            bodyparts = []
       }else{
        
         bodyparts.forEach(element => {
          
            if(element["tracking-id"].includes(data[0]["tracking-id"])){
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
             setDynamics("recipes",data,true)
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
        getRecipes: getRecipesByFoodType,
        setTargetFoodTypeRecipes:setFoodTypeRecipes,
        getDynamic:getDynamic,
        setDynamics:setDynamics
    }
})();
export default RecipesService;