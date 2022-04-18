import React from "react";
import { useState } from "react";
import {connect} from "react-redux";
import { Redirect } from 'react-router';
const NotFound =(props)=> {
    var user = "anonymouse";
    if(props.user!==undefined && props.user!==null && props.user.username!==undefined ){
        user = props.user.username;
    }
    if(user==="anonymouse"){
        return <Redirect to="/Login"/>

    }
    return (<div>
                <h2>Something Went wrong Refresh The page</h2>
                </div>
            )   
}

const mapStateToProps = state => {
    return {
        user:state.user
    }
} 
const wrappedNotFound = connect(mapStateToProps)(NotFound);
export default wrappedNotFound;