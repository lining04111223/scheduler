import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  function transition (initial, replace = false) {
    if(replace) history.pop();
    setMode(initial);
    history.push(initial);
  };

  function back(){
    if(history.length === 1) return;
      history.pop();
      setMode(history[history.length - 1]);
      }
  

  return { mode, transition, back };
}