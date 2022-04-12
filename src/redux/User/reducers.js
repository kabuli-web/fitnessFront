import * as actionTypes from "./type.js"
import UserServices from "../../LocalStorageServices/UserServices.js";
import * as helpers from "../../helpers/helpers.js"
const user= UserServices.getUserData();

function loginUserToApi(user){
    if(user.username ==="kabuli" && user.password === "123"){
        var progress = UserServices.getUserData();
        console.log(progress)
        if(helpers.checkUndefinedOrNull(progress)){
            progress.username = user.username;
            return progress;
        }else{
            return {username:user.username};
        }
        
    }else{
        return {error:"wrong password"};
    }
}



export const userAuth = (state = user, action) =>{ 
            switch (action.type){
                case actionTypes.LoginUser:
                    const result = loginUserToApi(action.payload);
                    if(result.username==null){
                        state = {error: result.error}
                        return state;
                    }
                    else{
                        UserServices.setUserData(result);
                        return result;
                    }
                case actionTypes.LogoutUser:
                    var progress = UserServices.getUserData();
                   
                    var res ={};
                    if(helpers.checkUndefinedOrNull(progress)){
                        progress.username = undefined;
                        res = progress; 
                    }
                    console.log(res)
                    UserServices.setUserData(res)
                    state = res
                    return state;
                case actionTypes.GetUser:
                    return UserServices.getUserData();
                case actionTypes.Register:
                    const RegisterResult = UserServices.RegisterUser(action.payload);
                    if(RegisterResult.succeed){
                        return RegisterResult.user;
                    }
                    state = {
                        error: RegisterResult.error
                    }
                    return state;
                case actionTypes.setProgress:
                    const ProgressResult = UserServices.setUserProgress(action.payload);
                    if(ProgressResult.succeed){
                        return ProgressResult.user;
                    }
                    ProgressResult.user.error = ProgressResult.error;
                    state = ProgressResult.user;
                    return state;
                case actionTypes.setGoal:
                    const GoalResult = UserServices.setUserGoal(action.payload);
                    if(GoalResult.succeed){
                        return GoalResult.user;
                    }
                    GoalResult.user.error = GoalResult.error;
                    state = GoalResult.user;
                    return state;
                default:
                    return user;
            }
        }
        