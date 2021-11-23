import React, { useState, useEffect } from 'react'
import './Flight.css'
import Axios from "axios";
import { ReadableRow } from './ReadableRow';
import { EditFlightRow } from './EditFlightRow';
import { Fragment } from 'react';
import { Popup } from './Popup.js';
import { Search } from './search_frontend';

export default function Flight_schedule() {
  const [allflights, setAllflights] = useState([]);
  const [EditedFlightId, setEditingFlightId] = useState(null);
  const [toBeDeletedFlight, setDeletedFlight] = useState([]);
  const [popupbutton, setpopupbutton] = useState(false);
  const [searchActiveTerms, activateSearchTerms] =
    useState(
      {
        Flight_Number: "",
        Departure_Date: "",
        Departure_Time: "",
        Arrival_Date: "",
        Arrival_Time: "",
        Departure_Airport: "",
        Arrival_Airport: "",
      })
  const handleSearchTermsChange = (event, searchFormData) => {
    event.preventDefault();
    const formValues =
    {
      Flight_Number: searchFormData.flightNumber,
      Departure_Date: searchFormData.departureDate,
      Departure_Time: searchFormData.departureTime,
      Arrival_Date: searchFormData.arrivalDate,
      Arrival_Time: searchFormData.arrivalTime,
      Departure_Airport: searchFormData.departureAirport,
      Arrival_Airport: searchFormData.arrivalAirport,
    }
    activateSearchTerms(formValues);
    console.log(searchActiveTerms.Flight_Number);
    //console.log("searching");
  }
  const [editFormData, setEditFormData] = useState(
    {
      Flight_Number: "",
      Departure_Date: "",
      Departure_Time: "",
      Arrival_Date: "",
      Arrival_Time: "",
      Departure_Airport: "",
      Arrival_Airport: "",
      Number_of_Economy_Seats: "",
      Number_of_Business_Seats: ""
    })
  const handleEditClick = (event, val) => {
    event.preventDefault();
    setEditingFlightId(val._id);
    const formValues =
    {
      Flight_Number: val.Flight_Number,
      Departure_Date: val.Departure_Date,
      Departure_Time: val.Departure_Time,
      Arrival_Date: val.Arrival_Date,
      Arrival_Time: val.Arrival_Time,
      Departure_Airport: val.Departure_Airport,
      Arrival_Airport: val.Arrival_Airport,
      Number_of_Economy_Seats: val.Number_of_Economy_seats,
      Number_of_Business_Seats: val.Number_of_Business_seats
    }
    setEditFormData(formValues);
  }

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  }
  const handleDeleteClick = (val) => {
    setpopupbutton(true);
    setDeletedFlight(val);
    console.log("I'm here");
  }
  const handleSearchResult = (val) => {
    console.log("here");
    if (searchActiveTerms.Flight_Number === "" && searchActiveTerms.Departure_Airport === "" && searchActiveTerms.Arrival_Airport === "" && searchActiveTerms.Departure_Time === "" && searchActiveTerms.Arrival_Time === "" && searchActiveTerms.Departure_Date === "" && searchActiveTerms.Arrival_Date === "")  
    { console.log("im here");
      return true;}
    let flag = true;
    if (searchActiveTerms.Flight_Number !== "" && val.Flight_Number !==searchActiveTerms.Flight_Number)
      {console.log("im here 1");flag = false; }
    if (searchActiveTerms.Departure_Airport !== "" && val.Departure_Airport !== searchActiveTerms.Departure_Airport)
      {console.log("im here 2");flag = false;}
    if (searchActiveTerms.Arrival_Airport !== "" && val.Arrival_Airport !== searchActiveTerms.Arrival_Airport)
     { console.log("im here 3");flag = false;}
    if (searchActiveTerms.Arrival_Date !== "" && val.Arrival_Date !== searchActiveTerms.Arrival_Date)
     { console.log("im here 4 ");flag = false;}
    if (searchActiveTerms.Arrival_Time !== "" && val.Arrival_Time !== searchActiveTerms.Arrival_Time)
     { console.log("im here 5 ");flag = false;}
    if (searchActiveTerms.Departure_Date !== "" && !val.Departure_Date.includes(searchActiveTerms.Departure_Date))
    {console.log("here t 1")
    console.log(val.Flight_Number);
    console.log(val.Departure_Date);
    console.log(searchActiveTerms.Departure_Date); flag=false;}
    if (searchActiveTerms.Departure_Time !== "" && val.Departure_Time !== searchActiveTerms.Departure_Time)
      flag = false;
    return flag;
  }

  useEffect(() => { Axios.get("http://localhost:3001/schedule").then((Response) => setAllflights(Response.data)) }, []);

  return (
    <div className="app-container">
      {/* <div> <h1> Flights</h1></div> */}
      <table>
        <thead>
          <Search handleSearchTermsChange={handleSearchTermsChange} />
          <tr>
            <th>Flight Number</th>
            <th>Departure Date</th>
            <th>Departure time</th>
            <th>Departure Airport</th>
            <th>Arrival Date</th>
            <th>Arrival time</th>
            <th>Arrival Airport</th>
            <th>Economy Class Seats</th>
            <th>Business Class Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            allflights.map(val => (
               (handleSearchResult(val)) ?
              (<Fragment>
                {(EditedFlightId === val._id) ?
                  (<EditFlightRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} val={val} />) :
                  (
                  <ReadableRow val={val} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />)}
              </Fragment>)
               : (console.log(''))
            )
            )
          }

        </tbody>
      </table>
      <Popup trigger={popupbutton} setTrigger={setpopupbutton} delete_flight={toBeDeletedFlight} ><h2>Are you sure you want to delete the following flight:</h2></Popup>
    </div>

  )

}
