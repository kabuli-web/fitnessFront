
import * as actionTypes  from "./type.js";
import UserServices from "../../LocalStorageServices/UserServices.js";
import * as helpers from "../../helpers/helpers.js"
var axios = require("axios").default;

export const RequestInitiated = ()=>{
    return {
        type: actionTypes.RequestInitiated
    }
}
export const RequestFailed = (error)=>{
    return {
        type: actionTypes.RequestFailed,
        payload:error
    }
}
export const RequestSucceeded = (user)=>{
    return {
        type: actionTypes.RequestSucceeded,
        payload:user
    }
}


async function  LoginUserApi (user){
   
        console.log("User api service ran")
        const options = {
            method: 'POST',
            url: process.env.LOGIN_URL_BACKEND,
            data:{
                email:user.email,
                password:user.password
            }};        
                     try {
                      let response = await axios.request(options)
                      console.log(response);
                      return response.data
                     } catch (error) {
                       console.log(error)
                       throw error;
                     }
}
async function  RegisterUserApi (user){
   
    console.log("User api service ran")
    const options = {
        method: 'POST',
        url: process.env.REGISTER_URL_BACKEND,
        data:{
            email:user.email,
            password:user.password,
            username:user.username
        }};        
                 try {
                  let response = await axios.request(options)
                  console.log(response);
                  return response.data
                 } catch (error) {
                  throw error;
                 }
}
async function  SetUserInfoApi (info){
   
    console.log("User api service ran")
    const options = {
        method: 'POST',
        url: process.env.SET_INFO_URL_BACKEND,
        data:{
            userInfo:info,
            token:UserServices.getUserData().token
        }};        
                 try {
                  let response = await axios.request(options)
                  console.log(response);
                  return response.data
                 } catch (error) {
                  throw error;
                 }
}
async function  SetUserGoalApi (goal){
   
    console.log("User api service ran")
    const options = {
        method: 'POST',
        url: process.env.SET_GOAL_URL_BACKEND,
        data:{
            goal:goal,
            token:UserServices.getUserData().token
        }};        
                 try {
                  let response = await axios.request(options)
                  console.log(response);
                  return response.data
                 } catch (error) {
                  throw error;
                 }
}
// export const LoginUser = (user)=>{
//     return {
//         type: actionTypes.LoginUser,
//         payload : user
//     }
// }
export const LogoutUser = ()=>{
    return {
        type: actionTypes.LogoutUser,
        payload : null
    }
}

export const GetUser = ()=>{
    return {
        type: actionTypes.GetUser,
        
    }
    
}


export const setProgress = (info)=>{
    return   async (dispatch)=>{
        dispatch(RequestInitiated())
        try{
        let response =  await SetUserInfoApi(info);
        let user = UserServices.getUserData();
        user.info = response.userInfo;
        UserServices.setUserData(user);
        dispatch(RequestSucceeded(user))
        }catch(err){
            console.log(err.response)
           dispatch(RequestFailed(err.response.data.error+" "+ err.response.data.message))
        }
       
}
}

export const setGoal = (goal)=>{
    return   async (dispatch)=>{
        dispatch(RequestInitiated())
        try{
        let response =  await SetUserGoalApi(goal);
        let user = UserServices.getUserData();
        user.info.goal = response.goal;
        UserServices.setUserData(user);
        dispatch(RequestSucceeded(user))
        }catch(err){
            console.log(err.response)
           dispatch(RequestFailed(err.response.data.error+" "+ err.response.data.message))
        }
}
}

export const LoginUser =  (user)=>{
    return   async (dispatch)=>{
        dispatch(RequestInitiated())
        
        try{
        let response =  await LoginUserApi(user);
        if(response.user){
            response.user.token = response.token
        }
        UserServices.setUserData(response.user);
        dispatch(RequestSucceeded(response))
        }catch(err){
            console.log(err.response)
           dispatch(RequestFailed(err.response.data.error+" "+ err.response.data.message))


        }
       
}
}
export const Register = (userRegistration)=>{
    return   async (dispatch)=>{
        dispatch(RequestInitiated())
        try{
        let response =  await RegisterUserApi(userRegistration);
        if(response.user){
            response.user.token = response.token
        }
        UserServices.setUserData(response.user);
        dispatch(RequestSucceeded(response))
        }catch(err){
            console.log(err.response)
            dispatch(RequestFailed(err.response.data.error+" "+ err.response.data.message))
        }
    }
}
