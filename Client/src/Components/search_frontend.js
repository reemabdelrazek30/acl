import React, { useState } from 'react'
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
      <td><input name="flightNumber" placeholder="Flight Number" onChange={(event) => { handleSearchFormChange(event) }} /></td>
      <td><input name="departureDate" placeholder="Departure Date" onChange={(event) => { handleSearchFormChange(event) }} /></td>
      <td><input name="departureTime" type = "text" placeholder="Departure Time" onChange={(event) => { handleSearchFormChange(event) }} /></td>
      <td><input name="departureAirport" placeholder="Departure Airport" onChange={(event) => { handleSearchFormChange(event) }} /></td>
      <td><input name="arrivalDate" placeholder="Arrival Date" onChange={(event) => { handleSearchFormChange(event)}} /></td>
      <td><input name="arrivalTime" type = "text" placeholder="Arrival Time" onChange={(event) => { handleSearchFormChange(event)}}/></td>
      <td><input name="arrivalAirport" placeholder="Arrival Airport" onChange={(event) => {handleSearchFormChange(event)}} /></td>
      <td> <button onClick={(event)=>{handleSearchTermsChange(event ,searchFormData)}}>filter</button></td>
    </tr>
  )
}