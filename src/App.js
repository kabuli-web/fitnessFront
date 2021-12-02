/* eslint-disable no-useless-constructor */

import { Route, Switch } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home'
import React from "react"

const App = (props)=>{
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route path="/Home" history={props.history} component={Home}/>
        <Route path="/Login" history={props.history} component={Login}/>
      </Switch>
    </div>
  );
}

export default App;
