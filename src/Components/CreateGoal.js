import React from "react";
import { useState } from "react";
import {connect} from "react-redux";
import { Redirect } from 'react-router';
import * as actions from "../redux/User/actions"
import * as helpers from "../helpers/helpers.js"

const CreateGoal =(props)=> {
    var user = "anonymouse";
    const [goal,setGoal]= useState("");
    const [currentPage,setPage]= useState("");
    helpers.checkUser(props.user,props.getUser);
    user = props.user;
    console.log(props)
    console.log(props.user)
    if(!helpers.checkIfLoggedIn(props.user)){
        console.log(props.user);
        return  <Redirect to="/Login"/>
    }
    if(helpers.checkUndefinedOrNull(user.goal) && props.currentPage!=="creatGoal"){
        props.user.error = undefined;
        props.user.errorExists =false;
        return  (
            <div>
                <pre>{JSON.stringify(user.goal)}</pre>
            </div>
        )
    }
    var message =  helpers.getError(props.user,"State your goal");
    
    return (<div>
                <h3>Create Goal</h3>
                <p>hello there {user.username} </p>
                <pre>{message.error}</pre>
        <div>
        
        <label htmlFor="goal">
            Your Goal
        </label>
        <select name="goal"  onChange={evt => setGoal(evt.target.value)}>
            <option value="losFat">
                Lose fat
            </option>
            <option value="maintain">
                Maintain
            </option>
            <option value="buildMuscle">
                Build Muscle
            </option>
        </select>
       
        </div>
        <button onClick={()=>{
            setPage("");

            props.setGoal({
                value: goal
            })
        
        }}>Next</button>
        <button onClick={()=>{
            props.state.currentPage = "CreatePlan";
            props.user.error = undefined;
            props.user.errorExists =false;
            props.history.push("./CreatePlan",{state:{
                currentPage : "CreatePlan",
                user: props.user
            }})
        }
        }>Back</button>
                </div>
            )
    }

const mapStateToProps = state => {
    return {
        user:state.user,
        currentPage: state.currentPage,
        state:state
    }
} 
const mapDispatchToProps = (dispatch) => {
    return {
        setGoal:goal=>
        dispatch(actions.setGoal(goal)),
        getUser: ()=>{
            dispatch(actions.GetUser())
        }
    }
    }
const wrappedCreateGoal = connect(mapStateToProps,mapDispatchToProps)(CreateGoal);
export default wrappedCreateGoal;