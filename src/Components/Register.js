import React from "react";
import { useState,useEffect } from "react";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../redux/User/actions"
import CreatePlan from "./CreatePlan.js" 
import * as helpers from "../helpers/helpers.js"

const Register =(props)=> {
    
    var message = " Enter your Info"
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    useEffect(  ()=>{
        if(!helpers.checkUndefinedOrNull(props.user?.user)){
          props.getUser()
         }
         
    },[])
    if(helpers.checkUndefinedOrNull(props.user?.user)){
        return <Redirect to="/CreatePlan"/>
       }
    // if(props.user?.loading){
    //     return (
    //         <div>
    //             loading...
    //         </div>
    //     )
    // }
    if(props.user?.error){
        return (
            <div>
               {props.user?.error}
            </div>
        )
    }
   
    
    return (<div>
                <h3>Register</h3>
                <p>We Are Happy To have you </p>
                <p>{props.user?.error}</p>


                <label htmlFor="username">
                    Username
                </label>
                <input name="username" type="text" onLoad={(evt)=>{
                    if(username ===""){
                        setUsername(evt.target.value)
                    }
                }} onChange={evt => setUsername(evt.target.value)}/>
                <label htmlFor="password">
                    password
                </label>
                <input name="password" type="password" onLoad={(evt)=>{
                    if(password ===""){
                        setPassword(evt.target.value)
                    }
                }} onChange={evt => setPassword(evt.target.value)}/>
                <label htmlFor="username">
                    Email
                </label>
                <input name="email" type="email" onLoad={(evt)=>{
                    if(email ===""){
                        setEmail(evt.target.value)
                    }
                }} onChange={evt => setEmail(evt.target.value)}/>
                 <button onClick={()=> props.Register({
                     username:username,
                     password:password,
                     email:email
                 })}>Next</button>
                
                </div>
                
            )
}

const mapStateToProps = state => {
    return {
        user:state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        Register:user=>
            dispatch(actions.Register(user)),
        getUser: ()=>{
            dispatch(actions.GetUser())
        }
      }
    }
const wrappedRegister = connect(mapStateToProps,mapDispatchToProps)(Register);
export default wrappedRegister;