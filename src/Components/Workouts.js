import React,{useEffect} from "react";
import { useState } from "react";
import {connect} from "react-redux";
import { Redirect } from 'react-router';
import * as actions from "../redux/Workouts/actions"
import * as helpers from "../helpers/helpers.js"
import * as userActions from "../redux/User/actions"
import WorkoutService from "../LocalStorageServices/WorkoutServices";

const Workouts = (props)=> {
    const [workouts, setWorkouts] = useState([]);
    var user = "anonymouse";
     useEffect(  ()=>{
        const get = async()=>{
            
            await props.getWorkouts("abs");
            // let data = await result;
            // setWorkouts(data);
        }
        helpers.checkUser(props.user,props.getUser)
        console.log(props.user)
    if(helpers.checkIfLoggedIn(props.user)){
       if(!helpers.checkUndefinedOrNull(props.workouts) || !props.workouts.length>0){
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
    return props.workouts.loading? (
        <h3>Loading...</h3>
    )  : props.workouts.error ? (
        <h3>{props.workouts.error}</h3>
    ) :  (
       
        <div>
          {(()=>{
              if(!helpers.checkUndefinedOrNull(props.workouts)|| props.workouts.length>0){
                props.setWorkouts(props.workouts)
              }
          })()}
        <h3>Workouts</h3>
        <p>hey, {user} Here are some workouts that you might like</p>
       
        <pre>{JSON.stringify(props.workouts)}</pre>
        </div>
    );
    
}

const mapStateToProps = state => {
    console.log(state)
    return {
        workouts:state.workouts,
        user: state.user
    }
} 
const mapDispatchToProps =  (dispatch) => {
   
        return {
            getWorkouts:  bodyPart =>
              dispatch( actions.GetWorkout(bodyPart)),
            getUser: ()=>{
                dispatch(userActions.GetUser())
            },
            setWorkouts: workouts => WorkoutService.setTargetWorkout({
                workouts
            })
        }
   
    }
const wrappedWorkouts = connect(mapStateToProps,mapDispatchToProps)(Workouts);
export default wrappedWorkouts;