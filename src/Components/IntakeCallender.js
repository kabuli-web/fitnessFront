/* eslint-disable no-restricted-globals */
import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { connect } from 'react-redux'



import { Redirect } from 'react-router';
import * as actions from "../redux/DailyIntake/actions"
import * as helpers from "../helpers/helpers.js"
import * as userActions from "../redux/User/actions"

import popUp from "./PopUp";

 class IntakeCallender extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            weekendsVisible: false,
            currentEvents: []
        }
      }
    componentDidMount(){
        const get = async()=>{
            //TODO get bodypart from url path
            await this.props.getEntries()
            // let data = await result;
            // setWorkouts(data);
        }

        helpers.checkUser(this.props.user,this.props.getUser)
        if(helpers.checkIfLoggedIn(this.props.user)){
            if(!helpers.checkUndefinedOrNull(this.props.Entries?.data) ){
                
                get();
           }
        }

    }

  render() {

        helpers.checkUser(this.props.user,this.props.getUser)
    
    if(!helpers.checkIfLoggedIn(this.props.user)){
    console.log(this.props.user);
    return <Redirect to="/Login"/>
    }
    console.log(this.props)
    if(this.props.Entries?.loading){
        return (<div><h4>loading...</h4></div>)
    }

    if(helpers.checkUndefinedOrNull(this.props.Entries?.error)){
        return (<div><pre>{JSON.stringify(this.props.Entries.error)}</pre></div>)
    }
    if(!helpers.checkUndefinedOrNull(this.props.Entries?.data)){
        return (<div><pre>{JSON.stringify(this.props)}</pre></div>)
    }
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
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
            initialEvents={this.props.Entries.data} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    )
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: (()=>{
            return String(this.state.currentEvents.length+1)
        })(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    

        this.setState({
        currentEvents: events
        })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
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