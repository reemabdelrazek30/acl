import React from 'react'
import { useState } from "react";
import Axios from "axios";
import './createFlight.css';
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

     
    const addFlight = () =>
    {
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
   return (
    <form action="/">
      <div class="banner">
        <h1>Create A Flight</h1>
      </div> 
      <div class="item">
        <p>Flight Number</p>
        <div class="name-item">
          <input type="text" name="number" placeholder="Flight Number" required onClick='setName'
          onChange={(event) => {
            setNumber(event.target.value);
          }}/>
        </div>
      </div>
      <div class="item">
        <p>Departure Date & Time</p>
        <input type="date" name="depDate" required onChange={(event) => {
            setDDate(event.target.value);
          }}/>
        <input type="time" name="depTime"required onChange={(event) => {
            setDTime(event.target.value);
          }}/>
      </div>
      <div class="item">
        <p>Arrival Date & Time</p>
        <input type="date" min={depDate} name="arrivalDate" required onChange={(event) => {
            setADate(event.target.value);
          }}/>
        <input type="time"  name="arrivalTime" required onChange={(event) => {
            setATime(event.target.value);
          }}/>
      </div>
      <div class="item">
        <p>Departure Airport</p>
        <input type="text" name="depAirport" placeholder="Departure Airport" required onChange={(event) => {
            setDAirport(event.target.value);
          }}/>
      </div>
      <div class="item">
        <p>Arrival Airport</p>
        <input type="text" name="arrivalAirport" placeholder="Arrival Airport" required onChange={(event) => {
            setAAirport(event.target.value);
          }}/>
      </div>
      <div class="item">
        <p>Number of Economy Seats</p>
        <input type="number" name="ecoSeats" placeholder="Number of Economy Seats" required onChange={(event) => {
            setESeats(event.target.value);
          }}/>
      </div>
      <div class="item">
        <p>Number of Business Class Seats</p>
        <input type="number" name="businessSeats" placeholder="Number of Business Class Seats" required onChange={(event) => {
            setBSeats(event.target.value);
          }}/>
      </div>
      <div class="item">
        <p>Ticket price for a child</p>
        <input type="number" min="0" max={adult_price} name="child" placeholder="Ticket price for a child" required onChange={(event) => {
            set_child_price(event.target.value);
          }}/>
      </div>
      <div class="item">
        <p>Ticket price for an adult</p>
        <input type="number"min={child_price} name="adult" placeholder="Ticket price for an adult" required onChange={(event) => {
            set_adult_price(event.target.value);
          }}/>
      </div>
      <div class="item">
        <p>Baggage allowance.</p>
        <input type="number" name="baggage" min="0" placeholder="Baggage allowance." required onChange={(event) => {
            set_baggage(event.target.value);
          }}/>
      </div>
      <div class="item">
        <div class="btn-block">
          <button onClick={addFlight()}>Create Flight</button>
        </div>
        <button onclick={() => {history.push("/")}}>Home Page</button>
    </div>
    </form>
);}