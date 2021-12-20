import React from 'react'
import { useState, useEffect } from "react";
import Axios from 'axios'
import  './ViewFlights.css'
import { Confirmdelete } from './Confirmdelete';
import{useHistory} from 'react-router-dom'


 function ViewFlights( ){
console.log("entered view flights page from top")
const [userflights, setuserflights] = useState([]);

const [buttonpopup, setbuttonpopup] = useState(false);
const [confirmation, setconfirmation] = useState([]);
const[userid,setuserid]= useState([]);
const[dep_flight_id,setdepflightid]= useState([]);
const[re_flight_id,setreturnflightid]= useState([]);
const[Dseats_id,setseatsDID]= useState([]);
const[Aseats_id,setseatsAID]= useState([]);
const history =useHistory();
const [reLad,setReLoad]=useState(false)
const ondelete=(confirm,user_id)=>{
    setbuttonpopup(true)
    setconfirmation(confirm)
    setuserid(user_id);
}
function goSeats(confNumber,id,classType,num,flightType){
// history.push({
//     path:'/ReserveSeats',

// })
history.push({
    pathname: '/ReserveSeats',
   // search: '?update=true',  // query string
    state: {  // location state
        id: id, conf:confNumber,classT:classType,number:num , user:currentuser_id,flightType:flightType
    },
  }); 
}
//Axios.defaults.withCredentials = true;
//const [isLoggedIn, setLoggedIn] = useState(false)
const [currentuser_id, setcurrent_user_id] = useState("");
const [currentuser_flights, setcurrent_user_flights] = useState([]);

useEffect(() => {   Axios.get("http://localhost:3001/login",{ withCredentials: true}).then(response => {
    console.log(response.data.loggedIn)
    console.log("entered use effect in view flights")
    if (response.data.loggedIn){
     setcurrent_user_id(response.data.user._id);
     setcurrent_user_flights(response.data.user.Flights)
    }
  })
    
 }, []);

 console.log(" user Flights",currentuser_id);
 




    return(
        
        <div className= "app-containe" >  
         <h1> Tricket Details:</h1>
                    <br/>
                    <br/>
                    <br/>


         <table>  
           { currentuser_flights.map(info=>

            <div className="app-containe" >
               
                <div>
                      <br/>
                   
                    <tr><th className="th1">Departure Flight</th></tr>
                    <tr>
                    <th > Fligth number </th>
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
                    <button className="btn" onClick={()=>goSeats(info.Confirmation_number,info.Departure_flight.id,info.Class,( info.Departure_seats.length),"departF")}>Edit Seats</button> 

                    <button> Change Departure Flight </button>
                    <br/>
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
                    <button className="btn" onClick={()=>goSeats(info.Confirmation_number,info.Arrival_flight.id,info.Class,( info.Departure_seats.length),"returnF")}>Edit Seats</button> 

                    <br/> <br/>
                    <th >Flight Class </th>
                    <th >Total Price </th>
                    <th >Confirmation Number </th>
                    <tbody>
                    <td className="t1"> {info.Class}  </td>
                    <td className="t1">  {info.Total_price}  </td>
                    <td className="t1">  {info.Confirmation_number} </td>
                    </tbody>
                    <button className="btn"  onClick={() => ondelete(info.Confirmation_number, currentuser_id,
                        info.Departure_flight.id,info.Arrival_flight.id,info.seatsAID,info.seatsDID) } >Delete Ticket</button>




                    </div>
                    
                    
            
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