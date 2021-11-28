import React from "react";
import {Link} from 'react-router-dom'

export class Navbar extends React.Component{

    constructor(props){
        super(props)
    }
    render(){
        return (
            
                <nav className="navbar navbar-expand-md navbar-light bg-light" >
                     <div class="container">
                    <a href="#" class="navbar-brand text-primary fw-bold">Fitness App</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul class="navbar-nav align-items-center ms-auto mb-2 mb-lg-0">
                            <li class="nav-item">
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