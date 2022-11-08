import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING ='DELETING';
  const CONFIRM = "CONFIRM";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(()=>transition(SHOW));
  };

  function deleteID(){
    transition(DELETING);
  props.cancelInterview(props.id)
    .then(()=>transition(EMPTY));
  };


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
    return (
        <Fragment>
        <article className="appointment">
       <Header time ={props.time} />
       
       <>
         {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
          {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer.name}
              onDelete={() => {transition(CONFIRM)}}
            />
          )}
          {mode === CONFIRM &&   
            <Confirm
              message={"Delete the appointment?"} 
              onConfirm={deleteID}
              onCancel={() => back()}
              /> }
          {mode === SAVING && <Status message={SAVING}/>}
          {mode === DELETING && <Status message={DELETING}/>}
          {mode === CREATE && <Form onSave= {save} interviewers ={props.interviewers}  onCancel={() => back()} />}
          
       </>


        </article>
        </Fragment>
    );



}