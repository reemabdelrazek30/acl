import React from 'react'
import './Popup.css'
import Axios from "axios";
Axios.defaults.withCredentials = true;
export function Popup(props) {
  const deleteFlight = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (props.trigger? (
    <div className="popup">
      <div className="popup-inner">
        {props.children}
        <h3>Flight Number:{props.delete_flight.Flight_Number}</h3>
        <h3>Departure Date: {props.delete_flight.Departure_Date}  </h3>
        <h3>Departure Time: {props.delete_flight.Departure_Time}  </h3>
        <h3>Departure Airport: {props.delete_flight.Departure_Airport}  </h3>
        <h3>Arrival Date: {props.delete_flight.Arrival_Date}  </h3>
        <h3>Arrival Time: {props.delete_flight.Arrival_Time}  </h3>
        <h3>Arrival Airport: {props.delete_flight.Arrival_Airport}  </h3>
        <h3>Number of Economy seats: {props.delete_flight.Number_of_Economy_seats}  </h3>
        <h3>Number of Business seats: {props.delete_flight.Number_of_Business_seats}  </h3>
        <div><button className="close-btn1" onClick={() => deleteFlight(props.delete_flight._id)}> confirm </button></div>
        <button className="close-btn" onClick={() => props.setTrigger(false)}>cancel</button>
      </div>
    </div>
  ) : (""));

    
}