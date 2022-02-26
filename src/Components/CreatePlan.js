import React from "react";
import { useState } from "react";
import {connect} from "react-redux";
import { Redirect } from 'react-router';
import * as actions from "../redux/User/actions"
import * as helpers from "../helpers/helpers.js"

const CreatePlan =(props)=> {
    var user = "anonymouse";

    const [weight,setWeight]= useState("");
    const [height,setHeight]= useState("");
    const [age,setAge]= useState("");
    const [gender,setGender]= useState("");
    const [bodyfat,setBodyfat]= useState("");
    const [currentPage,setPage]= useState("");

    if(gender ===""){
        setGender("male")
    }
    if(bodyfat ===""){
        setBodyfat("low");
    }
    helpers.checkUser(props.user,props.getUser);
    user = props.user;
    
    var message =  helpers.getError(props.user,"State your weight and height so we can find the ideal weight for you body");
    
    if(!helpers.checkIfLoggedIn(props.user)){
        console.log(props.user);
        return  <Redirect to="/Login"/>
    }

    if(helpers.checkUndefinedOrNull(user.progress) &&  props.currentPage!=="CreatePlan" && !message.errorExists){
        props.user.error = undefined;
        props.user.errorExists =false;
        return  <Redirect to="/CreateGoal"/>
    }
    
    return (<div>
                <h3>Create Plan</h3>
                <p>hello there {user.username} </p>
                <pre>{message.error}</pre>
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
            setPage("");
           
            props.setProgress({
                weight,
                height,
                age,
                gender,
                bodyfat
                });
        }}>Next</button>
        
                </div>
            )   
}

const mapStateToProps = state => {
    return {
        user:state.user,
        currentPage: state.currentPage
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