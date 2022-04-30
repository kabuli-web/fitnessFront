import React,{useState} from "react";

import * as helpers from "../helpers/helpers.js"


const DailyIntakePopUp =(props)=> {
    
    // const [popUpOpen,setOpenedPopUp]= useState(true);
    let popUpOpen = props.popUpOpen;
    
    let closeOpenedPopUp = ()=>{
        props.setFunction(false)
    }
    console.log(props.recipe)
    
    
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
        backgroundColor:"#00000066",
        justifyContent:"center",
        
        

    }}>
      <div className="d-flex flex-column m-1" style={{
          border:"1px solid #dee2e6",
          backgroundColor:"white",
          overflowY:"scroll",
          height:"90%"
         
    }}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Add Intake</h5>
          <button onClick={
              closeOpenedPopUp(false)
          } type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <div className="d-flex flex-column">
          hello
        </div>
        </div>
        <div className="modal-footer">
          <button onClick={
              closeOpenedPopUp
          } type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
  </div> )   
}



export default DailyIntakePopUp;