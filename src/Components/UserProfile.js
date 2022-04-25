/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from "react";
import {connect} from "react-redux";
import * as actions from "../redux/User/actions"
import * as helpers from "../helpers/helpers.js"
const UserProfile = (props) => {
    const [progress,setTProgress]= useState({});
    const [weight,setweight]= useState(null);
    const [height,setheight]= useState(null);
    const [age,setage]= useState(null);
    const [gender,setgender]= useState(null);
    const [bodyfat,setbodyfat]= useState(null);

    let maleSelected =false;
    let femaleSelected =false;
    let lowSelected =false;
    let highSelected =false;
    let normalSelected =false;
     function setProgress(progress) {

        console.log(progress);
        setTProgress(progress)
       }
    
    const userAgeGenderInfoStyle = {
        minWidth:"130px"
    }
    var progressNotAvailable = false;
    if(!helpers.checkUndefinedOrNull(props.user.progress)){
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
                 if(!helpers.checkUndefinedOrNull(age)|| !helpers.checkUndefinedOrNull(height)|| !helpers.checkUndefinedOrNull(weight)|| !helpers.checkUndefinedOrNull(gender)|| !helpers.checkUndefinedOrNull(bodyfat)){
                  setage(props.user.progress.age)
                  setweight(props.user.progress.weight)
                  setbodyfat(props.user.progress.bodyfat)
                  setgender(props.user.progress.gender)
                  setheight(props.user.progress.height)
                 }
                 if(bodyfat==="low"){
                    lowSelected = true;
                 }
                 if(bodyfat==="high"){
                  highSelected = true;
                  }
                  if(bodyfat==="normal"){
                    normalSelected = true;
                }
                  if(gender==="male"){
                    maleSelected = true;
                }
                if(gender==="female"){
                  femaleSelected = true;
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
                             <h6 style={userAgeGenderInfoStyle}>User Age:{props.user.progress.age}</h6>
                             <h6 style={userAgeGenderInfoStyle} >User Gender:{props.user.progress.gender}</h6>
                         </div>
                         <div className="d-flex justify-content-between">
                              <h6 style={userAgeGenderInfoStyle}>User Height:{props.user.progress.height}</h6>
                             <h6 style={userAgeGenderInfoStyle}>User Weight:{props.user.progress.weight}</h6>
                         </div>
                         <div className="d-flex justify-content-center">
                              <h6 style={userAgeGenderInfoStyle}>Body Fat:{props.user.progress.bodyfat}</h6>
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
                                  }} type="number" value={weight} className="form-control" id="weight-input" aria-describedby="weight"></input>
                                  <div id="weight" className="form-text">Enter Your current Weight.</div>
                                </div>
                                <div className="mb-3">
                                  <label for="age-input" className="form-label">Your Age</label>
                                  <input onChange={(value)=>{
                                            setage(value.target.value)

                                  }} type="number" value={age} className="form-control" id="age-input" aria-describedby="age"></input>
                                  <div id="age" className="form-text">Enter Your current Age.</div>
                                </div>
                                <div className="mb-3">
                                  <label for="height-input" className="form-label">Your Height</label>
                                  <input onChange={(value)=>{
                                            setheight(value.target.value)

                                  }} type="number" value={height} className="form-control" id="height-input" aria-describedby="height"></input><span>cm</span>
                                  <div id="height" className="form-text">Enter Your current Height.</div>
                                </div>
                                
                                <div className="mb-3">
                                <label for="height-input" className="form-label">Your Gender</label>
                                <select onChange={(value)=>{
                                            setgender(value.target.value)

                                  }} className="form-select" aria-label="Default select example">
                              
                                <option selected={`${maleSelected}`}  value="male">Male</option>
                                <option selected={`${femaleSelected}`} value="female">Female</option>
                              </select>
                              
                                </div>
                                <div className="mb-3">
                                <label for="height-input" className="form-label">Your Body Fat</label>
                                <select onChange={(value)=>{
                                            setbodyfat(value.target.value)

                                  }} className="form-select" aria-label="Default select example">
                                
                                <option selected={`${lowSelected}`} value="Low">Low</option>
                                <option selected={`${highSelected}`} value="High">High</option>
                                <option selected={`${normalSelected}`} value="Normal">Normal</option>
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
                                          bodyfat:bodyfat
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
                          <img style={{width:"150px"}}  src={`./${props.user.goal.value}.png`} className="card-img-top" alt="" />
                          <h4 style={{textAlign:"center",textTransform: "uppercase"}} className="card-title">{props.user.goal.value}</h4>
  
                      </div>
                      </div>
                  </div>
              </div>
          </div>
             )
           } catch (error) {
             return(<div>
               {error}
             </div>)
           }
        }
    }
    return helpers.checkUndefinedOrNull(props.user) ?(
        <div>
            <h1>
                User Profile
            </h1>
            <h3>{props.user.username}</h3>,
           
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
      }
    };
  };
const wrappedUserProfile = connect(mapStateToProps,mapDispatchToProps)(UserProfile);
export default wrappedUserProfile;