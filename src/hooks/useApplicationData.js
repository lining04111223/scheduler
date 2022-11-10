import { useState, useEffect } from "react";
import axios from "axios";

//custom hook
export default function useApplicationData(){

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  const setDay = day => setState({ ...state, day });

  //upadate sports of everyday function
  function updateSpots(state, appointments){
    const newdays =state.days.map((day) => { 
      if (day.name === state.day) {
        const newday ={
            ...day, 
            spots: day.appointments 
            .map((id) => (appointments[id])) 
            .filter(({ interview }) => { 
              return !interview; 
            }).length 
        };
        return newday;
      }
      return day; 
    });
    
  return newdays;
  };

  //bookinterview function
  function bookInterview(id, interview) {
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
    const days =updateSpots(state, appointments);
      setState (
      {...state,
        appointments,
        days
      })
  })
  };

  //cancel an existing interview function
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
      const days =updateSpots(state, appointments);
      setState (
      {...state,
        appointments,
        days
        })
    })
  };


  //get data from api
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days:all[0].data, appointments: all[1].data,interviewers: all[2].data}));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview};
};