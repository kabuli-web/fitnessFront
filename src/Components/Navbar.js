import React,{useEffect} from "react";
import {Link} from 'react-router-dom'
import * as actions from "../redux/User/actions"
import * as helpers from "../helpers/helpers.js"
import {connect} from "react-redux";

const Navbar = props =>{
    var user = "anonymouse";
    let loginLinkTitle = ""
    // helpers.checkUser(props.user?.user,props.getUser);
    // user = props.user?.user;
    // console.log(props)
    useEffect(  ()=>{
        if(!helpers.checkUndefinedOrNull(props.user?.user)){
          props.getUser()
         }
    },[])
    if(!helpers.checkIfLoggedIn(props?.user?.user)){
        
        loginLinkTitle = "Login"
    }else{
        loginLinkTitle = "My Profile"
    }
       
    return (
                <nav className="navbar navbar-expand-md navbar-light bg-light" >
                     <div className="container">
                    <Link className="navbar-brand text-primary  fw-bold" to="/Home">Fitness App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav align-items-center ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                               <Link to="/Home" className="nav-link">Home</Link>
                            </li>
                            
                            <li className="nav-item">
                               <Link to="/BodyParts" className="nav-link">Browse Workouts</Link>
                            </li>

                            <li className="nav-item">
                               <Link to="/RecipeCategories" className="nav-link">Browse Recipes</Link>
                            </li>
                            <li class="nav-item">
                               <Link  to="/IntakeCallender" className="nav-link">Daily Intake</Link>
                            </li>
                            <li class="nav-item">
                               <Link to="/Login" className="nav-link">{loginLinkTitle}</Link>
                            </li>
                            
                        </ul>
                    </div>
                    </div>
                </nav>
            
        )
        }

        const mapStateToProps = state => {
            return {
                user:state.user,
                
            }
        } 
        const mapDispatchToProps = (dispatch) => {
            return {
                setProgress:progress=>
                dispatch(actions.setProgress(progress)),
                getUser: ()=>{
                    dispatch(actions.GetUser())
                }
            }
            }

const wrappedNavbar = connect(mapStateToProps,mapDispatchToProps)(Navbar);
export default wrappedNavbar;