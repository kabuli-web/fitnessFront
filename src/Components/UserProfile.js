import React from "react"
import {connect} from "react-redux";
import * as actions from "../redux/User/actions"
import * as helpers from "../helpers/helpers.js"
const UserProfile = (props) => {
    var progressNotAvailable = false;
    if(!helpers.checkUndefinedOrNull(props.user.progress)){
        progressNotAvailable = true
    }

    function getProgress(cond){
        if(cond){
            return (
                <div>
                <p>add your plan</p>
                <button onClick={()=>{
                    props.history.push("/CreatePlan")
                }}>Add You Goal and Current Weight  </button>
            </div>
            )
        }
    }
    return (
        <div>
            <h1>
                User Profile
            </h1>
            <h3>{props.user.username}</h3>,
            <pre>{JSON.stringify(props.user)}</pre>
        <button onClick={()=>{
            
            props.logout()
        }}>logout</button>
        {getProgress(progressNotAvailable)}
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
      logout: () => {
          
        dispatch(actions.LogoutUser())
      }
    };
  };
const wrappedUserProfile = connect(mapStateToProps,mapDispatchToProps)(UserProfile);
export default wrappedUserProfile;