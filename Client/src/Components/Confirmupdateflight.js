import React from 'react'
import './Popup.css'
import Axios from "axios";
import { useHistory } from 'react-router-dom';



export function Confirmupdateflight(props) {
    let history = useHistory();
    const update_departure_flight = () => {
        Axios.post("http://localhost:3001/updateFlight",{
            userid:props.allinfo.user_id,
            NewflightID: props.allinfo.id,
            flightID:props.allinfo.olddepflight_id,
            flightNumber: props.allinfo.flightnumber,
            flight_Departure_Date: props.allinfo.depdate,
            flight_Arrival_Date: props.allinfo.arrivaldate,
            flight_Departure_Time: props.allinfo.deptime,
            flight_Arrival_Time: props.allinfo.arrivaltime,
            flight_Departure_Airport: props.allinfo.depairport,
            flight_Arrival_Airport: props.allinfo.arrivalairport,
            Class: props.allinfo.classT,
            Price: props.allinfo.flightprice,
            Seats: props.seats,
            number: props.allinfo.confirmation_number,
            flightType:"departF",
        });
        //props.setTrigger(false); 
        redirect();  
    
      };

    const redirect=() =>{
        history.push({
            pathname: '/ViewFlights',
            
        });
    }  
    

  return (props.trigger)? (
    <div className="popup">
      <div className="popup-inner">
        {props.children}
        <h2>Are you sure you want to update the departure flight  with the following flight:</h2>
        <h3> flight id: {props.allinfo.id}</h3>
        <h3> flight number: {props.allinfo.flightnumber}</h3>
        <h3>confirmation number: {props.allinfo.confirmation_number}</h3>
        <h3> user id: {props.allinfo.user_id}</h3>
        <h3> classT: {props.allinfo.classT}</h3>
        <h3>dep date : {props.allinfo.depdate}</h3>
        <h3>dep time : {props.allinfo.deptime}</h3>
        <h3>dep airport : {props.allinfo.depairport}</h3>
        <h3>arrival date : {props.allinfo.arrivaldate}</h3>
        <h3>arrival time : {props.allinfo.arrivaltime}</h3>
        <h3>arrival airport : {props.allinfo.arrivalairport}</h3>
        <h3>flight price : {props.allinfo.flightprice}</h3>
        <h3>seats : {props.seats}</h3>
        <h3>old flight id : {props.allinfo.olddepflight_id}</h3>
         
        <button className="close-btn1" onClick={() => update_departure_flight()  }> Confirm </button>
        <br/> <br/>    
           <button className="close-btn" onClick={() => redirect()}>Go back to reserved flight</button> 
        <br/> <br/> 
          <button className="close-btn" onClick={() => props.setTrigger(false)}>cancel</button>
      </div>
    </div>
  ) : ("");

    
}