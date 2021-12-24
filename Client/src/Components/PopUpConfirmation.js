import React from 'react'
import './Popup.css'
import Axios from "axios";

export function Pop_con(props) {
 

  return (props.trigger? (
    <div className="popup">
      <div className="popup-inner">
        {props.children}
        <h3>Flight Number:{props.delete_flight.Flight_Number}</h3>
       
        <div><button className="close-btn1" onClick={props.handel_ok}> OK </button></div>
        <button className="close-btn" onClick={() => props.setTrigger(false)}>Cancel</button>
      </div>
    </div>
  ) : (""));

    
}