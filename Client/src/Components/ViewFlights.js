import React from 'react'
import { useState, useEffect } from "react";
import Axios from 'axios'
import  './ViewFlights.css'
import { Confirmdelete } from './Confirmdelete';

 function ViewFlights( ){

const [userflights, setuserflights] = useState([]);

const [buttonpopup, setbuttonpopup] = useState(false);
const [confirmation, setconfirmation] = useState([]);
const[userid,setuserid]= useState([]);
const[dep_flight_id,setdepflightid]= useState([]);
const[re_flight_id,setreturnflightid]= useState([]);
const[Dseats_id,setseatsDID]= useState([]);
const[Aseats_id,setseatsAID]= useState([]);

const ondelete=(confirm,user_id)=>{
    setbuttonpopup(true)
    setconfirmation(confirm)
    setuserid(user_id);
}
   
useEffect(() => { Axios.get("http://localhost:3001/user").then((Response) => setuserflights(Response.data)) }, []);

//console.log(userflights);

    return(
        <div className= "app-containe" >  
         <h1> Ticket Details:</h1>
                    <br/>
                    <br/>
                    <br/>
        <table className="styled-table">  
        { userflights.map(val =>
            <div className="app-containe" key={val._id}>
                {val.Flights.map(info=>
                <div>
                      <br/>
                    <tr><th className="th1">Departure Flight</th></tr>
                    <tr>
                    <th >Flight number</th>
                    <th >Departure Flight Date </th>
                    <th >Departure Flight Time </th>
                    <th >Departure Flight Airport </th>
                    <th >Arrival Flight Date </th>
                    <th >Arrival Flight Time </th>
                    <th >Arrival Flight Airport </th>
                    <th >Flight Seats </th>
                    </tr>
                    <tbody>
                    <td>{info.Departure_flight.Flight_Number} </td>
                    <td>{info.Departure_flight.flight_Departure_Date.toString()} </td>  
                     <td>{info.Departure_flight.flight_Departure_Time} </td> 
                    <td>{info.Departure_flight.flight_Departure_Airport} </td>   
                    <td>{info.Departure_flight.flight_Arrival_Date} </td> 
                     <td>{info.Departure_flight.flight_Arrival_Time} </td>  
                     <td>{info.Departure_flight.flight_Arrival_Airport} </td> 
                    <td>{info.Departure_seats.map(seat=>
                        <p> {seat} </p>)} </td> 
                    </tbody>
                    <br/> <br/>
                    <tr><th className="th1">Return Flight</th></tr>
                    <th > Fligth number </th>
                    <th >Departure Flight Date </th>
                    <th >Departure Flight Time </th>
                    <th >Departure Flight Airport </th>
                    <th >Arrival Flight Date </th>
                    <th >Arrival Flight Time </th>
                    <th >Arrival Flight Airport </th>
                    <th >Flight Seats </th>
                    <tbody>
                    <td>{info.Arrival_flight.Flight_Number} </td>
                    <td>{info.Arrival_flight.flight_Departure_Date} </td>  
                     <td>{info.Arrival_flight.flight_Departure_Time} </td> 
                    <td>{info.Arrival_flight.flight_Departure_Airport} </td>   
                    <td>{info.Arrival_flight.flight_Arrival_Date} </td> 
                     <td>{info.Arrival_flight.flight_Arrival_Time} </td>  
                     <td>{info.Arrival_flight.flight_Arrival_Airport} </td> 
                    <td>{info.Arrival_seats.map(seat=>
                        <p> {seat} </p>)} </td> 
                    </tbody>
                    <br/> <br/>
                    <th >Flight Class </th>
                    <th >Total Price </th>
                    <th >Confirmation Number </th>
                    <tbody>
                    <td className="t1"> {info.Class}  </td>
                    <td className="t1">  {info.Total_price}  </td>
                    <td className="t1">  {info.Confirmation_number} </td>
                    </tbody>
                    <button className="btn"  onClick={() => ondelete(info.Confirmation_number, val._id,
                        info.Departure_flight.id,info.Arrival_flight.id,info.seatsAID,info.seatsDID) } >Delete Ticket</button>
                    </div>
                    
                    )}
            
        </div>
        )
       
        }
         </table>
         <Confirmdelete trigger={buttonpopup}  setTrigger={setbuttonpopup} delete_ticket={confirmation} user_id={userid}
            departure_flight_id={dep_flight_id} return_flight_id={re_flight_id} seatsAID={Aseats_id} seatsDID={Dseats_id}
        ></Confirmdelete>
        </div>
    );
}

export default ViewFlights;