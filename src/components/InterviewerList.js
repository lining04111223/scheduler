import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";


export default function InterviewerList(props) {
  const Interviewer = props.interviewers.map((item) =>{
return(
  <InterviewerListItem 
      key={item.id}

      name={item.name} 
      avatar={item.avatar} 
      selected={item.id === props.value}
      setInterviewer={() => props.onChange(item.id)}  
    />
)

  });




  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{Interviewer}</ul>
    </section>
  );



}