import React,{useEffect,useState} from "react";

import {connect} from "react-redux";
import { Redirect } from 'react-router';
import * as actions from "../redux/Recipes.js/actions"
import * as helpers from "../helpers/helpers.js"
import * as userActions from "../redux/User/actions"
import $ from 'jquery';
import popUp from "./PopUp";


const Recipes = (props)=> {
   
    const [OpenedRecipe,setOpenedRecipe]= useState({});
    const [popUpOpen,setPopUpOpen]= useState(false);
    
    function getData(data){
        console.log(data)
        if(!helpers.checkUndefinedOrNull(data)){
           return "Not Found";
        }else{
            return data;
        }
    }
    var user = "anonymouse";
    props.history.goBack = ()=>{
        props.history.push("/RecipeCategories")
    }
    // console.log(props.)
     useEffect(  ()=>{
        const get = async()=>{
            //TODO get bodypart from url path
            await props.getRecipes(props.match.params.foodType);
            // let data = await result;
            // setWorkouts(data);
        }
        helpers.checkUser(props.user,props.getUser)
        console.log(props.user)
    if(helpers.checkIfLoggedIn(props.user)){
       if(!helpers.checkUndefinedOrNull(props.recipes?.data) || !props.recipes.data.length>0){
            get();
       }
    }
    },[OpenedRecipe])
    helpers.checkUser(props.user,props.getUser)
    
    if(!helpers.checkIfLoggedIn(props.user)){
    console.log(props.user);
    return <Redirect to="/Login"/>
    }
    
    if(props.user!==undefined && props.user!==null && props.user.username!==undefined ){
        user = props.user.username;
    }
    console.log(props)
    return props.recipes.loading? (
        <div>
            <h3>Loading...</h3>
            
        </div>
    )  : props.recipes.error ? (
        <h3>{props.recipes.error}</h3>
    ) : helpers.checkUndefinedOrNull(props.recipes?.data)&& props.recipes.data.length>0 ? (
       
      
           
                <div>
          {(()=>{

            //   if(!helpers.checkUndefinedOrNull(props.recipes) || props.recipes.length>0){
            //     props.setWorkouts(props.workouts)
            //   }
          })()}
        <h3>Recipes</h3>
        <p>hey, {user} Here are some Recipes that you might like</p>
       <div className="conatainer-fluid w-100">
           
           <div className="row mx-auto align-items-top justify-content-start">
               { props.recipes.data.map(element=>(  
               <div className="col d-flex flex-column align-items-center ">
               
                   <div  className="card" style={{
                    width:"300px",
                   
                    objectFit:"cover"
                }}  >
                       <img className="card-img-top" style={{
                       
                        height:"100px",
                        objectFit:"cover"
                    }} src={`${element.display.images[0]}`} alt="" />
                   <div className="card-body">
                  
               <h4 className="card-title">
              
              {element.display.displayName}
          
          </h4>
                   <p className="card-text">
                   
                   {(()=>{
                       if(!helpers.checkUndefinedOrNull(element.content?.description?.text)){
                            return "Not Found";
                       }else{
                        return element.content.description.text;
                       }
                   })()}
              
               </p>
               <button onClick={()=>{
                setOpenedRecipe( element);
                setPopUpOpen( true);
               }} type="button" className="btn btn-primary"  >
   View Details
  </button>
                   </div>
                </div>
            
               </div>
                 ))}
           </div>
       </div>
       {
           popUp({recipe:OpenedRecipe,popUpOpen:popUpOpen,setFunction:()=>{
            setPopUpOpen(false)
           }}) 
      }
        </div>
            
       
    ):(
        <div>
        <pre>{JSON.stringify(props.recipes)}</pre>
        <h4>didnt work</h4>
        </div>
            )
    
}

const mapStateToProps = state => {
    console.log(state)
    return {
        recipes:state.recipes,
        user: state.user
    }
} 
const mapDispatchToProps =  (dispatch) => {
   
        return {
            getRecipes:  FoodType =>
              dispatch( actions.GetRecipes(FoodType)),
            getUser: ()=>{
                dispatch(userActions.GetUser())
            }
           
        }
   
    }
const wrappedRecipes = connect(mapStateToProps,mapDispatchToProps)(Recipes);
export default wrappedRecipes;