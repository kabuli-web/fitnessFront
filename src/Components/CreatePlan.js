import React from "react";
import { useState,useEffect } from "react";
import {connect} from "react-redux";
import { Redirect } from 'react-router';
import * as actions from "../redux/User/actions"
import * as helpers from "../helpers/helpers.js"
import {Link} from 'react-router-dom'

const CreatePlan =(props)=> {
    var user = "anonymouse";

    const [weight,setWeight]= useState(0);
    const [height,setHeight]= useState(0);
    const [age,setAge]= useState(0);
    const [gender,setGender]= useState("");
    const [fat,setBodyfat]= useState("");
    // const [currentPage,setPage]= useState("");
    useEffect(  ()=>{
        if(!helpers.checkUndefinedOrNull(props.user?.user)){
          props.getUser()
         }
         
    },[])
    if(gender ===""){
        setGender("male")
    }
    if(fat ===""){
        setBodyfat("low");
    }
    
    
    
   

    // if(helpers.checkUndefinedOrNull(user.progress) &&  props.currentPage!=="CreatePlan" && !message.errorExists){
    //     props.user.error = undefined;
    //     props.user.errorExists =false;
    //     return  <Redirect to="/CreateGoal"/>
    // }
    
    if(helpers.checkUndefinedOrNull(props.user?.user?.info)){
        return <Redirect to="/CreateGoal"/>
        // return (<div><pre>
        //     {JSON.stringify(props.user.user.info)}
        //     </pre></div>)
       }
    if(props.user?.loading){
        return (
            <div>
                loading...
            </div>
        )
    }
    // if(props.user?.error){
    //     return (
    //         <div>
    //            {props.user?.error}
    //         </div>
    //     )
    // }
    if(!helpers.checkIfLoggedIn(props.user?.user) && !props.user?.error){
        console.log(props.user);
        return (<div>

            <h3>User Not Logged In</h3>
            <Link to="/Login">Login</Link>
          </div>)
    }
    return (<div>
                <h3>Create Plan</h3>
                <p>hello there {props.user?.user?.username} </p>
                <p>{props.user?.error}</p>
        <div>
        <label htmlFor="username">
            Weight
        </label>
        <input name="weight" type="number" onChange={evt => setWeight(evt.target.value)}/>
        <label htmlFor="password">
            Height
        </label>
        <input name="height" type="number" onChange={evt => setHeight(evt.target.value)} />
        <label htmlFor="age">
            Age
        </label>
        <input name="age" type="number" onChange={evt => setAge(evt.target.value)}/>
        <label htmlFor="gender">
            Gender
        </label>
        <select name="gender"  onChange={evt => setGender(evt.target.value)}>
            <option value="male">
                Male
            </option>
            <option value="female">
                female
            </option>
        </select>
        <label htmlFor="bodyfat">
            BodyFat
        </label>
        <select name="bodyfat"  onChange={evt => setBodyfat(evt.target.value)}>
            <option value="low">
                Low
            </option>
            <option value="medium">
                Medium
            </option>
            <option value="high">
                High
            </option>
        </select>
        </div>
        <button onClick={()=>{
            console.log({
                weight:weight,
                height:height,
                age:age,
                gender:gender,
                fat: fat
                })
           
            props.setProgress({
                weight:weight,
                height:height,
                age:age,
                gender:gender,
                fat: fat
                });
        }}>Next</button>
        
                </div>
            )   
}

const mapStateToProps = state => {
    console.log(state.user)
    return {
        user:state.user
    }
} 
const mapDispatchToProps = (dispatch) => {
    return {
        setProgress:progress=>
        dispatch(actions.setProgress(progress)),
        getUser: ()=>{
            dispatch(actions.GetUser())
        }
    }
    }
const wrappedCreatePlan = connect(mapStateToProps,mapDispatchToProps)(CreatePlan);
export default wrappedCreatePlan;