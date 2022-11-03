import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {

  //test function
const formatSpots = function(spot){
    if (spot === 0){
      return "no spots remaining";
    }
    if (spot === 1){
    return "1 spot remaining";
    } else {
      return spot +" spots remaining";
    }
};

const dayClass = classNames("day-list__item", 
    {"day-list__item--selected":props.selected}, 
    {"day-list__item--full":props.spots === 0}
);

  return (
    <li 
        onClick={() => props.setDay(props.name)}
        className={dayClass}
        >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}