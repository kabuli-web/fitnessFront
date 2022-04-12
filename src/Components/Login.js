import React from "react";
import LoginBox from "./LoginBox.js"
import { useState } from "react";
import { connect } from "react-redux";
import UserProfile from "./UserProfile.js" 
import * as actions from "../redux/User/actions"
import * as helpers from "../helpers/helpers.js"

const Login = (props)=>{

    helpers.checkUser(props.user,props.getUser)
          
    if(helpers.checkIfLoggedIn(props.user)){
        
        return (
            
                
                <UserProfile history={props.history} />
            
        )
    }
    return (
       
             
             <LoginBox history={props.history} />
        
    );
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: ()=>{
            dispatch(actions.GetUser())
        }
    }
}
const wrappedLogin = connect(mapStateToProps,mapDispatchToProps)(Login)
export default wrappedLogin;
