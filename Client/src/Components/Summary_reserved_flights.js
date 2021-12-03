import { useState } from "react";
import Axios from "axios";

export default function Summary (props){

//   const handle_final_booking=()=>{

// Axios.post("http://localhost:3001/confirm_booking",{

//   Departure_flight:props.Dflight,
//   Arrival_flight:props.Aflight,

// Total_price:(props.Aflight.Price+props.Dflight.Price),
// Class:props.Aflight.Class,
// Departure_seats:props.Dflight.Seats,
// Arrival_seats:props.Aflight.Seats
    


//   }).then((Response) => 
//   console.log("enterd front  3"+"  axios"+JSON.stringify(props.Dflight) )) 
  
    
   
    


//   }

    return( props.trigger?

(<div >
  <div id="summary" >
   

<table >

        <thead>
         { <tr >
            <th >Flight type</th>
            <th >Flight Number</th>
            <th>Departure Date</th>
            <th>Departure time</th>
            <th>Arrival Date</th>
            <th>Arrival time</th>
           
            <th>Departure Airport</th>
            <th>Arrival Airport</th>
           
            <th>Class</th>
            <th>Seats</th>
            <th>Price</th>
            {/* <th className="special_td">Actions</th> */}
            {/* <th>Actions</th> */}
            {/* <th>Economy Class Seats</th>
            <th>Business Class Seats</th> */}
            {/* <th>Actions</th> */}
          </tr>}
        </thead>
        {/* <br/> */}
        <tbody>

      
      {/* < div className="test" >
        <button className="buttonClass" onClick={()=>{ handleserving(flight._id,flight.Departure_Date,flight.Departure_Time,
          flight.Arrival_Date,flight.Arrival_Time,flight.Departure_Airport,flight.Arrival_Airport
          )}}>Select </button> */}
        {/* <tr key={flight._id} style={{"border-color": "lawngreen"}} onClick={()=>{ handelClickingRow(flight._id,flight.Departure_Date,flight.Arrival_Date,flight.Departure_Time,flight.Arrival_Time)}}> */}
        {/* <tr key={flight._id} onClick={handelClickingRow(flight._id)}> */}
        <tr>
        <th > Departure Flight</th>
        <td > {props.Dflight.Flight_Number} </td>
        <td > {props.Dflight.flight_Departure_Date} </td>
        <td > {props.Dflight.flight_Departure_Time} </td>
        <td > {props.Dflight.flight_Arrival_Date} </td>
        <td > {props.Dflight.flight_Arrival_Time} </td>
        <td > {props.Dflight.flight_Departure_Airport} </td>
        <td > {props.Dflight.flight_Arrival_Airport} </td>
        <td rowSpan="2"> {props.Dflight.Class} </td>
        <td > {props.Dflight.Seats} </td>
        <td > {props.Dflight.Price} </td>
        {/* <button>test</button> */}
        {/* <td style={{display:"relative"}}></td> */}
        
       
 </tr>
 {/* <button>test</button> */}
 {/* <p> "hello                             "{props.Aflight.Flight_Number}</p>
 <p> "hello                             "{props.Aflight.Flight_Number}</p>
 <p> "hello                             "{props.Aflight.Flight_Number}</p> */}
 
 <tr>
        <th > Arrival Flight</th>
        <td > {props.Aflight.Flight_Number} </td>
        
        <td > {props.Aflight.flight_Departure_Date} </td>
        <td > {props.Aflight.flight_Departure_Time} </td>
        <td > {props.Aflight.flight_Arrival_Date} </td>
        <td > {props.Aflight.flight_Arrival_Time} </td>
        <td > {props.Aflight.flight_Departure_Airport} </td>
        <td > {props.Aflight.flight_Arrival_Airport} </td>
        {/* <td > {props.Aflight.Class} </td> */}
        <td > {props.Aflight.Seats} </td>
        <td > {props.Aflight.Price} </td>
        
        {/* <td style={{display:"relative"}}></td> */}
        {/* <button>test</button> */}
       
 </tr>
  
 
      

            </tbody>
            <tfoot>
    <tr>
      <th>Total Price</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{props.Aflight.Price+props.Dflight.Price} </td>
    </tr>
  </tfoot>
            </table>
          
          
            <br/>



</div>
{/* <div id="summary_button">

<button> onClick={props.return_flight} Change return flight </button>
<button onClick={props.departure_flight}>Change departure flight and return flight  </button>
<button onClick={props.handle_final_booking}>Confirm serving </button>

</div> */}
</div> 

 ):""       
 )
   
}