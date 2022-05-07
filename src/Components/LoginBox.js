import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../redux/User/actions"

import * as helpers from "../helpers/helpers.js"
import { Redirect } from "react-router";

const LoginBox = (props)=>{

    
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    
    helpers.checkUser(props.user,props.getUser);

    // var message =  helpers.getError(props.user,"Login with Your Credentials");
    
  //   useEffect(  ()=>{
  //     const get = async()=>{
  //         //TODO get bodypart from url path
  //         await props.getRecipes(props.match.params.foodType);
  //         // let data = await result;
  //         // setWorkouts(data);
  //     }
  //     helpers.checkUser(props.user,props.getUser)
  //     console.log(props.user)
  //     if(helpers.checkIfLoggedIn(props.user)){
  //       if(!helpers.checkUndefinedOrNull(props.recipes?.data) || !props.recipes.data.length>0){
  //             get();
  //       }
  // }
  // },[])
   if(props.user?.loading){
     return (
       <div>
         loading....
       </div>
     )
   }
  //  if(props.user?.error){
  //   return (
  //     <div>
  //      {props.user?.error}
  //     </div>
  //   )
  // }
  console.log(props.user)
   if(helpers.checkUndefinedOrNull(props.user?.user)){
   
     return <Redirect to="/UserProfile" />
   }
 return (
    <div>
        <h2>Login</h2>
        <pre>Enter Your Credentials</pre>
        <p>{props.user?.error}</p>
        <div>
        <label htmlFor="email">
          Email
        </label>
        <input name="email" type="email" onLoad={(evt)=>{
                    if(email === ""){
                        setEmail(evt.target.value)
                    }
                }} onChange={evt => setEmail(evt.target.value)}/>
        <label htmlFor="password">
          Password
        </label>
        <input name="password" type="password" onLoad={(evt)=>{
                    if(password ===""){
                        setPassword(evt.target.value)
                    }
                }} onChange={evt => setPassword(evt.target.value)} />
        </div>
        <button onClick={()=>props.login({
          email,
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