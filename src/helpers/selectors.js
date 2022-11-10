export function getAppointmentsForDay(state, day) {
  const filteredAppoint = state.days.filter(days => days.name === day);

  if (state.days.length === 0 || filteredAppoint[0] === undefined) {
    return [];
  }
  return filteredAppoint[0].appointments.map(ID => state.appointments[ID] )
};

export function getInterview(state, interview){
  if (interview) {
     const interviewerObj = { 
       student: interview.student,
       interviewer: {
        id: interview.interviewer,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar
      }
    }
    return interviewerObj;
  }
  return null
};

export function getInterviewersForDay(state, day) {
  const filteredInterviewers = state.days.filter(days => days.name === day);

  if (state.days.length === 0 || filteredInterviewers[0] === undefined) {
    return [];
  }
  return filteredInterviewers[0].interviewers.map(ID => state.interviewers[ID] )
};