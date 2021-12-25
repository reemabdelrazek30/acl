import React from 'react'
import { useState } from "react";
import Axios from "axios";
import './createFlight.css';
import { useHistory } from 'react-router-dom';

export default function FlightCreationSuccessful()
{ 
    //  const UpdateFlight = (id) => {
//     Axios.put(`http://localhost:3001/updateFlight/${id}`, {
//       Flight_Number: editFormData.Flight_Number,
//       Departure_Date: editFormData.Departure_Date,
//       Departure_Time: editFormData.Departure_Time,
//       Arrival_Date: editFormData.Arrival_Date,
//       Arrival_Time: editFormData.Arrival_Time,
//       Departure_Airport:editFormData.Departure_Airport,
//       Arrival_Airport: editFormData.Arrival_Airport,
//       Number_of_Economy_Seats: editFormData.Number_of_Economy_Seats,
//       Number_of_Business_Seats: editFormData.Number_of_Business_Seats
//     });
//   }
let history = useHistory();
  const homePage = () => {
      history.push('/Hpage');
  }
    return (
      <div className="bannerCreateFlight">
        <div className="containerCreateFlight">
            <h1>The Flight was successfully created!</h1>
            <div>
                <button onClick={() => {homePage()}}>Back to Homepage</button>
            </div>
        </div>
      </div>
);}
