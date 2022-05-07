import React from "react";
import { useState,useEffect } from "react";
import {connect} from "react-redux";
import { Redirect } from 'react-router';
import * as actions from "../redux/User/actions"
import * as helpers from "../helpers/helpers.js"
import {Link} from 'react-router-dom'

const CreateGoal =(props)=> {
    var user = "anonymouse";
    const [goal,setGoal]= useState("");

    user = props.user?.user;
    useEffect(  ()=>{
        if(!helpers.checkUndefinedOrNull(props.user?.user)){
          props.getUser()
         }
    },[])

    if(props.user?.loading){
        return (
            <div>
                loading...
            </div>
        )
    }
    if(helpers.checkUndefinedOrNull(props.user?.user?.info?.goal)){
        return  <Redirect to="/UserProfile"/>
        //  return (<div><pre>
        //     {JSON.stringify(props.user.user.info)}
        //     </pre></div>)
    }
    
    if(!helpers.checkIfLoggedIn(props.user?.user) && !props.user?.error){
        console.log(props.user);
        return (<div>

            <h3>User Not Logged In</h3>
            <Link to="/Login">Login</Link>
          </div>)
    }
    return (<div>
                <h3>Create Goal</h3>
                <p>hello there {props.user?.user?.username} </p>
                
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
            props.setGoal(goal)
        
        }}>Next</button>
        {/* <button onClick={()=>{
            props.state.currentPage = "CreatePlan";
            props.user.error = undefined;
            props.user.errorExists =false;
            props.history.push("./CreatePlan",{state:{
                currentPage : "CreatePlan",
                user: props.user
            }})
        }
        }>Back</button> */}
                </div>
            )
    }

const mapStateToProps = state => {
    return {
        user:state.user,
        
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