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
        console.log(props);
        return (
            <div>
                
                <UserProfile history={props.history} />
            </div>
        )
    }
    return (
        <div>
             
                <LoginBox history={props.history} />
        </div>
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
