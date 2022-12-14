import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING ='DELETING';
  const CONFIRM = "CONFIRM";
  const EDIT ="EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  //save function
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(()=>transition(SHOW))
    .catch(error => transition(ERROR_SAVE));
  };

  //delete function
  function deleteID(){
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(()=>transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  };

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

    return (
      <Fragment>
        <article className="appointment" data-testid="appointment">
       <Header time ={props.time} />
       <>
       {/*all kinds of mode condition*/}
         {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
          {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer.name}
              onDelete={() => {transition(CONFIRM)}}
              onEdit={() => {transition(EDIT)}}
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
          {mode === EDIT && <Form onSave= {save} interviewers ={props.interviewers}  onCancel={() => back()}  student={props.interview.student} interviewer={props.interview.interviewer.id}/>}

          {mode === ERROR_SAVE && <Error message={"Could not save appointment."} onClose={() => back()}  />}
          {mode === ERROR_DELETE && <Error message={"Could not delete appointment."} onClose={() => back()}  />} 
       </>

        </article>
      </Fragment>
    );
}