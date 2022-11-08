import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index.js";
import { getAppointmentsForDay,getInterview, getInterviewersForDay} from "../helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const setDay = day => setState({ ...state, day });
  
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
   return axios.put(`/api/appointments/${id}`, appointment)
   .then(() => {
      setState (
      {...state,
        appointments})
   })
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
       setState (
       {...state,
         appointments})
    })
    
  };


 
  const appoint = dailyAppointments.map((item) =>{
    const interview = getInterview(state, item.interview);

      return(
      <Appointment
      key = {item.id}
      id = {item.id}
      time ={item.time}
      interview = {interview}
      interviewers={dailyInterviewers}
      bookInterview = {bookInterview}
      cancelInterview = {cancelInterview}
      />
      )
  });


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days:all[0].data, appointments: all[1].data,interviewers: all[2].data}));
    });
  }, []);


  return (
    <main className="layout">
      <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
         
              <DayList
                days={state.days}
                value={state.day}
                onChange={setDay}
               
              />

          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {appoint}
        <Appointment key="last" time="5pm"  />
      </section>
    </main>
  );
}
