import React from "react";
import {Link} from 'react-router-dom'
import * as actions from "../redux/User/actions"
import * as helpers from "../helpers/helpers.js"
import {connect} from "react-redux";

const Navbar = props =>{
    var user = "anonymouse";
    let loginLinkTitle = ""
    helpers.checkUser(props.user,props.getUser);
    user = props.user;
    if(!helpers.checkIfLoggedIn(props.user)){
        console.log(props.user);
        loginLinkTitle = "Login"
    }else{
        loginLinkTitle = "My Profile"
    }
        console.log(user)
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
                               <Link to="/Workouts" className="nav-link">Workouts</Link>
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