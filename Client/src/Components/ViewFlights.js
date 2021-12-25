import React from 'react'
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from 'axios'
import './ViewFlights.css'
import { Confirmdelete } from './Confirmdelete';

//const [userflights, setuserflights] = useState([]);

function ViewFlights() {
    console.log("entered view flights page from top")
    let history = useHistory();
    //const [userflights, setuserflights] = useState([]);
    Axios.defaults.withCredentials = true;
    //const [isLoggedIn, setLoggedIn] = useState(false)
    const [buttonpopup, setbuttonpopup] = useState(false);
    const [confirmation, setconfirmation] = useState([]);
    const [userid, setuserid] = useState([]);
    const [dep_flight_id, setdepflightid] = useState([]);
    const [re_flight_id, setreturnflightid] = useState([]);
    const [Dseats_id, setseatsDID] = useState([]);
    const [Aseats_id, setseatsAID] = useState([]);
    const [reLad, setReLoad] = useState(false)
    const [currentuser_id, setcurrent_user_id] = useState([]);
    const [currentuser_flights, setcurrent_user_flights] = useState([]);
    const ondelete = (confirm, user_id) => {
        setbuttonpopup(true)
        setconfirmation(confirm)
        setuserid(user_id);
    }

    const redirect = (info) => {
        history.push({
            pathname: '/cdf',
            state: {
                TotalPrice: info.Total_price,
                conf: info.Confirmation_number,
                olddepflight_id: info.Departure_flight.id,
                depflightairport: info.Departure_flight.flight_Departure_Airport,
                arrivalflightairport: info.Departure_flight.flight_Arrival_Airport,
                returndate: info.Arrival_flight.flight_Departure_Date,
                number_of_children: info.children_no,
                number_of_adults: info.adult_no,
                user_id: currentuser_id,
                returnticketprice: info.Arrival_flight.Price
            }
        });
    }

    const redirect2 = (info) => {
        history.push({
            pathname: '/crf',
            state: {
                depdate: info.Departure_flight.flight_Arrival_Date,
                user_id: currentuser_id,
                pastflightinfo: info
            }
        });
    }
    useEffect(() => {
        Axios.get("http://localhost:3001/login", { withCredentials: true }).then(response => {
            console.log(response.data.loggedIn)
            console.log("entered use effect in view flights")
            if (response.data.loggedIn) {
                setcurrent_user_id(response.data.user._id);
                setcurrent_user_flights(response.data.user.Flights)
                console.log(JSON.stringify(response.data.user.Flights))
            }
        })

    }, [currentuser_id]);
    function goSeats(confNumber, id, classType, num, flightType) {
        // history.push({
        //     path:'/ReserveSeats',
        console.log(currentuser_id + "currentuser_id")
        // })
        history.push({
            pathname: '/ReserveSeats',
            // search: '?update=true',  // query string
            state: {  // location state
                id: id, conf: confNumber, classT: classType, number: num, user: currentuser_id, flightType: flightType
            },
        });
    }


    return(
        
        <div id="styled-table" >  
         <h1> Tricket Details:</h1>
                    <br/>
                    <br/>
                    <br/>


         <table   align="center">  
           { currentuser_flights.map((info)=>
                   
            <div  >
                 <br/> <br/>  <br/>  <br/> <br/>  <br/>
                {/* console.log("key:"+l);
                    console.log("value:"+info); */}
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
                    <button className="btn" onClick={()=>goSeats(info.Confirmation_number,info.Departure_flight.id,info.Class,( info.Departure_seats.length),"departF")}>Edit Seats</button> 

                    </tr>
        
                    <tbody>
                    <td>{info.Departure_flight.Flight_Number} </td>
                    <td>{info.Departure_flight.flight_Departure_Date.split('T')[0]} </td>  
                     <td>{info.Departure_flight.flight_Departure_Time} </td> 
                    <td>{info.Departure_flight.flight_Departure_Airport} </td>   
                    <td>{info.Departure_flight.flight_Arrival_Date.split('T')[0]} </td> 
                     <td>{info.Departure_flight.flight_Arrival_Time} </td>  
                     <td>{info.Departure_flight.flight_Arrival_Airport} </td> 
                    <td>{info.Departure_seats.map(seat=>
                        <p> {seat} </p>)} </td> 
                         <button  className="btn"onClick={()=> redirect(info)}> Change Departure Flight </button>
                    </tbody>
                    {/* <button className="btn" onClick={()=>goSeats(info.Confirmation_number,info.Departure_flight.id,info.Class,( info.Departure_seats.length),"departF")}>Edit Seats</button> 

                    <button className="btn"> Change Flight </button> */}
                    <br/>
                    <br/> <br/>
                    <tr><th className="th1">Return Flight</th></tr>
                    <tr>
                    <th > Fligth number </th>
                    <th >Departure Flight Date </th>
                    <th >Departure Flight Time </th>
                    <th >Departure Flight Airport </th>
                    <th >Arrival Flight Date </th>
                    <th >Arrival Flight Time </th>
                    <th >Arrival Flight Airport </th>
                    <th >Flight Seats </th>
                    <button className="btn" onClick={()=>goSeats(info.Confirmation_number,info.Arrival_flight.id,info.Class,( info.Departure_seats.length),"returnF")}>Edit Seats</button> 
</tr>
                    <tbody>
                    <td>{info.Arrival_flight.Flight_Number} </td>
                    <td>{info.Arrival_flight.flight_Departure_Date.split('T')[0]} </td>  
                     <td>{info.Arrival_flight.flight_Departure_Time} </td> 
                    <td>{info.Arrival_flight.flight_Departure_Airport} </td>   
                    <td>{info.Arrival_flight.flight_Arrival_Date.split('T')[0]} </td> 
                     <td>{info.Arrival_flight.flight_Arrival_Time} </td>  
                     <td>{info.Arrival_flight.flight_Arrival_Airport} </td> 
                    <td>{info.Arrival_seats.map(seat=>
                        <p> {seat} </p>)} </td> 
                     <button className="btn"> Change Flight </button>
                    
                    </tbody>
                    {/* <button className="btn" onClick={()=>goSeats(info.Confirmation_number,info.Arrival_flight.id,info.Class,( info.Departure_seats.length),"returnF")}>Edit Seats</button>  */}
                    {/* <button className="btn"> Change Flight </button> */}
                    <br/> <br/>
                    <th >Flight Class </th>
                    <th >Total Price </th>
                    <th >Confirmation Number </th>
                    <tbody>
                    <td className="t1"> {info.Class}  </td>
                    <td className="t1">  {info.Total_price}  </td>
                    <td className="t1">  {info.Confirmation_number} </td>
                    <button className="btn1"  onClick={() => ondelete(info.Confirmation_number, currentuser_id,
                        info.Departure_flight.id,info.Arrival_flight.id,info.seatsAID,info.seatsDID) } >Delete Ticket</button>


                    </tbody>

                    {/* <button className="btn1"  onClick={() => ondelete(info.Confirmation_number, currentuser_id,
                        info.Departure_flight.id,info.Arrival_flight.id,info.seatsAID,info.seatsDID) } >Delete Ticket</button>
 */}



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