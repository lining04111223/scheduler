import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 
  
  //mode transition function
  function transition (initial, replace = false) {
    const copyHistory = [...history];
    if(replace){
    copyHistory.pop();
    setMode(initial);
    copyHistory.push(initial);
    setHistory(copyHistory);
    }else{
    setMode(initial);
    setHistory([...history, initial]);
    }
  };

  //mode back function
  function back(){
    const copyHistory = [...history];
    if(copyHistory.length === 1) return;
      copyHistory.pop();
      setMode(copyHistory[copyHistory.length - 1]);
      setHistory(copyHistory);
  }
  
  return { mode, transition, back };
};