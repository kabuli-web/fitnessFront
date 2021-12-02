import React from "react";
import {useSelector, connect } from "react-redux";

import * as types from "../redux/User/type"


const Inspector = (props)=>{
    const userJson = JSON.stringify(props.user)
    
 return (
    <div>
        <h2>Redux</h2>
        <h2>User</h2>
        <pre>{userJson}</pre>
        <button onClick={props.login}>Login</button>
        <button onClick={props.logout}>logout</button>
    </div>
 )
}
const mapStateToProps = state =>{
    
    return {
        user:state.user,
        test:"test"
    }
}

const mapDispatchToProps = dispatch => {
    return {
      login: () => {
        dispatch({ 
            type: types.LoginUser,
             payload:{
                type: "Registered",
                username:"kabuli"
             }});
      },
      logout: () => {
        dispatch({ type: types.LogoutUser });
      }
    };
  };
const wrappedInspector = connect(mapStateToProps,mapDispatchToProps)(Inspector);
export default wrappedInspector;