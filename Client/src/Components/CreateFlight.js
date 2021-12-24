import React from 'react'
import { useState } from "react";
import Axios from "axios";
import './CreateFlight.css';
import { useHistory } from 'react-router';

export default function CreateFlight()
{ 
    let history = useHistory();
    const [number, setNumber] = useState(0);
    const [depDate, setDDate] = useState("");
    const [depTime, setDTime] = useState("");
    const [arrivalDate, setADate] = useState("");
    const [arrivalTime, setATime] = useState("");
    const [depAirport, setDAirport] = useState("");
    const [arrivalAirport, setAAirport] = useState("");
    const [ecoSeats, setESeats] = useState(0);
    const [businessSeats, setBSeats] = useState(0);
    const [child_price, set_child_price] = useState(0);
    const [adult_price, set_adult_price] = useState(0);
    const [baggage, set_baggage] = useState(0);
    const [viewFirstPage, setViewFirstPage] = useState(true);
    Axios.defaults.withCredentials = true;
    const addFlight = () =>
    {
        console.log("Fornt")
        Axios.post("http://localhost:3001/addFlight", {
        Flight_Number:number,
        Departure_Date:depDate,
        Departure_Time:depTime,
        Arrival_Date:arrivalDate,
        Arrival_Time:arrivalTime,
        Departure_Airport:depAirport,
        Arrival_Airport:arrivalAirport,
        Number_of_Economy_seats:ecoSeats,
        Number_of_Business_seats:businessSeats,
        numberOfAvailableEconomySeats:ecoSeats,
        numberOfAvailableBusinessSeats:businessSeats,
        price_child:child_price,
        price_adult:adult_price,
        baggage:baggage
    });
    }
  const continueButton = () => {
      setViewFirstPage(false);
  }
  const homePage = () => {
      history.push('/FlightCreationSuccessful');
  }
    return (
      <div className="bannerCreateFlight">
        <div className = "containerCreateFlight">
            {console.log(viewFirstPage)}
      <form className="formCreateFlight" action="/">
        {viewFirstPage?(
            <div>
                  <h1 className="h1CreateFlight">Create A Flight</h1>
                   <div className="item">
                        <p>Flight Number</p>
                       <div>
                           <input className="inputCreateFlight" type="text" name="number" placeholder="Flight Number" required onClick='setName'
                            onChange={(event) => {
                            setNumber(event.target.value);
                             }}/>
                       </div>
                </div>
                <div><div>
                    <input className="inputCreateFlight" type="text" name="depAirport" placeholder="Departure Airport" required onChange={(event) => {
                     setDAirport(event.target.value);
                    }}/>
              </div>
                    <p>Departure Date & Time</p>
                    <div>
                          <input className="inputCreateFlight" type="date" name="depDate" placeholder="Arrival Date" required onChange={(event) => {
                          setDDate(event.target.value);
                          }}/>
                          <input className="inputCreateFlight" type="time" name="depTime"required placeholder="Arrival Date" onChange={(event) => {
                          setDTime(event.target.value);
                          }}/>
                    </div> 
                </div>
                <div>  <div>
        <p>Arrival Airport</p>
        <input className="inputCreateFlight" type="text" name="arrivalAirport" placeholder="Arrival Airport" required onChange={(event) => {
            setAAirport(event.target.value);
          }}/>
          </div>
                     <p>Arrival Date & Time</p>
                     <div>
                          <input className="inputCreateFlight" type="date" min={depDate} placeholder="Departure Date" name="arrivalDate" required onChange={(event) => {
                           setADate(event.target.value);
                           }}/>
                          <input className="inputCreateFlight" type="time"  name="arrivalTime" placeholder="Departure Time" required onChange={(event) => {
                          setATime(event.target.value);
                          }}/>
                     </div>
                    
   </div>
   <div>
     <button id="continue" className="buttonCreateFlight" onClick={() => continueButton()}>Continue</button>
     </div>
   </div>):
   (
       <div>
        <div>
          <h1 className="h1CreateFlight">Create A Flight</h1>
        <p>Number of Economy Seats</p>
        <input className="inputCreateFlight2" type="number" name="ecoSeats" placeholder="Number of Economy Seats" required onChange={(event) => {
            setESeats(event.target.value);
          }}/>
      </div>
      <div>
        <p>Number of Business Class Seats</p>
        <input className="inputCreateFlight2" type="number" name="businessSeats" placeholder="Number of Business Class Seats" required onChange={(event) => {
            setBSeats(event.target.value);
          }}/>
      </div>
      <div>
        <p>Ticket price for a child</p>
        <input className="inputCreateFlight2" type="number" min="0" max={adult_price} name="child" placeholder="Ticket Price - Child" required onChange={(event) => {
            set_child_price(event.target.value);
          }}/>
      </div>
      <div>
        <p>Ticket price for an adult</p>
        <input className="inputCreateFlight2" type="number"min={child_price} name="adult" placeholder="Ticket Price - Adult" required onChange={(event) => {
            set_adult_price(event.target.value);
          }}/>
      </div>
      <div>
        <p>Baggage allowance</p>
        <input className="inputCreateFlight2" type="number" name="baggage" min="0" placeholder="Baggage Allowance" required onChange={(event) => {
            set_baggage(event.target.value);
          }}/>
      </div>
      <div>

        <div className="btn-block">
          <br /> 
          <button className="buttonCreateFlight2" onClick={addFlight}>Create Flight</button>
        </div>
        <button id="homePage" className="buttonCreateFlight2" onClick={() => {setViewFirstPage(true)}}>Back</button>
        <div>
        <button className="buttonCreateFlight2" id="homePage" onClick={() => {homePage()}}>Home Page</button>
        <br />
        </div>
    </div>
    </div>
   )
  }
     </form>
 </div>
 </div>
 
);}