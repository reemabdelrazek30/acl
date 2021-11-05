import React,{ useState,useEffect} from 'react'
import './Flight.css'
import Axios from "axios";
import UpdateFlight from './EditFlight'

const Flight = () => {
  const[allflights,setAllflights]=useState([])

  useEffect(() =>{
    Axios.get("http://localhost:3001/").then((Response)=> {
      setAllflights(Response.data)
    })
  
  
  },[]);

  return (<div className="app-container">
    <h1> Flights</h1>
    <table>
    <tbody>  
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
    
      
   {allflights.map((val,key)=>{
     return (<tr>
       <td>{val.Flight_Number }</td> 
       <td>{val.Departure_Date} </td> 
       <td>{val.Departure_Time }</td>
       <td>{val.Departure_Airport} </td>  
       <td>{val.Arrival_Date} </td> 
       <td>{val.Arrival_Time} </td> 
       <td>{val.Arrival_Airport} </td> 
       <td>{val.Number_of_Economy_seats} </td> 
       <td>{val.Number_of_Business_seats} </td>
       <button onClick={() => {UpdateFlight(val._id)}}>Edit</button>
       <button>Delete</button>
       </tr>
       )
   })}

   
   
   </tbody>
  </table>
  </div>
  )
}

export default Flight