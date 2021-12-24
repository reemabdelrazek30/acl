import React, { useState } from 'react'
import './SearchFlight.css';
export const Search = ({handleSearchTermsChange}) => {
  const [searchFormData, setSearchFormData] = useState(
    {
      flightNumber: "",
      departureDate: "",
      departureTime: "",
      arrivalDate: "",
      arrivalTime: "",
      departureAirport: "",
      arrivalAirport: "",
    })

  const handleSearchFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...searchFormData };
    newFormData[fieldName] = fieldValue;
    setSearchFormData(newFormData);
  }
  return (

    <tr>
      <td><input className="inputSearch" name="flightNumber" placeholder="Flight Number" onChange={(event) => { handleSearchFormChange(event) }} /></td>
      <td><input className="inputSearch" name="departureDate" type ="Date" placeholder="Departure Date" onChange={(event) => { handleSearchFormChange(event) }} /></td>
      <td><input className="inputSearch" name="departureTime" type = "text" placeholder="Departure Time" onChange={(event) => { handleSearchFormChange(event) }} /></td>
      <td><input className="inputSearch" name="departureAirport" placeholder="Departure Airport" onChange={(event) => { handleSearchFormChange(event) }} /></td>
      <td><input className="inputSearch" name="arrivalDate" type ="Date" placeholder="Arrival Date" onChange={(event) => { handleSearchFormChange(event)}} /></td>
      <td><input className="inputSearch" name="arrivalTime" type = "text" placeholder="Arrival Time" onChange={(event) => { handleSearchFormChange(event)}}/></td>
      <td><input className="inputSearch" name="arrivalAirport" placeholder="Arrival Airport" onChange={(event) => {handleSearchFormChange(event)}} /></td>
      <td> <button className="buttonFilter" onClick={(event)=>{handleSearchTermsChange(event ,searchFormData)}}>filter</button></td>
    </tr>
  )
}