import React from 'react'
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from 'axios'
import  './ViewFlights.css'
import { Confirmdelete } from './Confirmdelete';

 function ViewFlights( ){
    let history = useHistory();
//const [userflights, setuserflights] = useState([]);

const [buttonpopup, setbuttonpopup] = useState(false);
const [confirmation, setconfirmation] = useState([]);
const[userid,setuserid]= useState([]);
const[dep_flight_id,setdepflightid]= useState([]);
const[re_flight_id,setreturnflightid]= useState([]);
const[Dseats_id,setseatsDID]= useState([]);
const[Aseats_id,setseatsAID]= useState([]);
//const[TotalPrice,setTotalPrice]= useState([]);

const ondelete=(confirm,user_id,depflightid,returnflightid,depseat,returnseat)=>{
    setbuttonpopup(true)
    setconfirmation(confirm)
    setuserid(user_id);
    setdepflightid(depflightid);
    setreturnflightid(returnflightid);
    setseatsDID(depseat);

}

const redirect=(info) =>{
    history.push({
        pathname: '/cdf',
        state: {   TotalPrice: info.Total_price, 
            conf:info.Confirmation_number, 
            olddepflight_id:info.Departure_flight.id,
            depflightairport:info.Departure_flight.flight_Departure_Airport  ,
            arrivalflightairport: info.Departure_flight.flight_Arrival_Airport ,
            returndate: info.Arrival_flight.flight_Departure_Date ,
            number_of_children:info.children_no,
            number_of_adults:info.adult_no,
            user_id:currentuser_id,
            returnticketprice:info.Arrival_flight.Price
        }
    });
}

const redirect2=(info) =>{
    history.push({
        pathname: '/crf',
        state: {  
            depdate: info.Departure_flight.flight_Arrival_Date ,
            user_id:currentuser_id,
            pastflightinfo: info
        }
    });
}


const [currentuser_id, setcurrent_user_id] = useState([]);
const [currentuser_flights, setcurrent_user_flights] = useState([]);

useEffect(() => {   Axios.get("http://localhost:3001/login",{ withCredentials: true}).then(response => {
    
    if (response.data.loggedIn){
     setcurrent_user_id(response.data.user._id);
     setcurrent_user_flights(response.data.user.Flights)
    }
  })
    
 }, []);

 console.log(" user Flights",currentuser_id);
 


    return(
        
        <div className= "app-containe" >  
         <h1> Ticket Details:</h1>
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
                    <th > Flight Number </th>
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
                    <td>{info.Departure_flight.flight_Departure_Date.split("T")[0]} </td>  
                     <td>{info.Departure_flight.flight_Departure_Time} </td> 
                    <td>{info.Departure_flight.flight_Departure_Airport} </td>   
                    <td>{info.Departure_flight.flight_Arrival_Date.split("T")[0]} </td> 
                     <td>{info.Departure_flight.flight_Arrival_Time} </td>  
                     <td>{info.Departure_flight.flight_Arrival_Airport} </td> 
                    <td>{info.Departure_seats.map(seat=>
                        <p> {seat} </p>)} </td> 
                    </tbody>

                    <button onClick={()=> redirect(info)}> Change Departure Flight </button>
                    <br/>
                    <br/> <br/>
                    <tr><th className="th1">Return Flight</th></tr>
                    <th > Flight Number </th>
                    <th >Departure Flight Date </th>
                    <th >Departure Flight Time </th>
                    <th >Departure Flight Airport </th>
                    <th >Arrival Flight Date </th>
                    <th >Arrival Flight Time </th>
                    <th >Arrival Flight Airport </th>
                    <th >Flight Seats </th>
                    <tbody>
                    <td>{info.Arrival_flight.Flight_Number} </td>
                    <td>{info.Arrival_flight.flight_Departure_Date.split("T")[0]} </td>  
                     <td>{info.Arrival_flight.flight_Departure_Time} </td> 
                    <td>{info.Arrival_flight.flight_Departure_Airport} </td>   
                    <td>{info.Arrival_flight.flight_Arrival_Date.split("T")[0]} </td> 
                     <td>{info.Arrival_flight.flight_Arrival_Time} </td>  
                     <td>{info.Arrival_flight.flight_Arrival_Airport} </td> 
                    <td>{info.Arrival_seats.map(seat=>
                        <p> {seat} </p>)} </td> 
                    </tbody>

                    <button onClick={()=> redirect2(info)}> Change Return Flight </button>

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