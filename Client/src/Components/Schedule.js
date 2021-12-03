import React, { useState, useEffect } from 'react'
import './Flight.css'
import Axios from "axios";
// import { ReadableRow } from './ReadableRow';
// import { EditFlightRow } from './EditFlightRow';
// import { Fragment } from 'react';
// import  {Popup}  from './Popup.js';
// import { Search } from './search_frontend';

export default function View_schedule() {
  const [allflights, setAllflights] = useState([]);
  
  useEffect(() => { Axios.get("http://localhost:3001/schedule").then((Response) => setAllflights(Response.data)) }, []);

  return (
    <div className="app-container">
      {/* <div> <h1> Flights</h1></div> */}
      <table>
        <thead>
       
         
        </thead>
        <tbody>
          {allflights.map(flight => (
            <div className="row" key={flight._id}>
            <p className="left-txt"> <b>1:{flight.Flight_Number} </b> </p>
            <p className="left-txt"> <b>2:{flight.Departure_Date} </b> </p>
            <p className="left-txt"> <b>3:{flight.Departure_Time} </b> </p>
            <p className="left-txt"> <b>4:{flight.Arrival_Date} </b> </p>
            <p className="left-txt"> <b>5:{flight.Arrival_Time} </b> </p>
            <p className="left-txt"> <b>6:{flight.Arrival_Airport} </b> </p>
            <p className="left-txt"> <b>7:{flight.Number_of_Economy_seats} </b> </p>
            <p className="left-txt"> <b>8:{flight.Number_of_Business_seats} </b> </p>
          
           
            </div>
            ))}
        </tbody>
      </table>
     
         </div>

  )

}

