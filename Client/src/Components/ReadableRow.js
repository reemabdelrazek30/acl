import  React  from "react";
export const ReadableRow = ({val , handleEditClick , handleDeleteClick}) => 
{
    return(
    <tr key={val._id}>  
    <td>{val.Flight_Number }</td> 
    <td>{val.Departure_Date} </td> 
    <td>{val.Departure_Time }</td>
    <td>{val.Departure_Airport} </td>  
    <td>{val.Arrival_Date} </td> 
    <td>{val.Arrival_Time} </td> 
    <td>{val.Arrival_Airport} </td> 
    <td>{val.Number_of_Economy_seats} </td> 
    <td>{val.Number_of_Business_seats} </td>
    <td> <button onClick={(event) => handleEditClick(event,val)}>Edit</button>
    <button onClick={() => handleDeleteClick(val)}>Delete</button>  </td> 
    </tr>
    )
}