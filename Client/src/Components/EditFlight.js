import React from 'react'
import { useState } from "react";
import Axios from "axios";
import Flight from './Flight';

function EditFlight () {
    const [newNumber, setNewNumber] = useState(0);
    const [newDepDate, setNewDDate] = useState("");
    const [newDepTime, setNewDTime] = useState("");
    const [newArrivalDate, setNewADate] = useState("");
    const [newArrivalTime, setNewATime] = useState("");
    const [newDepAirport, setNewDAirport] = useState("");
    const [newArrivalAirport, setNewAAirport] = useState("");
    const [newEcoSeats, setNewESeats] = useState(0);
    const [newBusinessSeats, setNewBSeats] = useState(0);



  const UpdateFlight =(id) => {

    Axios.put("http://localhost:3001/updateFlight" , { 
      id: id, 
      newNumber: newNumber, 
      newDeptDate: newDepDate, 
      newDepTime: newDepTime, 
      newArrivalDate: newArrivalDate, 
      newArrivalTime: newArrivalTime, 
      newDepAirport: newDepAirport, 
      newArrivalAirport: newArrivalAirport, 
      newEcpSeats: newEcoSeats, 
      newBusinessSeats: newBusinessSeats})
      console.log(newNumber+newArrivalAirport+newArrivalDate)

  }

 return (
  <form action="/">
  <div class="banner">
    <h1>Edit Flight</h1>
  </div> 
  <div class="item">
    <p>Flight Number</p>
    <div class="name-item">
      <input type="text" name="number" placeholder="Flight Number" required onClick='setName'
      onChange={(event) => {
        setNewNumber(event.target.value);
      }}/>
    </div>
  </div>
  <div class="item">
    <p>Departure Date & Time</p>
    <input type="date" name="depDate" required onChange={(event) => {
        setNewDDate(event.target.value);
      }}/>
    <input type="time" name="depTime"required onChange={(event) => {
        setNewDTime(event.target.value);
      }}/>
  </div>
  <div class="item">
    <p>Arrival Date & Time</p>
    <input type="date" name="arrivalDate" required onChange={(event) => {
        setNewADate(event.target.value);
      }}/>
    <input type="time" name="arrivalTime" required onChange={(event) => {
        setNewATime(event.target.value);
      }}/>
  </div>
  <div class="item">
    <p>Departure Airport</p>
    <input type="text" name="depAirport" placeholder="Departure Airport" required onChange={(event) => {
        setNewDAirport(event.target.value);
      }}/>
  </div>
  <div class="item">
    <p>Arrival Airport</p>
    <input type="text" name="arrivalAirport" placeholder="Arrival Airport" required onChange={(event) => {
        setNewAAirport(event.target.value);
      }}/>
  </div>
  <div class="item">
    <p>Number of Economy Seats</p>
    <input type="number" name="ecoSeats" placeholder="Number of Economy Seats" required onChange={(event) => {
        setNewESeats(event.target.value);
      }}/>
  </div>
  <div class="item">
    <p>Number of Business Class Seats</p>
    <input type="number" name="businessSeats" placeholder="Number of Business Class Seats" required onChange={(event) => {
        setNewBSeats(event.target.value);
      }}/>
  </div>
  <div class="item">
    <div class="btn-block">
      <button onClick={UpdateFlight}>Save</button>
    </div>
</div>
</form>
)

};

export default EditFlight;