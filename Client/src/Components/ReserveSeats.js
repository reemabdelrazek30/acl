import React from 'react'
import './Popup.css'
import Axios from "axios";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ReserveSeats.css';
import { Fragment } from 'react';
import { useLocation } from "react-router-dom";
// import { PromiseProvider } from 'mongoose';

export default function ReserveSeats(props) {
  let history = useHistory();

  console.log("I'M IN RESERVE SEATS");
  let id = 0;
  if (props.mess === "Please, choose your return flight's seats") {
    id = props.Aid
  }
  else {
    id = props.Did
  }
  // const Aid = query.get("Aid");
  const flightClass = props.flightClass
  const number = props.number
  const priceD = props.priceD;
  const priceA = props.priceA;
  console.log(props + "props reserve page");
  console.log(flightClass);
  const [allSeats, setAllSeats] = useState([]);
  const [selected_seats, setSelectedSeats] = useState([]);
  let selectedSeats = [];

  useEffect(() => {
    console.log("enter nouran in use effect")
    Axios.get(`http://localhost:3001/getSeats/${id}`).
      then((Response) => (setAllSeats((Response.data.flightSeats)), console.log("enteren useeffect  nourannnnnnnnnnnnnn" + Response.data.flightSeats.toString())));
  }, []);

  const select = (id1) => {
    if (document.getElementById(id1).className === "businessSelected") { //button already selected -> deselect
      document.getElementById(id1).className = "businessUnreserved";
      selected_seats.pop(allSeats.at(id1));
      //console.log("deselected button: " + id1);
    }

    else if (document.getElementById(id1).className === "economySelected") { //button already selected -> deselect
      document.getElementById(id1).className = "economyUnreserved";
      selected_seats.pop(allSeats.at(id1));
      //console.log("deselected button: " + id1);
    }

    else if (document.getElementById(id1).className === "economyUnreserved") { //button not selected -> select
      document.getElementById(id1).className = "economySelected";
      selected_seats.push(allSeats.at(id1));
      //console.log(selectedSeats);
      //console.log("deselected button: " + id1);
    }
    else if (document.getElementById(id1).className === "businessUnreserved") { //button not selected -> select
      document.getElementById(id1).className = "businessSelected";
      selected_seats.push(allSeats.at(id1));
      //console.log("deselected button: " + id1);
    }
    //setSelectedSeats(selectedSeats);
    //console.log("select" + selected_seats);
  }

  const reserve = () => {
    console.log("i pressed reserve");
    //console.log(selected_seats);
    console.log(selected_seats.length + "length");
    for (var i = 0; i < selected_seats.length; i++) {
      console.log("i entered reserve for loop");
      Axios.put("http://localhost:3001/reserveSeat", {
        flightID: id,
        seatID: selected_seats[i]._id
      });
    }
    console.log("exit the for loop")
    if (props.mess === "Please, choose your return flight's seats") {
      history.push({//Did={Did} Aid={Aid} flightClass={flightClass} number={number}
        pathname: '/Summary',
        search: '?Did=' + props.Did + '&priceD=' + priceD + '&priceA=' + priceA + '&Aid=' + props.Aid + '&class=' + props.flightClass //+'&number=' //+'&props='+JSON.stringify(prop)+'&clicked='+clicked
      });
    }
    props.setM("Please, choose your return flight's seats")
    props.set(false)
  }
  return (
    <div  /*className="popup"*/>
      {/* <p>selected seats: {selected_seats}</p> */}
      <div> <h1>{props.mess}</h1></div>
      <br />     <br />
      <br />
      <br />
      <br />
      <br />

      <div id="leftDiv" className="sectionLeft"></div>
      <div id="rightDiv" className="sectionRight"></div>
      <div>
        {
          allSeats.map(seat => {
            if (flightClass === "Business") {   //business class map
              if (seat.seatType === "Business") {
                let buttoni = document.createElement("button");
                var statusi = seat.status === "free" ? "businessUnreserved" : "businessReserved";
                buttoni.setAttribute("class", statusi);
                buttoni.setAttribute("id", seat.seatNumber);
                buttoni.innerHTML += seat.seatNumber;
                if (seat.seatNumber % 6 <= 2) {
                  console.log("Button: " + buttoni.id + " in Left Div");
                  document.getElementById("leftDiv").appendChild(buttoni);
                }
                else if (seat.seatNumber % 6 > 2) {
                  console.log("Button: " + buttoni.id + " in Right Div");
                  document.getElementById("rightDiv").appendChild(buttoni);
                }
                buttoni.onclick = function () { select(buttoni.id); };
              }
            }
            else if (flightClass === "Economy") { //economy class map
              if (seat.seatType === "Economy") {
                let buttoni = document.createElement("button");
                var statusi = seat.status === "free" ? "economyUnreserved" : "economyReserved";
                buttoni.setAttribute("class", statusi);
                buttoni.setAttribute("id", seat.seatNumber);
                buttoni.innerHTML += seat.seatNumber;
                if (seat.seatNumber % 8 <= 3) {
                  document.getElementById("leftDiv").appendChild(buttoni);
                }
                else if (seat.seatNumber % 8 > 3) {
                  document.getElementById("rightDiv").appendChild(buttoni);
                }
                buttoni.onclick = function () { select(buttoni.id); };
              }
            }
            console.log("map" + selectedSeats);
          }

          )}


      </div>



      <br></br>
      <div>

        <button className="reserve" onClick={() => reserve()}>Reserve</button>
      </div>
      {/* <button className="close" onClick={() => props.setTrigger(false)}>Cancel</button> */}
    </div>
  );


}