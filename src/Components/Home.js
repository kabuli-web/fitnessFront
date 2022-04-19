import React from "react";
import { useState } from "react";
import {connect} from "react-redux";
import { Redirect } from 'react-router';
import * as helpers from "../helpers/helpers.js"
import PopUp from "./PopUp.js";
import recipeObject from "./recipeDummyObject.json"
const Home =(props)=> {
    var user = "anonymouse";
    if(props.user!==undefined && props.user!==null && props.user.username!==undefined ){
        user = props.user.username;
    }
    function getData(data){
        console.log(data)
        if(!helpers.checkUndefinedOrNull(data)){
           return "Not Found";
        }else{
            return data;
        }
    }
    if(user==="anonymouse"){
        return <Redirect to="/Login"/>

    }
    return (<div>
                <h3>Home</h3>
                <p>hello there {user}</p>
                <div className="Container-fluid">
                {PopUp({recipe:recipeObject,popUpOpen:true,setFunction:()=>{
           console.log("tipo")
           }}) }
      
  </div>
                </div>
            )   
}

const mapStateToProps = state => {
    return {
        user:state.user
    }
} 
const wrappedHome = connect(mapStateToProps)(Home);
export default wrappedHome;