import * as actionTypes  from "./type.js";

import RecipesServices from "../../LocalStorageServices/RecipesService.js";
import RecipesApi from "../../Api/RecipesApiCaller.js"


import * as helpers from "../../helpers/helpers.js"

let getRecipesFetchOrLocal =  async (foodType)=>{
    let recipes = RecipesServices.getRecipes(foodType);
    // console.log("The condition is "+ helpers.checkUndefinedOrNull(workouts));
    // console.log(`These are the workouts returned from the local storage ${workouts}`)
    
    let apiRecipes = []
    recipes?.forEach(element => {
        if(element["tracking-id"].includes(foodType)){
            apiRecipes.push(element)
        }
    });
    console.log(apiRecipes)
    if(!helpers.checkUndefinedOrNull(apiRecipes) || apiRecipes.length===0){
        console.log("api service ran")
      try {
        let response =  await RecipesApi.fetchRecipesByFoodType(foodType);
        console.log( response)
        if(response.length>0){
            // RecipesServices.setTargetFoodTypeRecipes(response)
            return {data:response};
        }
      } catch (error) {
          return {error}
      }
       
        
      return {error:"error"};
    }
    console.log(recipes.length)
    if(apiRecipes.length>0){
        console.log("local storage service ran")
        return {data:apiRecipes};
    }else{
        return {data:recipes};
        
    }
    
}
let getDynamicFetchOrLocal =  async (dynamicName,dynamicApiFunction)=>{
    let dynamics = RecipesServices.getDynamic(dynamicName);
    // console.log("The condition is "+ helpers.checkUndefinedOrNull(workouts));
    // console.log(`These are the workouts returned from the local storage ${workouts}`)
    
    
    console.log(dynamics)
    if(!helpers.checkUndefinedOrNull(dynamics) || dynamics.length===0){
        console.log("api service ran")
      try {
          //TODO Change Api Calling to Dynamic when needed
        let apiDynamics =  await dynamicApiFunction();
        console.log( apiDynamics)
        if(apiDynamics.length>0){
            RecipesServices.setDynamics(dynamicName,apiDynamics,false)
            return {data:apiDynamics};
        }
      } catch (error) {
          console.log(error)
          return {error}
      }
       
        
      return {error:"Something went wrong with the api"};
    }
    console.log(dynamics.length)
    
    return {data:dynamics};
        
    
}

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
export const RequestSucceeded = (workouts)=>{
    return {
        type: actionTypes.RequestSucceeded,
        payload:workouts
    }
}
export const GetRecipes =  (FoodType)=>{
    return   async (dispatch)=>{
        dispatch(RequestInitiated())
        let response =  await getRecipesFetchOrLocal(FoodType);
            if(response!==null && response.data!==null && response.data!==undefined && response.data.length>0){
                dispatch(RequestSucceeded(response.data))
            }else{
                dispatch(RequestFailed(response.error))
            }
    }
}

export const GetFoodTypes =  ()=>{
    return   async (dispatch)=>{
        dispatch(RequestInitiated())
        let response =  await getDynamicFetchOrLocal("foodTypes",RecipesApi.fetchFoodTypes);
        console.log(response)   
        if(helpers.checkUndefinedOrNull(response,"data") && response.data){
                
                dispatch(RequestSucceeded(response))
                
            }else{
                dispatch(RequestFailed(response))
            }  
    }
}

