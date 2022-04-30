/* eslint-disable no-useless-constructor */

import { Route, Switch } from 'react-router-dom';
import Navbar  from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home'
import Register from './Components/Register'
import CreatePlan from './Components/CreatePlan'
import CreateGoal from './Components/CreateGoal'
import Workouts from './Components/Workouts'
import BodyParts from "./Components/BodyParts"
import FoodTypes from "./Components/FoodTypes"
import Recipes from "./Components/Recipes"
import IntakeCallender from "./Components/IntakeCallender"




import React from "react"

const App = (props)=>{
  return (
    <div>
      <Navbar history={props.history} />
      <Switch>
        <Route path="/Home" history={props.history} component={Home}/>
        <Route path="/Login" history={props.history} component={Login}/>
        <Route path="/Register" history={props.history} component={Register}/>
        <Route path="/CreatePlan" history={props.history} component={CreatePlan}/>
        <Route path="/CreateGoal" history={props.history} component={CreateGoal}/>
        <Route path="/Workouts/:bodyPart" history={props.history} component={Workouts}/>
        <Route path="/BodyParts" history={props.history} component={BodyParts}/>
        <Route path="/RecipeCategories" history={props.history} component={FoodTypes}/>
        <Route path="/Recipes/:foodType" history={props.history} component={Recipes}/>
        <Route path="/IntakeCallender">
      <IntakeCallender />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
