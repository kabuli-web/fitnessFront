


import React,{useEffect} from "react";
import { useState } from "react";
import {connect} from "react-redux";
import { Redirect } from 'react-router';
import * as actions from "../redux/Recipes.js/actions"
import * as helpers from "../helpers/helpers.js"
import * as userActions from "../redux/User/actions"
import RecipesService from "../LocalStorageServices/RecipesService.js";
import {Link} from 'react-router-dom'

const FoodTypes = (props)=> {
    
    var user = "anonymouse";
   
     useEffect(  ()=>{
        const get = async()=>{
            
            await props.getFoodTypes();
            // let data = await result;
            // setWorkouts(data);
        }
        if(!helpers.checkUndefinedOrNull(props.user?.user)){
            props.getUser()
           }
        console.log(props.user?.user)
    
       if(!helpers.checkUndefinedOrNull(props.foodTypes?.data?.data) || props.foodTypes?.data?.data.length >15|| !props.foodTypes?.data?.data.length>0){
        console.log("i ran ")
        try {
            get();
           } catch (error) {
               console.log(error)
           }
       }
    
    },[])
    
    
   if(props.foodTypes?.loading){
       return <h4>loading....</h4>
   }
    if(!helpers.checkUndefinedOrNull(props.user?.user)){
        console.log("user not found")
        
        return (<div>
  
          <h3>User Not Logged In</h3>
          <Link to="/Login">Login</Link>
        </div>)
      }
    
    if(props.user?.user!==undefined && props.user?.user!==null && props.user?.user.username!==undefined ){
        user = props.user?.user.username;
    }
    console.log(props)
    return  props.foodTypes.error ? (
        <h3>{JSON.stringify(props.foodTypes.error)}</h3>
    ) :  helpers.checkUndefinedOrNull(props.foodTypes?.data?.data) && props.foodTypes?.data?.data.length<15? (
       
        <div>
          {(()=>{
              //TODO Remove this extra set local storage in other files like workouts too
              if(!helpers.checkUndefinedOrNull(props.foodTypes)|| props.foodTypes.length>0){
                // props.setBodyParts(props.bodyparts.data)
              }
          })()}
        <h3>Recipe Categories</h3>
        <p>hey, {props.user?.user?.username} Here are some Recipe Categories You can Choose From that you might like</p>
          
        
       <div className="container-fluid">
      <div className="row mx-auto align-items-start">
      {
          props.foodTypes.data.data.map(element=>(
            
               <div className="col d-flex justify-content-center "  >
               <Link style={{
                   textDecoration: 'none',
                   color:"black",textAlign:"center",
                   margin:"5px 0px"
               }} to={`/Recipes/${element.display.tag}`}> 
               <div className="card" >
  <img src={`${element.display.categoryImage}`} style={{objectFit: "cover", width: "200px",height:'100px'}} class="card-img-top" alt="..."></img>
  <div className="card-body">
    <h5 className="card-title">{element.display.displayName}</h5>
    
  </div>
</div>
               
               </Link>
               </div>
           
        ))
            
          }
      </div>
       </div>
        </div>
    ):(
<div>
<pre>{JSON.stringify(props.foodTypes)}</pre>
<h4>didnt work</h4>
</div>
    )
    //TODO Make body parts clickable and send to workouts page 
}

const mapStateToProps = state => {
    console.log(state)
    return {
        //here we are changing the name of the state property because we didnt create a seperate
        //reducer action to make things easier
        foodTypes:state.recipes,
        user: state.user
    }
} 
const mapDispatchToProps =  (dispatch) => {
   
        return {
            getFoodTypes:  () =>
              dispatch( actions.GetFoodTypes()),
            getUser: ()=>{
                dispatch(userActions.GetUser())
            },
            setBodyParts: (data) => RecipesService.setDynamics(
           "bodyParts",data,false
            )
        }
   
    }
const wrappedFoodTypes = connect(mapStateToProps,mapDispatchToProps)(FoodTypes);
export default wrappedFoodTypes;