import React from 'react'
import WrongSeats from './WrongSeats';
import './Popup.css'
import Axios from "axios";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ReserveSeats.css';
import { Fragment } from 'react';
import Summary from "./Summary";
import { Confirmupdateflight } from "./Confirmupdateflight";


import seats from './seat'

import { useLocation } from "react-router-dom";
// // import { PromiseProvider } from 'mongoose';

export default function ReserveSeats(props) {
  const [buttonpopup, setbuttonpopup] = useState(false);
  const [newseatsfornewflight, setnewseatsfornewflight] = useState([]);
  const [allSeats, setAllSeats] = useState([]);
  const [selected_seats, setSelectedSeats] = useState([]);
  let selected_seatsN = []
  let selected_seatsNID = []
  let selected_seatsNIDA = []
  let selected_seatsNIDD = []
  let selectedD = []
  let selectedA = []
  let history = useHistory();
  const location = useLocation();
  let number = props.number
  let id = 0;
  let flightClass = props.flightClass
  let selectedSeats = [];
  const [clicked, setClicked] = useState(false)
  const [wrongSeatsTrigger, setWrongSeatsTrigger] = useState(false);
  if (location.state.number != undefined) {
    console.log(JSON.stringify(location) + "looooooo")
    flightClass = location.state.classT;
    id = location.state["id"];
    console.log(id + "              id");
    number = location.state["number"];
  } else {
    if (props != undefined) {
      if (props.mess === "Please, choose your return flight's seats") {
        id = props.Aid
        console.log("line 26")
      }
      else {
        id = props.Did
        console.log("line 30")

      }
    }
    // console.log(JSON.stringify(selected_seats) + "selected_seats in the start to the page")
    // console.log("clicked" + clicked)
    // console.log(flightClass + "flight class")
    // console.log(id + "id")
    useEffect(() => {
      console.log("enter nouran in use effect")
      Axios.get(`http://localhost:3001/getSeats/${id}`).
        then((Response) => (setAllSeats((Response.data.flightSeats)), console.log("enteren useeffect  nourannnnnnnnnnnnnn" + JSON.stringify(Response.data.flightSeats) + Response.data.flightSeats.length)));
    }, [id, flightClass]);

    const select = (id1) => {
      if (document.getElementById(id1).className === "businessSelected") { //button already selected -> deselect
        document.getElementById(id1).className = "businessUnreserved";
        selected_seats.pop(allSeats.at(id1));
        if (props.mess === "Please, choose your return flight's seats") {
          selectedA.pop(allSeats.at(id1).seatNumber)
          selected_seatsNIDA.pop(allSeats.at(id1)._id)
        }
        else {
          selectedD.pop(allSeats.at(id1).seatNumber)
          selected_seatsNIDD.pop(allSeats.at(id1)._id)

        }
        //console.log("deselected button: " + id1);
      }
      else if (document.getElementById(id1).className === "economySelected") { //button already selected -> deselect
        document.getElementById(id1).className = "economyUnreserved";
        selected_seats.pop(allSeats.at(id1));
        if (props.mess === "Please, choose your return flight's seats") {
          selectedA.pop(allSeats.at(id1).seatNumber)
          selected_seatsNIDA.pop(allSeats.at(id1)._id)
        }
        else {
          selectedD.pop(allSeats.at(id1).seatNumber)
          selected_seatsNIDD.pop(allSeats.at(id1)._id)

        }
        //console.log("deselected button: " + id1);
      }
      else if (document.getElementById(id1).className === "economyUnreserved") { //button not selected -> select
        document.getElementById(id1).className = "economySelected";
        selected_seats.push(allSeats.at(id1));
        //console.log(selectedSeats);
        if (props.mess === "Please, choose your return flight's seats") {
          selectedA.push(allSeats.at(id1).seatNumber)
          selected_seatsNIDA.push(allSeats.at(id1)._id)
        }
        else {
          selectedD.push(allSeats.at(id1).seatNumber)
          selected_seatsNIDD.push(allSeats.at(id1)._id)

        }
        //console.log("deselected button: " + id1);
      }
      else if (document.getElementById(id1).className === "businessUnreserved") { //button not selected -> select
        document.getElementById(id1).className = "businessSelected";
        selected_seats.push(allSeats.at(id1));
        //console.log("deselected button: " + id1);
        if (props.mess === "Please, choose your return flight's seats") {
          selectedA.push(allSeats.at(id1).seatNumber)
          selected_seatsNIDA.push(allSeats.at(id1)._id)
        }
        else {
          selectedD.push(allSeats.at(id1).seatNumber)
          selected_seatsNIDD.push(allSeats.at(id1)._id)

        }
      }
      //setSelectedSeats(selectedSeats);
      //console.log("select" + selected_seats);
      //   console.log(JSON.stringify(selected_seats)+"selected_seats in the select method")
    }

        // ));
      const reserve = () => {
        console.log(JSON.stringify(selected_seats)+"selected_seats in the reserve method")
        if(location.state.number!=undefined){
          // location.state.set((pre)=>(
          //   true?false:true
          console.log("number"+number);

           if (selected_seats.length !== number){
             console.log("selected_seats.length !== number")
            setWrongSeatsTrigger(true);
        }
else
      {
        console.log("i pressed reserve");
      console.log("selected seat:"+selected_seats);
      console.log(selected_seats.length+"length");
      for (var i = 0; i < selected_seats.length; i++){
        selected_seatsN.push(selected_seats[i].seatNumber)

        // }
        selected_seatsNID.push(selected_seats[i]._id)
        console.log("i entered reserve for loop");
        Axios.put("http://localhost:3001/reserveSeat",{
          flightID: id,
          seatID: selected_seats[i]._id,
          flightClass: flightClass


        });//const priceD=props.priceD;

        console.log(JSON.stringify(selected_seatsN)+"inside the for loop")
        console.log([selected_seatsN]+"inside the for loop without stringfy")
      }
      console.log(JSON.stringify(selected_seatsN)+"before axios")
      console.log([].push(...selected_seatsN)+"before axios")
      if (location.state.confirm === true) {
        if (location.state.flag == "return") {
          Axios.post("http://localhost:3001/updateSeats", { newSeats: selected_seatsN, type: "returnF", Confirmation_number: location.state.confirmation_number, })
        } else {
          Axios.post("http://localhost:3001/updateSeats", { newSeats: selected_seatsN, type: "departF", Confirmation_number: location.state.confirmation_number, })
        }
      } else {

        Axios.post("http://localhost:3001/updateSeats", {
          flightID: id,
          newSeats: selected_seatsN,
          userid: location.state.user,
          type: location.state.flightType,
          Confirmation_number: location.state.conf,
        }).then(
          history.goBack())
      }
        setbuttonpopup(true);
        setnewseatsfornewflight(JSON.stringify(selected_seatsN));
      Axios.post("http://localhost:3001/updateSeats", {
        flightID:id,
        newSeats:selected_seatsN,
        userid: location.state.user ,
          type:location.state.flightType,
Confirmation_number:location.state.conf,

})
.then( history.goBack())

      }

          // ));
          /*
app.post("/updateSeats", async (req, res) => {
        console.log("entered..confirm");
        console.log(JSON.stringify(req.body) + "confirm booking");
        const flightID= req.body.flightID
        const newSeats=req.body.newSeats

        const number = req.body.Confirmation_number

        const userid=req.body.userid
          */


      }
      else {
        console.log("we are in the reserve method")
        console.log(JSON.stringify(selected_seats) + "selected_seats")
        //  if (selected_seats.length===0){
        //   setWrongSeatsTrigger(true);
        //     setNoSeats(true)

        // }
        //  else
        if (selected_seats.length !== number) {
          setWrongSeatsTrigger(true);
        }
        else {
          for (var i = 0; i < selected_seats.length; i++) {
            selected_seatsN.push(selected_seats[i].seatNumber)
            // if(props.mess==="Please, choose your return flight's seats"){

            // }
            selected_seatsNID.push(selected_seats[i]._id)
            console.log("i entered reserve for loop");
            Axios.put("http://localhost:3001/reserveSeat", {
              flightID: id,
              seatID: selected_seats[i]._id,
              flightClass: flightClass
            });//const priceD=props.priceD;

            // console.log(JSON.stringify(selected_seatsN)+"inside the for loop")

          }
          if (!wrongSeatsTrigger) {
            // console.log("دخل الاف يالهوووووى")
            //console.log("exit the for loop")
            if (props.mess === "Please, choose your return flight's seats") {

              // console.log("props.mess===Please, choose your return flight's seats")
              props.setM("")
              // trigger3={trigger3} setT3={setTrigger3}//

              // props.setT3(false)
              // props.setT2(true)
              // props.setT(false)
              setWrongSeatsTrigger(false)
              // setNoSeats(false)
              // setClicked(true)
              props.setSeatsA(selected_seatsN)
              props.setSeatsAID(selected_seatsNID)

              props.set(true)
              props.setB(true)
            }
            else {
              console.log("else part")
              props.setM("Please, choose your return flight's seats")
              props.setSeatsD(selected_seatsN)
              props.setSeatsDID(selected_seatsNID)

              // const [selected_seats, setSelectedSeats] = useState([]);
              setSelectedSeats([])

              setWrongSeatsTrigger(false)
              // setNoSeats(false)


              // props.set(false)
            }
          }
        }

      }
    }
    return (

<<<<<<< HEAD
      <div  /*className="popup"*/>
=======
    <div id="seats">
          {/* <p>selected seats: {selected_seats}</p> */}
>>>>>>> origin/nouran
          {console.log(selected_seats + "        selected")}
          {console.log(wrongSeatsTrigger + "        WrongSeats")}
          {console.log(wrongSeatsTrigger + "        WrongSeats")}
          <div> <h1>{props.mess}</h1></div>
          <br />     <br />
          <br />
          <br />
          <br />
          <br />
          <div id="nouran" ></div>
          <div id="leftDiv" className="sectionLeft"></div>





          <div id="leftDiv" className="sectionLeft"></div>
          <div id="rightDiv" className="sectionRight"></div>
          <div>
            {
              allSeats.map(seat => {

                console.log(JSON.stringify(seat))

                if (flightClass === "Business") {   //business class map
                  console.log("entbuss1")
                  if (seat.seatType === "Business") {
                    console.log("entbuss2")
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
                  console.log("enteco1")
                  if (seat.seatType === "Economy") {
                    console.log("enteco2")
                    let buttoni = document.createElement("button");
                    var statusi = seat.status === "free" ? "economyUnreserved" : "economyReserved";
                    buttoni.setAttribute("class", statusi);
                    buttoni.setAttribute("id", seat.seatNumber);
                    buttoni.innerHTML += seat.seatNumber;
                    console.log(" document.getElementById()", document.getElementById("rightDiv"));
                    if (seat.seatNumber % 8 <= 3) {
                      console.log("Button: " + buttoni.id + " in left Div");
                      document.getElementById("leftDiv").appendChild(buttoni);
                    }
                    else if (seat.seatNumber % 8 > 3) {
                      console.log("Button: " + buttoni.id + " in Right Div");
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

            <button className="reserve" onClick={reserve}>Reserve</button>
          </div>
          <WrongSeats trigger={wrongSeatsTrigger} setTrigger={setWrongSeatsTrigger}></WrongSeats>
          <Confirmupdateflight trigger={buttonpopup} setTrigger={setbuttonpopup} seats={newseatsfornewflight}
            allinfo={location.state}   ></Confirmupdateflight>
        </div>
        );


}