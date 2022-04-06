


import React,{useEffect} from "react";
import { useState } from "react";
import {connect} from "react-redux";
import { Redirect } from 'react-router';
import * as actions from "../redux/Workouts/actions"
import * as helpers from "../helpers/helpers.js"
import * as userActions from "../redux/User/actions"
import WorkoutService from "../LocalStorageServices/WorkoutServices";

const BodyParts = (props)=> {
    const [bodyparts, setBodyPart] = useState([]);
    var user = "anonymouse";
     useEffect(  ()=>{
        const get = async()=>{
            
            await props.getBodyParts();
            // let data = await result;
            // setWorkouts(data);
        }
        helpers.checkUser(props.user,props.getUser)
        console.log(props.user)
    if(helpers.checkIfLoggedIn(props.user)){
       if(!helpers.checkUndefinedOrNull(props.bodyparts) || !props.bodyparts.length>0){
            get();
       }
    }
    },[])
    
    helpers.checkUser(props.user,props.getUser)
   
    if(!helpers.checkIfLoggedIn(props.user)){
    console.log(props.user);
    return <Redirect to="/Login"/>
    }
    
    if(props.user!==undefined && props.user!==null && props.user.username!==undefined ){
        user = props.user.username;
    }
    console.log(props)
    return props.bodyparts.loading? (
        <div>
            <h3>Loading...</h3>
            
        </div>
    )  : props.bodyparts.error ? (
        <h3>{JSON.stringify(props.bodyparts.error)}</h3>
    ) :  (
       
        <div>
          {(()=>{
              //TODO Remove this extra set local storage in other files like workouts too
              if(!helpers.checkUndefinedOrNull(props.bodyparts)|| props.bodyparts.length>0){
                // props.setBodyParts(props.bodyparts.data)
              }
          })()}
        <h3>Body Parts</h3>
        <p>hey, {user} Here are some BodyParts You can Choose From that you might like</p>
          
        <pre>{JSON.stringify(props.bodyparts)}</pre>
        </div>
    );
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