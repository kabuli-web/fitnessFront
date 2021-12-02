import React from "react";
import {Link} from 'react-router-dom'

export class Navbar extends React.Component{

    constructor(props){
        super(props)
    }
    render(){
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
                            <li class="nav-item">
                               <Link to="/Login" className="nav-link">Login</Link>
                            </li>
                        </ul>
                    </div>
                    </div>
                </nav>
            
        )
    }
}