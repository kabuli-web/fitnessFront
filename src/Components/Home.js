import React from "react";
import { useState } from "react";
import {connect} from "react-redux";
import { Redirect } from 'react-router';
const Home =(props)=> {
    var user = "anonymouse";
    if(props.user!==undefined && props.user!==null && props.user.username!==undefined ){
        user = props.user.username;
    }
    if(user==="anonymouse"){
        return <Redirect to="/Login"/>

    }
    return (<div>
                <h3>Home</h3>
                <p>hello there {user}</p>
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