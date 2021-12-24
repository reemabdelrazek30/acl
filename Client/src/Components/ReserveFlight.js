//inport {useState} from 'react'
import { useEffect, useState } from "react";
import View_FLight from "./ViewFlight";
import axios from 'axios';
import {Login} from './Login'
import './ReserveFlight.css';
export default function Reserve_FLight() {
  // const [currentDate,setCurrentDate]=useState('')
  const current = new Date();
  let date;
  // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
  if (current.getDate() < 10) {
    date = `${current.getFullYear()}-${current.getMonth() + 1}-0${current.getDate()}`;
    if ((current.getMonth() + 1) < 10) {
      date = `${current.getFullYear()}-0${current.getMonth() + 1}-0${current.getDate()}`;
    }
  }
  // setCurrentDate(date)
  const [info, setInfo] = useState({
    Departure_date: date,
    Arrival_date: date,
    Arrival_airport: '',
    Departure_airport: '',
    N_childern: 0,
    N_adult: 1,
    Class: "Economy"
  });
  const [infoS, setInfoS] = useState({

  });
  const [showComponent, setShowComponent] = useState(false)
  const [show, setShow] = useState(true)
  const [clicked, setClicked] = useState(false)
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInfo((previnfo) => ({
      ...previnfo,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setClicked((prev) => prev ? false : true)
    setShowComponent(true)
    setInfoS(info);
    setShow(false)
    alert(JSON.stringify(info, '', 2));
  };
  axios.defaults.withCredentials = true;
  const [isLoggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
   
    axios.get("http://localhost:3001/login").then(response => {
      console.log("nouran_reem");
      if (response.data.loggedIn)
        setLoggedIn(true);
    })
  
},[])
  return (
    <div className="bannersReserveFlight" >
      {show ? (
      <div className="containerReserveFlight">
        <br /> <br />
        <h1 className="h1ReserveFlight">Reserve A Flight</h1>
        <br /> 
      <div id="booking">
        {/* <div className="banner"> */}
        <form className="formReserveFlights" onSubmit={handleSubmit}>
          <div className="divReserveFlight">
          <label for="Departure_airport">Departure Airport</label>
          <input className="inputReserveFlight"
            id="Departure_airport"
            value={info.Departure_airport || ''}
            onChange={handleChange}
            name="Departure_airport"
            type="text"
            placeholder="Departure Airport" required
          />
          <label for="Departure_date">Departure Date</label>
          <input id="Departure_date"
          className="inputReserveFlight"
            value={info.Departure_date}
            onChange={handleChange}
            type="date" min={date}
            name="Departure_date"
            placeholder={date}
          />
          </div>
          <div className="divReserveFlight">
          <label for="Arrival_airport">Arrival Airport </label>
          <input id="Arrival_airport"
            className="inputReserveFlight"
            value={info.Arrival_airport || ''}
            onChange={handleChange}
            type="text"
            name="Arrival_airport"
            placeholder="Arrival Airport " required
          />
          <label for="Arrival_date">Return Date</label>
          <input id="Arrival_date"
          className="inputReserveFlight"
            value={info.Arrival_date}
            onChange={handleChange} min={info.Departure_date}
            type="date"
            name="Arrival_date"
            placeholder={date}
          />
          </div>
          <div className="divReserveFlight">
          <label for="N_childern">Number of Children</label>
          <input id="N_childern"
          className="inputReserveFlightNumber"
            value={info.N_childern} min="0"
            onChange={handleChange}
            type="number"
            name="N_childern"
            placeholder="Number of Children"
          />
          </div>
          <div>
          <label for="N_adult">Number of Adults</label>
          <input id="N_adult"
            className = "inputReserveFlightNumber"
            value={info.N_adult || 1} min="1"
            onChange={handleChange}
            type="number"
            name="N_adult"
            placeholder="Number of Adults"
          />
          </div>
          <div className="rowDiv">
          <label>Class</label>
          <select name="Class" className="inputReserveFlightNumber" id="class" value={info.Class} onChange={handleChange}>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
          </select>
          </div>
          <button className="buttonReserveFlight" type="submit">Search</button>
        </form>
        </div>
       </div>
      ) : ""}        <br />


      {showComponent ? <View_FLight user= {isLoggedIn} show={show} set={setShow} info={infoS} clicked={clicked} /> : null}
      {/* {setShowComponent(false)} */}

    </div>
  );

}