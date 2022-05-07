


import React,{useEffect} from "react";
import { useState } from "react";
import {connect} from "react-redux";
import { Redirect } from 'react-router';
import * as actions from "../redux/Workouts/actions"
import * as helpers from "../helpers/helpers.js"
import * as userActions from "../redux/User/actions"
import WorkoutService from "../LocalStorageServices/WorkoutServices";
import {Link} from 'react-router-dom'

const BodyParts = (props)=> {
    
    var user = "anonymouse";
   
     useEffect(  ()=>{
        const get = async()=>{
            
            await props.getBodyParts();
            // let data = await result;
            // setWorkouts(data);
        }
        helpers.checkUser(props.user?.user,props.getUser)
        console.log(props.user?.user)
    
        
       if(!helpers.checkUndefinedOrNull(props.bodyparts?.data) || props.bodyparts?.data.length >15 || helpers.checkUndefinedOrNull(props.bodyparts?.data[0]?.Calories) || !props.bodyparts?.data.length>0){
        console.log("i ran ")   
        try {
            get();
           } catch (error) {
               console.log(error)
           }
       }
    
    },[])
    
    
   if(props.bodyparts.loading){
        return (
            <div>
                <h3>Loading...</h3>
                
            </div>
        ) 
   }
    if(!helpers.checkIfLoggedIn(props.user?.user) && !props.user?.error){
        console.log(props.user);
        return (<div>

            <h3>User Not Logged In</h3>
            <Link to="/Login">Login</Link>
          </div>)
    }
    
    if(props.user?.user!==undefined && props.user?.user!==null && props.user?.user.username!==undefined ){
        user = props.user?.user.username;
    }
    console.log(props)
    return   props.bodyparts.error ? (
        <h3>{JSON.stringify(props.bodyparts.error)}</h3>
    ) : helpers.checkUndefinedOrNull(props.bodyparts?.data) && props.bodyparts?.data.length<15 && !helpers.checkUndefinedOrNull(props.bodyparts?.data[0]?.Calories)? (
       
        <div>
          {(()=>{
              
              //TODO Remove this extra set local storage in other files like workouts too
              if(!helpers.checkUndefinedOrNull(props.bodyparts)|| props.bodyparts.length>0){
                // props.setBodyParts(props.bodyparts.data)
              }
          })()}
        <h3>Body Parts</h3>
        <p>hey, {user} Here are some BodyParts You can Choose From that you might like</p>
          
        
       <div className="container-fluid">
      <div className="row mx-auto align-items-start">
      {
          props.bodyparts.data.map(element=>(
            
               <div className="col d-flex justify-content-center "  >
               <Link style={{
                   textDecoration: 'none',
                   color:"black",textAlign:"center"
               }} to={`/Workouts/${element}`}> <div className="d-flex flex-column justify-content-center" style={{
                   width:"200px",
                   height:"200px"
                   }}>
                <h4>{element}</h4>
                   </div></Link>
               </div>
           
        ))
            
          }
      </div>
       </div>
        </div>
    ):(
<div>
<pre>{JSON.stringify(props.bodyparts)}</pre>
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
        bodyparts:state.workouts,
        user: state.user
    }
} 
const mapDispatchToProps =  (dispatch) => {
        return {
            getBodyParts:  () =>
              dispatch( actions.GetBodyParts()),
            getUser: ()=>{
                dispatch(userActions.GetUser())
            },
            setBodyParts: (data) => WorkoutService.setDynamics(
           "bodyParts",data,false
            )
        }
   
    }
const wrappedBodyParts = connect(mapStateToProps,mapDispatchToProps)(BodyParts);
export default wrappedBodyParts;