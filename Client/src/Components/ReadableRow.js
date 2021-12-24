import  React  from "react";
import './ReadableRow.css';
export const ReadableRow = ({val , handleEditClick , handleDeleteClick}) => 
{
    return(
    <tr key={val._id}>  
    <td>{val.Flight_Number }</td> 
    <td>{val.Departure_Date.split('T')[0]} </td> 
    <td>{val.Departure_Time}</td>
    <td>{val.Departure_Airport} </td>  
    <td>{val.Arrival_Date.split('T')[0]} </td> 
    <td>{val.Arrival_Time} </td> 
    <td>{val.Arrival_Airport} </td> 
    <td>{val.Number_of_Economy_seats} </td> 
    <td>{val.Number_of_Business_seats} </td>
    <td> <button className="buttonFlight" onClick={(event) => handleEditClick(event,val)}>Edit</button>
    <button className="buttonFlight" onClick={() => handleDeleteClick(val)}>Delete</button>  </td> 
    </tr>
    )
}