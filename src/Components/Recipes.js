import React,{useEffect,useState} from "react";
import {Link} from 'react-router-dom'

import {connect} from "react-redux";
import { Redirect } from 'react-router';
import * as actions from "../redux/Recipes.js/actions"
import * as helpers from "../helpers/helpers.js"
import * as userActions from "../redux/User/actions"

import popUp from "./PopUp";


const Recipes = (props)=> {
   
    const [OpenedRecipe,setOpenedRecipe]= useState({});
    const [popUpOpen,setPopUpOpen]= useState(false);
    
    function getData(data){
        console.log(data)
        if(!helpers.checkUndefinedOrNull(data)){
           return "Not Found";
        }else{
            return data;
        }
    }
    var user = "anonymouse";
    props.history.goBack = ()=>{
        props.history.push("/RecipeCategories")
    }
    // console.log(props.)
     useEffect(  ()=>{
        const get = async()=>{
            //TODO get bodypart from url path
            await props.getRecipes(props.match.params.foodType);
            // let data = await result;
            // setWorkouts(data);
        }
        if(!helpers.checkUndefinedOrNull(props.user?.user)){
            props.getUser()
           }
    
       if(!helpers.checkUndefinedOrNull(props.recipes?.data) || !props.recipes?.data?.length>0){
            get();
       }
    
    },[])
    
   if(props.recipes.loading) {
       return (
        <div>
            <h3>Loading...</h3>
            
        </div>
    )
   }
    if(!helpers.checkUndefinedOrNull(props.user?.user)){
        console.log("user not found")
        
        return (<div>
  
          <h3>User Not Logged In</h3>
          <Link to="/Login">Login</Link>
        </div>)
      }
    
    if(props.user?.user!==undefined && props.user?.user!==null && props.user?.user.username!==undefined ){
        user = props.user?.user.username;
    }
    console.log(props)
    return    props.recipes.error ? (
        <h3>Oops No Recipes found</h3>
    ) : helpers.checkUndefinedOrNull(props.recipes?.data) && props.recipes.data?.length>0 ? (
       
      
           
                <div>
          {(()=>{
            console.log("these are the test "+props.recipes)
            //   if(!helpers.checkUndefinedOrNull(props.recipes) || props.recipes.length>0){
            //     props.setWorkouts(props.workouts)
            //   }
          })()}
        <h3>Recipes</h3>
        <p>hey, {user} Here are some Recipes that you might like</p>
       <div className="conatainer-fluid w-100">
           
           <div className="row mx-auto align-items-top justify-content-start">
               { props.recipes.data.map(element=>(  
               <div className="col d-flex flex-column align-items-center ">
               
                   <div  className="card" style={{
                    width:"300px",
                   
                    objectFit:"cover"
                }}  >
                       <img className="card-img-top" style={{
                       
                        height:"300px",
                        objectFit:"cover"
                    }} src={`${element.display.images[0]}`} alt="" />
                   <div className="card-body">
                  
               <h4 className="card-title">
              
              {element.display.displayName}
          
          </h4>
                   <p style={{
                       height:"100px",
                       overflow: "clip"
                   }} className="card-text">
                   
                   {(()=>{
                       if(!helpers.checkUndefinedOrNull(element.content?.description?.text)){
                            return "Not Found";
                       }else{
                        return element.content.description.text;
                       }
                   })()}
              
               </p>
               <button onClick={()=>{
                setOpenedRecipe( element);
                setPopUpOpen( true);
               }} type="button" className="btn btn-primary"  >
                    View Details
                    </button>
                   </div>
                </div>
               </div>
                 ))}
           </div>
       </div>
       {
           popUp({recipe:OpenedRecipe,popUpOpen:popUpOpen,setFunction:()=>{
            setPopUpOpen(false)
           }}) 
      }
        </div>
            
       
    ):(
        <div>
        {/* <pre>{JSON.stringify(props.recipes)}</pre> */}
        <h4>didnt work</h4>
        </div>
            )
    
}

const mapStateToProps = state => {
    console.log(state)
    return {
        recipes:state.recipes,
        user: state.user
    }
} 
const mapDispatchToProps =  (dispatch) => {
   
        return {
            getRecipes:  FoodType =>
              dispatch( actions.GetRecipes(FoodType)),
            getUser: ()=>{
                dispatch(userActions.GetUser())
            }
           
        }
   
    }
const wrappedRecipes = connect(mapStateToProps,mapDispatchToProps)(Recipes);
export default wrappedRecipes;