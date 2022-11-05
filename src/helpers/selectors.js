export function getAppointmentsForDay(state, day) {
  const filteredAppoint = state.days.filter(days => days.name === day);
  console.log(filteredAppoint);

  if (state.days.length === 0 || filteredAppoint[0] === undefined) {
    return [];
  }
  return filteredAppoint[0].appointments.map(ID => state.appointments[ID] )
}

