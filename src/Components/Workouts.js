import React from "react";
import { useState } from "react";
import {connect} from "react-redux";
import { Redirect } from 'react-router';
import * as actions from "../redux/Workouts/actions"
import * as helpers from "../helpers/helpers.js"
import * as userActions from "../redux/User/actions"

const Workouts =(props)=> {
    var user = "anonymouse";
    helpers.checkUser(props.user,props.getUser)
          
    if(!helpers.checkIfLoggedIn(props.user)){
        console.log(props.user);
        return <Redirect to="/Login"/>
    }
    if(props.user!==undefined && props.user!==null && props.user.username!==undefined ){
        user = props.user.username;
    }
    
    if(props.workouts===null || props.workouts===undefined  ){
        props.workouts = props.getWorkouts("abs");
    }

    if(props.workouts===null || props.workouts===undefined  ){
        return (<div>
            <h3>No Workouts</h3>
            </div>
        )   
    }
    return (<div>
                <h3>Workouts</h3>
                <p>hey, {user} Here are some workouts that you might like</p>
                <pre>{JSON.stringify(props.workouts)}</pre>
                </div>
            )   
}

const mapStateToProps = state => {
    return {
        workouts:state.workouts,
        user: state.user
    }
} 
const mapDispatchToProps = (dispatch) => {
    return {
        getWorkouts:bodyPart=>
        dispatch(actions.GetWorkout(bodyPart)),
        getUser: ()=>{
            dispatch(userActions.GetUser())
        }
    }
    }
const wrappedWorkouts = connect(mapStateToProps,mapDispatchToProps)(Workouts);
export default wrappedWorkouts;