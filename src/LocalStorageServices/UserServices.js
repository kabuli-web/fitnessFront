import * as helpers from "../helpers/helpers.js"

var UserServices = (function() {
    var userData = {};
  
    var getUserData = function() {
      
        userData = JSON.parse(localStorage.getItem("userData"));
        
      return userData;
    };
  
    var setUserData = function(userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
      userData = JSON.parse(localStorage.getItem("userData"));
    };
    
    var setUserRegistration = function(user) {
      var users = JSON.parse(localStorage.getItem("Users"));
      let exists =false;
      if(users===null){
       users = []
     }else{
       console.log(users)
       users.forEach(element => {
        if(element.email===user.email){
          exists=true;
        }
    });
     }
     if(exists){
      return {
        succeed: false,
        error: "user Already exists"
      }
     }
      users.push(user);
      localStorage.setItem('Users',JSON.stringify(users))
      user.password = undefined
      setUserData(user);
      return {
        succeed:true,
        user:user
      }
    }

    var setUserProgress = function(progress) {
      let user = getUserData();
      
      if(!helpers.checkUndefinedOrNull(progress) || !helpers.checkUndefinedOrNull(progress.weight) || !helpers.checkUndefinedOrNull(progress.height) ){
        return {
          succeed:false,
          user:user,
          error:"please Enter You Weight And Height in the correct form"
        }
      }
      if(user.progress===null || user.progress===undefined ){
        user.progress = progress;
        
      }
      localStorage.setItem("userData",JSON.stringify(user));
      return {
        succeed:true,
        user:user,
      }
     
    }
    
    var setUserGoal = function(goal) {
      let user = getUserData();
      
      if(!helpers.checkUndefinedOrNull(goal) || !helpers.checkUndefinedOrNull(goal.value) ){
        return {
          succeed:false,
          user:user,
          error:"Pleaser Choose A goal"
        }
      }
      if(user.goal===null || user.goal===undefined ){
        user.goal = goal;
      }
      localStorage.setItem("userData",JSON.stringify(user));
      return {
        succeed:true,
        user:user
      }
     
    }
    
    return {
      getUserData: getUserData,
      setUserData: setUserData,
      RegisterUser:setUserRegistration,
      setUserProgress:setUserProgress,
      setUserGoal:setUserGoal

    }
  })();
  
  export default UserServices;