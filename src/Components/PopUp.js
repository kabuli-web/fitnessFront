import React,{useState} from "react";

import * as helpers from "../helpers/helpers.js"


const PopUp =(props)=> {
    
    // const [popUpOpen,setOpenedPopUp]= useState(true);
    let popUpOpen = props.popUpOpen;
    
    let setOpenedPopUp = ()=>{
        props.setFunction(false)
    }
    console.log(props.recipe)
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
          <h5 className="modal-title" id="exampleModalLabel">Recipe Details</h5>
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
                                <p>Kcal: {getData(props?.recipe?.content?.nutrition?.nutritionEstimates.filter(element=> element.attribute==='FAT_KCAL')[0]?.value)}</p>
                                <p>Name: {getData(props?.recipe?.content?.details?.name)}</p>
                                <p>Preperation Time: {getData(props?.recipe?.content?.details?.totalTime)}</p>
                                <p>Number Of Servings: {getData(props?.recipe?.content?.details?.numberOfServings)}</p>

                                </div>
                          </div>
                      </div>
                      <div className="row mx-auto">
                      <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Nutrition</button>
                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Ingredients</button>
                    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Steps {getData(props?.recipe?.content?.preparationStepCount)}</button>
                </div>
                </nav>
                    <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div className="d-flex flex-row flex-wrap  w-100">
                                            {(()=>{
                                                try {
                                                    return getData(props?.recipe?.content?.nutrition?.nutritionEstimates).map(element=>{
                                                        
                                                        return (<div className="d-flex px-3" style={{
                                                            minWidth:"150px"
                                                        }}>
                                                            <p>{element.attribute}:{element.value}</p>
                                                        </div>)
                                                    })
                                                } catch (error) {
                                                    return "Not_found"
                                                }
                                            })()}
                                        </div>
                    </div>
                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div className="d-flex flex-row flex-wrap  w-100">
                                            {(()=>{
                                                try {
                                                    return getData(props?.recipe?.content?.ingredientLines).map(element=>{
                                                        
                                                        return (<div className="d-flex p-1" style={{
                                                            
                                                        }}>
                                                            <div class="card " style={{width:"140px"}}>
                        <div className="card-body">
                            <h5 className="card-title">{getData(element.ingredient)}</h5>
                            <p className="card-text">{getData(element.wholeLine)}</p>
                    
                        </div>
                        </div>
                                                        </div>)
                                                    })
                                                } catch (error) {
                                                    return "Not_found"
                                                }
                                            })()}
                                        </div>
                    </div>
                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">

                    <div className="d-flex flex-row flex-wrap  w-100">
                                            {(()=>{
                                                try {
                                                    return getData(props?.recipe?.content?.preparationSteps).map((element,key)=>{
                                                        
                                                        return (<div className="d-flex px-3" style={{
                                                            minWidth:"200px"
                                                        }}>
                                                            
                                                            <p>{key+1}. {element}</p>
                                                        </div>)
                                                    })
                                                } catch (error) {
                                                    return "Not_found"
                                                }
                                            })()}
                                        </div>
                    </div>
                    </div>
                           
                      </div>
                      <div className="row mx-auto justify-content-center align-items-center text-align-center">
                          <h6 style={{
                              textAlign:"center"
                          }}>Video Tutorial</h6>
                         
                         <video  style={{maxWidth:"600px",minWidth:"auto"}} src={`${getData(props?.recipe?.content?.videos?.originalVideoUrl)}`} width="600" height="300" controls="controls" autoplay="true" />
                          
                        
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