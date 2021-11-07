import React from 'react'
import Axios from "axios";
export const EditFlightRow = ({val,editFormData, handleEditFormChange }) => { //  const [newNumber, handleEditFormChangeNumber] = useState("");
  
  const UpdateFlight = (id) => {
    Axios.put(`http://localhost:3001/updateFlight/${id}`, {
      Flight_Number: editFormData.Flight_Number,
      Departure_Date: editFormData.Departure_Date,
      Departure_Time: editFormData.Departure_Time,
      Arrival_Date: editFormData.Arrival_Date,
      Arrival_Time: editFormData.Arrival_Time,
      Departure_Airport:editFormData.Departure_Airport,
      Arrival_Airport: editFormData.Arrival_Airport,
      Number_of_Economy_Seats: editFormData.Number_of_Economy_Seats,
      Number_of_Business_Seats: editFormData.Number_of_Business_Seats
    });
  }
  return (
    <tr>
      <td>
        <input type="text" name="Flight_Number" placeholder="Flight Number" value={editFormData.Flight_Number}
          onChange={(event) => {
            handleEditFormChange(event);
          }} />
      </td>
      <td>
        <input type="date" name="Departure_Date" placeholdeer="" Defaultvalue={editFormData.Departure_Date} onChange={(event) => {
          handleEditFormChange(event);
        }} />

      </td>
      <td>
        <input type="time" name="Departure_Time" value={editFormData.Departure_Time} onChange={(event) => {
          handleEditFormChange(event);
        }} />
      </td>
      <td>
        <input type="text" name="Departure_Airport" placeholder="Dept Airport" value={editFormData.Departure_Airport} onChange={(event) => {
          handleEditFormChange(event);
        }} />
      </td>
      <td>
        <input type="date" name="Arrival_Date" placeholder="" defaultValue={editFormData.Arrival_Date} onChange={(event) => {
          handleEditFormChange(event);
        }} />
      </td>
      <td>
        <input type="time" name="Arrival_Time" placeholder="" value={editFormData.Arrival_Time} onChange={(event) => {
          handleEditFormChange(event);
        }} />
      </td>

      <td>
        <input type="text" name="Arrival_Airport" placeholder="Arrival Airport" value={editFormData.Arrival_Airport} onChange={(event) => {
          handleEditFormChange(event);
        }} />
      </td>
      <td>
        <input type="text" name="Number_of_Economy_Seats" placeholder="Number of Economy Class Seats"  value={editFormData.Number_of_Economy_Seats} onChange={(event) => {
          handleEditFormChange(event);
        }} /> </td>
      <td>
        <input type="text" name="Number_of_Business_Seats" placeholder="Number of Business Class Seats" value={editFormData.Number_of_Business_Seats} onChange={(event) => {
          handleEditFormChange(event);
        }} />
      </td>
      <td>
        <button onClick={() => UpdateFlight(val._id)}>Save</button></td>
    </tr>
  )
}