/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'

import * as actions from "../redux/User/actions"
import * as helpers from "../helpers/helpers.js"
import Redirect from "react-router/Redirect";
const UserProfile = (props) => {
    const [progress,setTProgress]= useState({});
    const [weight,setweight]= useState(null);
    const [height,setheight]= useState(null);
    const [age,setage]= useState(null);
    const [gender,setgender]= useState(null);
    const [fat,setfat]= useState(null);

    let maleSelected =false;
    let femaleSelected =false;
    
   
    const userAgeGenderInfoStyle = {
        minWidth:"130px"
    }
    useEffect(  ()=>{
      if(!helpers.checkUndefinedOrNull(props.user?.user)){
        props.getUser()
       }
  },[])
  
    var progressNotAvailable = false;
    if(props.user?.loading){
      return (<div>
        loading....
      </div>)
    }
    console.log(props)
   
    
    if(!helpers.checkUndefinedOrNull(props.user?.user)){
      console.log("user not found")
      
      return (<div>

        <h3>User Not Logged In</h3>
        <Link to="/Login">Login</Link>
      </div>)
    }
   
    if(!helpers.checkUndefinedOrNull(props.user?.user?.info)){
        progressNotAvailable = true
    }
    console.log(props.user)
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
        }else{
           try {
            return (
              <div className="container-fluid mt-5">
              {(()=>{
                 if(!helpers.checkUndefinedOrNull(age)|| !helpers.checkUndefinedOrNull(height)|| !helpers.checkUndefinedOrNull(weight)|| !helpers.checkUndefinedOrNull(gender)|| !helpers.checkUndefinedOrNull(fat)){
                  setage(props.user.user.info.age)
                  setweight(props.user.user.info.weight)
                  setfat(props.user.user.info.fat)
                  setgender(props.user.user.info.gender)
                  setheight(props.user.user.info.height)
                 }
                 
               })()}
              <div className="row mx-auto">
                  <div className="col d-flex flex-column align-items-center">
                  <div className="card  d-flex align-items-center" style={{
                      width:"300px",
                       height:"250px"
                  }}>
                      <div className="card-body  d-flex flex-column justify-content-between" >
                          <h5 className="card-title d-flex justify-content-center">User Info</h5>
                         <div className="d-flex justify-content-between">
                             <h6 style={userAgeGenderInfoStyle}>User Age:{props.user.user.info.age}</h6>
                             <h6 style={userAgeGenderInfoStyle} >User Gender:{props.user.user.info.gender}</h6>
                         </div>
                         <div className="d-flex justify-content-between">
                              <h6 style={userAgeGenderInfoStyle}>User Height:{props.user.user.info.height}</h6>
                             <h6 style={userAgeGenderInfoStyle}>User Weight:{props.user.user.info.weight}</h6>
                         </div>
                         <div className="d-flex justify-content-center">
                              <h6 style={userAgeGenderInfoStyle}>Body Fat:{props.user.user.info.fat}</h6>
                         </div>
                          
                       <div className="d-flex flex-column justify-content-center">
                       <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit-info">
                              Edit
                              </button>
                              <div className="modal fade" id="edit-info" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title" id="exampleModalLabel">Update Your Info</h5>
                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                    <form>
                                <div className="mb-3">
                                  <label for="weight-input" className="form-label">Your Weight</label>
                                  <input onChange={(value)=>{
                                    
                                    setweight(value.target.value)
                                  }} type="number"  defaultValue={weight} className="form-control" id="weight-input" aria-describedby="weight"></input>
                                  <div id="weight" className="form-text">Enter Your current Weight.</div>
                                </div>
                                <div className="mb-3">
                                  <label for="age-input" className="form-label">Your Age</label>
                                  <input onChange={(value)=>{
                                            setage(value.target.value)

                                  }} type="number" defaultValue={age} className="form-control" id="age-input" aria-describedby="age"></input>
                                  <div id="age" className="form-text">Enter Your current Age.</div>
                                </div>
                                <div className="mb-3">
                                  <label for="height-input" className="form-label">Your Height</label>
                                  <input onChange={(value)=>{
                                            setheight(value.target.value)

                                  }} type="number" defaultValue={height} className="form-control" id="height-input" aria-describedby="height"></input><span>cm</span>
                                  <div id="height" className="form-text">Enter Your current Height.</div>
                                </div>
                                
                                <div className="mb-3">
                                <label for="height-input" className="form-label">Your Gender</label>
                                <select defaultValue={gender} onChange={(value)=>{
                                            setgender(value.target.value)

                                  }} className="form-select" aria-label="Default select example">
                              
                                <option  value="male">Male</option>
                                <option  value="female">Female</option>
                              </select>
                              
                                </div>
                                <div className="mb-3">
                                <label for="height-input" className="form-label">Your Body Fat</label>
                                <select onChange={(value)=>{
                                            setfat(value.target.value)

                                  }} defaultValue={fat} className="form-select" aria-label="Default select example">
                                
                                <option  value="low">Low</option>
                                <option  value="high">High</option>
                                <option  value="medium">Medium</option>
                              </select>
                              
                                </div>
                                
                              </form>
                                    </div>
                                    <div className="modal-footer">
                                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" onClick={()=>{
                                        props.setProgress({
                                          age:age,
                                          height:height,
                                          gender:gender,
                                          weight:weight,
                                          fat:fat
                                        })
                                      }} className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                       </div>
                          
                      </div>
                      </div>
                  </div>
                  <div className="col d-flex flex-column align-items-center">
                  <div className="card" style={{
                      width:"300px"
                      // height:"300px"
                  }}>
                      <div className="card-body d-flex flex-column align-items-center">
                          <h5 style={{textAlign:"center"}} className="card-title">Training Goal</h5>
                          <img style={{width:"150px"}}  src={`./${props.user?.user?.info?.goal}.png`} className="card-img-top" alt="" />
                          <h4 style={{textAlign:"center",textTransform: "uppercase"}} className="card-title">{props.user?.user?.info.goal}</h4>
  
                      </div>
                      </div>
                  </div>
              </div>
          </div>
             )
           } catch (error) {
             return(<div>
               {JSON.stringify(error)}
             </div>)
           }
        }
    }
    return helpers.checkUndefinedOrNull(props.user?.user) ?(
        <div>
            <h1>
                User Profile
            </h1>
            <h3>{props.user?.user.username}</h3>,
           
        <button onClick={()=>{
            
            props.logout()
        }}>logout</button>
        {getProgress(progressNotAvailable)}
        </div>
    ) :(<div><h4>error</h4></div>)
}
const mapStateToProps = state => {
    return {
        user:state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setProgress: (progress)=>{
            dispatch(actions.setProgress(progress))
        },
      logout: () => {
        
        dispatch(actions.LogoutUser())
      },
      getUser: () => {
        
        dispatch(actions.GetUser())
      }
    };
  };
const wrappedUserProfile = connect(mapStateToProps,mapDispatchToProps)(UserProfile);
export default wrappedUserProfile;