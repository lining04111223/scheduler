import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.student||"");
  const [interviewer, setInterviewer] = useState(props.interviewer|| null);
  const [error, setError] = useState("");

  const reset=() => {
    setName("");
    setInterviewer(null);
  };

  const cancel=() => {
    reset();
    props.onCancel();
  };
   
  const save=() =>{
  validate();
  };

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    };
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    };
    setError("");
    props.onSave(name, interviewer);
  };


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList 
            interviewers={props.interviewers}
            onChange={setInterviewer}
            value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  );
};