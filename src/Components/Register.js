import React from "react";
import { useState } from "react";
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
    helpers.checkUser(props.user,props.getUser);
    
   
    if(props.user !==null && props.user.username!==undefined && props.user.username!=="anonymouse"){
        console.log(props.user);
        return <Redirect to="/CreatePlan"/>
    }
    var message =  helpers.getError(props.user,"Enter your Info");
    
    // if(props.user!==undefined && props.user!==null && props.user.username!==undefined ){
    //     return <Redirect to="/Home"/>;
    // }
    
    return (<div>
                <h3>Register</h3>
                <p>We Are Happy To have you </p>
                <p>{message.error} </p>

                <label htmlFor="username">
                    Username
                </label>
                <input name="username" type="text" onChange={evt => setUsername(evt.target.value)}/>
                <label htmlFor="password">
                    password
                </label>
                <input name="password" type="password" onChange={evt => setPassword(evt.target.value)}/>
                <label htmlFor="username">
                    Email
                </label>
                <input name="email" type="email" onChange={evt => setEmail(evt.target.value)}/>
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