import React,{useState} from "react";

import * as helpers from "../helpers/helpers.js"


const PopUp =(props)=> {
    
    // const [popUpOpen,setOpenedPopUp]= useState(true);
    let popUpOpen = props.popUpOpen;
    
    let setOpenedPopUp = ()=>{
        props.setFunction(false)
    }
    console.log(setOpenedPopUp)
    function getData(data){
       
        if(!helpers.checkUndefinedOrNull(data)){
           return "Not Found";
        }else{
            return data;
        }
    }
    if(!helpers.checkUndefinedOrNull(props.recipe)){
        return (<div></div>);
    }
    return (
    <div className={`Container-fluid  d-${(()=>{
        if(popUpOpen){
            return "flex"
        }
        return "none"
    })()} align-items-center `} style={{
        position: "fixed",
        top:"0",
        width:"100%",
        height:"100%",
        backgroundColor:"#00000066"
      

    }}>
      <div className="d-flex flex-column m-1" style={{
          border:"1px solid #dee2e6",
          backgroundColor:"white"
         
    }}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Update Your Info</h5>
          <button onClick={
              setOpenedPopUp
          } type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <div className="Container-fluid">
                      <div className="row mx-auto">
                          <div className="col d-flex flex-column justify-content-center align-items-center" style={{
                              minWidth:'280px'
                          }}>
                              
                                
                                <img style={{
                                    width:"100%"
                                }} src={getData(props?.recipe?.content?.details?.images[0]?.hostedLargeUrl)}  alt="" />
                                <h4>Rating: {getData(props?.recipe?.content?.details?.rating)}</h4>
                                
                                
                              
                          </div>
                          <div className="col">
                          <div className="d-flex flex-column">
                                <h4>Name: {getData(props?.recipe?.content?.details?.name)}</h4>
                                <h4>Preperation Time: {getData(props?.recipe?.content?.details?.totalTime)}</h4>
                                <h4>Number Of Servings: {getData(props?.recipe?.content?.details?.numberOfServings)}</h4>

                                </div>
                          </div>
                      </div>
                      <div className="row mx-auto">

                      </div>
                  </div>
        </div>
        <div className="modal-footer">
          <button onClick={
              setOpenedPopUp
          } type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
  </div> )   
}



export default PopUp;