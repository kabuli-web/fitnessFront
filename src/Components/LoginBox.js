import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../redux/User/actions"

import * as helpers from "../helpers/helpers.js"

const LoginBox = (props)=>{

    
    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");
    
    helpers.checkUser(props.user,props.getUser);

    var message =  helpers.getError(props.user,"Login with Your Credentials");
    
   
 return (
    <div>
        <h2>Login</h2>
        <pre>{message.error}</pre>
        <div>
        <label htmlFor="username">
          Username
        </label>
        <input name="username" type="text" onChange={evt => setUsername(evt.target.value)}/>
        <label htmlFor="password">
          Password
        </label>
        <input name="password" type="password" onChange={evt => setPassword(evt.target.value)} />
        </div>
        <button onClick={()=>props.login({
          username,
          password
        })}>Login</button>
        <p>
          If You Dont have an account create one
        </p>
        <button onClick={()=> props.history.push(`/Register`)}>Register</button>
    </div>
 )
}


const mapStateToProps = state =>{
    
    return {
      user: state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
      login:user=>
        dispatch(actions.LoginUser(user)),
      logout: () => {
        dispatch(actions.LogoutUser())},
        getUser: ()=>{
          dispatch(actions.GetUser())
        }
      }
    }
    
const wrappedLoginBox = connect(mapStateToProps,mapDispatchToProps)(LoginBox);
export default wrappedLoginBox;