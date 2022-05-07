import React,{useEffect} from "react";
import { useState } from "react";
import {connect} from "react-redux";
import { Redirect } from 'react-router';
import * as actions from "../redux/Workouts/actions"
import * as helpers from "../helpers/helpers.js"
import * as userActions from "../redux/User/actions"
import WorkoutService from "../LocalStorageServices/WorkoutServices";
import {Link} from 'react-router-dom'

const Workouts = (props)=> {
    const [workouts, setWorkouts] = useState([]);
    const [equipment, setEquipment] = useState("Choose an equipment");
    function getUnique(arr, index) {

        const unique = arr
             .map(e => e[index])
      
             // store the keys of the unique objects
             .map((e, i, final) => final.indexOf(e) === i && i)
      
             // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);      
      
         return unique;
      }
    var user = "anonymouse";
    props.history.goBack = ()=>{
        props.history.push("/BodyParts")
    }
    // console.log(props.)
     useEffect(  ()=>{
        const get = async()=>{
            //TODO get bodypart from url path
            await props.getWorkouts(props.match.params.bodyPart);
            // let data = await result;
            // setWorkouts(data);
        }
        helpers.checkUser(props.user,props.getUser)
        console.log(props.user)
    
       if(!helpers.checkUndefinedOrNull(props.workouts?.data) ||!helpers.checkUndefinedOrNull(props.workouts.data[0].equipment) || !props.workouts.length>0){
            get();
       }
    
    },[])
    
    
    if(props.workouts.loading){
        return (
            <div>
                <h3>Loading...</h3>
                
            </div>
        ) 
   }
    if(!helpers.checkIfLoggedIn(props.user?.user) && !props.user?.error){
        console.log(props.user);
        return (<div>

            <h3>User Not Logged In</h3>
            <Link to="/Login">Login</Link>
          </div>)
    }
    
    if(props.user!==undefined && props.user!==null && props.user.username!==undefined ){
        user = props.user.username;
    }
    console.log(props)
    return props.workouts.error ? (
        <h3>{props.workouts.error}</h3>
    ) : helpers.checkUndefinedOrNull(props.workouts?.data)&& helpers.checkUndefinedOrNull(props.workouts.data[0].equipment) && props.workouts.data.length>0 ? (
       
        <div>
          {(()=>{

              if(!helpers.checkUndefinedOrNull(props.workouts) || props.workouts.length>0){
                props.setWorkouts(props.workouts)
              }
          })()}
        <h3>Workouts</h3>
        <p>hey, {user} Here are some workouts that you might like</p>
       <div className="conatainer-fluid w-100">
           <div className="row w-100">
           <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    {equipment}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      {
         getUnique( props.workouts.data,"equipment").map(wrk=>(
            <li  role="button"  className="dropdown-item" onClick={()=>{
                setEquipment(wrk.equipment)
            }}>{wrk.equipment}</li>
         ))



        //   props.workouts.data.filter(element=>element.equipment.includes(equipment==="Choose an equipment"?"":equipment)).map(workout=>(
        //     <li>{workout.equipment}</li>
        //   ))
      }
    
  </ul>
</div>
           </div>
           <div className="row mx-auto align-items-top justify-content-start">
               { props.workouts.data.filter(element=>element.equipment.includes(equipment==="Choose an equipment"?"":equipment)).map(element=>(  
               <div className="col d-flex flex-column align-items-center ">
               {
               
                <div className="card" style={{
                    width:"300px"
                }} >
                       <img className="card-img-top" style={{
                        width:"100%"
                    }} src={`${element.gifUrl}`} alt="" />
                   <div className="card-body">
                  
               <h4 className="card-title">
              
              {element.name}
          
          </h4>
                   <p className="card-text">
                   
                   {element.equipment}
              
               </p>
            
                   </div>
                </div>
             
           }
               </div>
                 ))}
           </div>
       </div>
        </div>
    ):(
        <div>
        <pre>{JSON.stringify(props.bodyparts)}</pre>
        <h4>didnt work</h4>
        </div>
            )
    
}

const mapStateToProps = state => {
    console.log(state)
    return {
        workouts:state.workouts,
        user: state.user
    }
} 
const mapDispatchToProps =  (dispatch) => {
   
        return {
            getWorkouts:  bodyPart =>
              dispatch( actions.GetWorkout(bodyPart)),
            getUser: ()=>{
                dispatch(userActions.GetUser())
            },
            setWorkouts: workouts => WorkoutService.setTargetWorkout({
                workouts
            })
        }
   
    }
const wrappedWorkouts = connect(mapStateToProps,mapDispatchToProps)(Workouts);
export default wrappedWorkouts;