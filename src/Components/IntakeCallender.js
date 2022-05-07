/* eslint-disable no-restricted-globals */
import React from 'react'
import FullCalendar, { computeSegDraggable, formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from "../redux/DailyIntake/actions"
import * as helpers from "../helpers/helpers.js"
import * as userActions from "../redux/User/actions"

import popUp from "./PopUp";

 class IntakeCallender extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            weekendsVisible: true,
            currentEvents:  (async ()=>{
              let res = await  this.props.getEntries();
              return res;
            })(),
            popUpOpen: false,
            Intake:{
              // title:"",
              // calories:0
            },
            reload:false,
            
            selectedCell:null,
            
        }
      }
      
    componentDidMount(){
        const get = async()=>{
            //TODO get bodypart from url path
            await this.props.getEntries()
            // let data = await result;
            // setWorkouts(data);
        }
        
        helpers.checkUser(this.props.user?.user,this.props.getUser)
        if(helpers.checkIfLoggedIn(this.props.user?.user)){
            if(!helpers.checkUndefinedOrNull(this.props.Entries?.data) ){
                console.log('data loaded')
                get();
           }
        }

    }
    componentDidUpdate(){
      const get = async()=>{
          //TODO get bodypart from url path
          await this.props.getEntries()
          // let data = await result;
          // setWorkouts(data);
      }
      
      
      
      if(this.state.reload ){
          console.log('data loaded')
          get();
          this.state.reload = false
      }
      

  }
   
  render() {

        
    
      if(!helpers.checkIfLoggedIn(this.props.user?.user) && !this.props.user?.error){
        console.log(this.props.user);
        return (<div>

            <h3>User Not Logged In</h3>
            <Link to="/Login">Login</Link>
          </div>)
      }
    // console.log(this.props)
    console.log(this.state)
    if(this.props.Entries?.loading){
        return (<div><h4>loading...</h4></div>)
    }

    if(helpers.checkUndefinedOrNull(this.props.Entries?.error)){
        return (<div><pre>{JSON.stringify(this.props.Entries.error)}</pre></div>)
    }
    if(!helpers.checkUndefinedOrNull(this.props.Entries?.data)){
      return (<div><pre>{JSON.stringify(this.props)}</pre></div>)
  }
    
   try {
    return (
      <div >
        {/* {
          (()=>{
            console.log("refreshed")
          })()
        }
        {this.renderSidebar()} */}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={helpers.checkUndefinedOrNull(this.props.Entries?.data) && helpers.checkUndefinedOrNull(this.props.Entries?.data[0]?.Calories)  ? this.props.Entries.data: [] } // alternatively, use the `events` setting to fetch from a feed
           
            select={this.handleDateSelect}
            // eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents}
            // eventAdd = {this.SaveEvent}
            // eventRemove = {this.removeEvent}
            // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
          <div className="d-flex flex-column align-items-center justify-content-center">
              <div style={{
                height:"40px"
              }}></div>
              <h2>Total Calories of a selected day {this.state.selectedCell?.startStr}</h2>
              <h4>{
                (()=>{
                  try {
                    if(!this.state.selectedCell){
                      return "please select a day"
                    }
                    console.log(this.props)
                    let count = 0;
                    this.props.Entries.data.filter(e=>e.start.includes(this.state.selectedCell.startStr)).forEach(element => {
                      count = parseInt(count) + parseInt(element.Calories)
                    });
                    return `${count} kCal`;
                  } catch (error) {
                    return "something went wrong"
                  }
                })()
                }</h4>
              <div className="d-flex flex-column">
                
                  {
                    
                    (()=>{
                     try {
                      let list = []
                      this.props.Entries.data.filter(e=>e.start.includes(this.state.selectedCell?.startStr)).forEach(element => {
                        list.push(<h4>{element.title}</h4>)
                        
                      })
                      return list;
                     } catch (error) {
                       return "something went wrong"
                     }
                    })()
                  }
                  
                
              </div>
          </div>
          <div className={`Container-fluid  d-${(()=>{
        if(this.state.popUpOpen){
            return "flex"
        }
        return "none"
    })()} align-items-center `} style={{
        position: "fixed",
        top:"0",
        left:"0",
        width:"100%",
        height:"100%",
        backgroundColor:"#00000066",
        justifyContent:"center",
        zIndex:1000
        

    }}>
      <div className="d-flex flex-column m-1" style={{
          border:"1px solid #dee2e6",
          backgroundColor:"white",
          overflowY:"scroll",
          height:"90%",
          width:"300px"
    }}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Add Intake</h5>
          <button onClick={
              ()=>{
                this.setState({
                  popUpOpen:false
                })
              }
          } type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <div className="d-flex flex-column">
        <div className="mb-3">
            <label for="age-input" className="form-label">Title</label>
            <input onChange={(value)=>{
                      this.state.Intake.title = value.target.value

            }} type="text"  className="form-control" id="age-input" aria-describedby="age"></input>
            <div id="age" className="form-text">Enter The Name of the food.</div>
          </div>
          <div className="mb-3">
            <label for="age-input" className="form-label">Calories</label>
            <input onChange={(value)=>{
                    this.state.Intake.calories = value.target.value

            }} type="number"  className="form-control" id="age-input" aria-describedby="age"></input>
            <div id="age" className="form-text">Enter the ammount of calories in this intake.</div>
          </div>
          
          <div className="d-flex flex-column align-items-center justify-content-center">
              <div style={{
                height:"40px"
              }}></div>
              <h2>Total Calories in this day</h2>
              <h4>{
                (()=>{
                  if(!this.state.selectedCell){
                    return "please select a day"
                  }
                  console.log(this.props)
                  let count = 0;
                  this.props.Entries.data.filter(e=>e.start.includes(this.state.selectedCell.startStr)).forEach(element => {
                    count = parseInt(count) + parseInt(element.Calories)
                  });
                  return `${count} kCal`;
                })()
                }</h4>
              <div className="d-flex flex-column">
                
                  {
                    
                    (()=>{
                     try {
                      let list = []
                      this.props.Entries.data.filter(e=>e.start.includes(this.state.selectedCell?.startStr)).forEach(element => {
                        list.push(<p>{element.title}</p>)
                        
                      })
                      return list;
                     } catch (error) {
                       return "something went wrong"
                     }
                    })()
                  }
                  
                
              </div>
          </div>
        </div>
        </div>
        <div className="modal-footer">
        <button onClick={
              async ()=>{
                
                if(this.state.selectedCell.view.calendar){
                  let callenderApi = this.state.selectedCell.view.calendar
                console.log(this.state.Intake)
                let intake ={
                  id:(()=>{
                    return this.state.currentEvents.length + 1;
                  })(),
                  title:`title: ${this.state.Intake.title} Calories: ${this.state.Intake.calories}`,
                  Calories:this.state.Intake.calories,
                  start: this.state.selectedCell.startStr,
                  end: this.state.selectedCell.endStr,
                  allDay: this.state.selectedCell.allDay
                }
                  callenderApi.addEvent(intake)
                  await this.props.setEntry(intake)
                  
                  this.setState({
                    popUpOpen:false,
                    Intake:{},
                    reload:true
                  })
                }
                           }
          } type="button" className="btn btn-secondary" data-bs-dismiss="modal">Add</button>
          <button onClick={
              ()=>{
                this.setState({
                  popUpOpen:false
                })
              }
          } type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
  </div>
        </div>
      </div>
    )
   } catch (error) {
    //  window.location.reload()
    console.log(error)
   }
  }
  
  // renderSidebar() {
  //   return (
  //     <div className='demo-app-sidebar'>
  //       <div className='demo-app-sidebar-section'>
  //         <h2>Instructions</h2>
  //         <ul>
  //           <li>Select dates and you will be prompted to create a new event</li>
  //           <li>Drag, drop, and resize events</li>
  //           <li>Click an event to delete it</li>
  //         </ul>
  //       </div>
  //       <div className='demo-app-sidebar-section'>
  //         <label>
  //           <input
  //             type='checkbox'
  //             checked={this.state.weekendsVisible}
  //             onChange={this.handleWeekendsToggle}
  //           ></input>
  //           toggle weekends
  //         </label>
  //       </div>
  //       <div className='demo-app-sidebar-section'>
  //         <h2>All Events ({this.state.currentEvents.length})</h2>
  //         <ul>
  //           {this.state.currentEvents.map(renderSidebarEvent)}
  //         </ul>
  //       </div>
  //     </div>
  //   )
  // }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    
    this.setState({
      popUpOpen:true,
      selectedCell:selectInfo
    })
    let calendarApi = selectInfo.view.calendar

    console.log(selectInfo)
    calendarApi.unselect() // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: (()=>{
    //         return String(this.state.currentEvents.length+1)
    //     })(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   })
    // }
  }

  handleEventClick = (clickInfo) => {
    console.log(clickInfo)
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
      this.props.deleteEntry({
        id:clickInfo.event._def.publicId
      })
    }
  }

  handleEvents = (events) => {
    

        this.setState({
        currentEvents: events
        })
  }

}



function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}
const mapStateToProps = state => {
   console.log(state)
    const IntakeEntries =  state.Entries
    return { Entries:IntakeEntries,
        user:state.user };
    //   const allTodos = getTodos(state);
    //   return {
    //     todos:
    //       visibilityFilter === VISIBILITY_FILTERS.ALL
    //         ? allTodos
    //         : visibilityFilter === VISIBILITY_FILTERS.COMPLETED
    //           ? allTodos.filter(todo => todo.completed)
    //           : allTodos.filter(todo => !todo.completed)
    //   };
  };

const mapDispatchToProps =  (dispatch) => {
   
    return {
        getEntries: ()=>{
            dispatch(actions.GetEntries())
        },
        getEntry: (id)=>{
            dispatch(actions.GetEntry(id))
        },
        updateEntry: entry =>{
            dispatch(actions.UpdateEntry(entry))
        },
        deleteEntry: entry =>{
            dispatch(actions.DeleteEntry(entry))
        },
        setEntry: entry =>{
            dispatch(actions.SetEntry(entry))
        },
        getUser: ()=>{
            dispatch(userActions.GetUser())
        }
       
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(IntakeCallender)