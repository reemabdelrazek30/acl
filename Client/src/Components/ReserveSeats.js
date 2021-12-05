import React from 'react'
import WrongSeats from './WrongSeats';
import './Popup.css'
import Axios from "axios";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ReserveSeats.css';
import { Fragment } from 'react';
import Summary from "./Summary";

// import { useLocation } from "react-router-dom";
// // import { PromiseProvider } from 'mongoose';

export default function ReserveSeats(props) {
    // let history = useHistory();

  console.log("I'M IN RESERVE SEATS");
    
    let id = 0;
    if(props.mess==="Please, choose your return flight's seats"){
      id=props.Aid
      console.log("line 26")
    }
    else{
      id=props.Did
      console.log("line 30")

    }
   
    const flightClass = props.flightClass
    const number=props.number
    // const priceD=props.priceD;
    // const priceA=props.priceA;
    console.log(props+"props reserve page");
    console.log(flightClass);
    console.log(id+          "              id");
    const [allSeats, setAllSeats] = useState([]);
    const [selected_seats, setSelectedSeats] = useState([]);
    // const [selected_seatsN, setSelectedSeatsN] = useState([]);
    // const [noSeats,setNoSeats]=useState(false)
let selected_seatsN=[]
let selected_seatsNID=[]
let selected_seatsNIDA=[]
let selected_seatsNIDD=[]


let selectedD=[]
let selectedA=[]

    let selectedSeats = [];
    const [clicked,setClicked]=useState(false)
    const [wrongSeatsTrigger, setWrongSeatsTrigger] = useState(false);
    console.log(JSON.stringify(selected_seats)+"selected_seats in the start to the page")

    useEffect(() => {
      console.log("enter nouran in use effect")
       Axios.get(`http://localhost:3001/getSeats/${id}`).
       then((Response) => (setAllSeats((Response.data.flightSeats)),  console.log("enteren useeffect  nourannnnnnnnnnnnnn"+Response.data.flightSeats.toString())));
    },[id]);

    const select = (id1) => {
         if (document.getElementById(id1).className === "businessSelected"){ //button already selected -> deselect
            document.getElementById(id1).className = "businessUnreserved";
            selected_seats.pop(allSeats.at(id1));
            if(props.mess==="Please, choose your return flight's seats"){
              selectedA.pop(allSeats.at(id1).seatNumber)
              selected_seatsNIDA.pop(allSeats.at(id1)._id)
            }
            else{
              selectedD.pop(allSeats.at(id1).seatNumber)
              selected_seatsNIDD.pop(allSeats.at(id1)._id)

            }
            //console.log("deselected button: " + id1);
         }
         else if (document.getElementById(id1).className === "economySelected"){ //button already selected -> deselect
            document.getElementById(id1).className = "economyUnreserved";
            selected_seats.pop(allSeats.at(id1));
            if(props.mess==="Please, choose your return flight's seats"){
              selectedA.pop(allSeats.at(id1).seatNumber)
              selected_seatsNIDA.pop(allSeats.at(id1)._id)
            }
            else{
              selectedD.pop(allSeats.at(id1).seatNumber)
              selected_seatsNIDD.pop(allSeats.at(id1)._id)

            }
            //console.log("deselected button: " + id1);
         }
         else if (document.getElementById(id1).className === "economyUnreserved"){ //button not selected -> select
            document.getElementById(id1).className = "economySelected";
            selected_seats.push(allSeats.at(id1));
            //console.log(selectedSeats);
            if(props.mess==="Please, choose your return flight's seats"){
              selectedA.push(allSeats.at(id1).seatNumber)
              selected_seatsNIDA.push(allSeats.at(id1)._id)
            }
            else{
              selectedD.push(allSeats.at(id1).seatNumber)
              selected_seatsNIDD.push(allSeats.at(id1)._id)

            }
            //console.log("deselected button: " + id1);
         }
         else if (document.getElementById(id1).className === "businessUnreserved"){ //button not selected -> select
            document.getElementById(id1).className = "businessSelected";
            selected_seats.push(allSeats.at(id1));
            //console.log("deselected button: " + id1);
            if(props.mess==="Please, choose your return flight's seats"){
              selectedA.push(allSeats.at(id1).seatNumber)
              selected_seatsNIDA.push(allSeats.at(id1)._id)
            }
            else{
              selectedD.push(allSeats.at(id1).seatNumber)
              selected_seatsNIDD.push(allSeats.at(id1)._id)

            }
         }
        //setSelectedSeats(selectedSeats);
        //console.log("select" + selected_seats);
        console.log(JSON.stringify(selected_seats)+"selected_seats in the select method")
    }
    
   
      const reserve = () => {
        console.log("we are in the reserve method")
       console.log(JSON.stringify(selected_seats)+"selected_seats")
        //  if (selected_seats.length===0){
        //   setWrongSeatsTrigger(true);
        //     setNoSeats(true)

        // }
     //  else
        if (selected_seats.length !== props.number){
            setWrongSeatsTrigger(true);
        }
else
      {console.log("i pressed reserve");
      //console.log(selected_seats);
      console.log(selected_seats.length+"length");
      for (var i = 0; i < selected_seats.length; i++){
        selected_seatsN.push(selected_seats[i].seatNumber)
        // if(props.mess==="Please, choose your return flight's seats"){

        // }
        selected_seatsNID.push(selected_seats[i]._id)
        console.log("i entered reserve for loop");
        Axios.put("http://localhost:3001/reserveSeat",{
          flightID: id,
          seatID: selected_seats[i]._id
        },[]);//const priceD=props.priceD;
       
        console.log(JSON.stringify(selected_seatsN)+"inside the for loop")
        
      }
      if(  !wrongSeatsTrigger)
      {
        console.log("دخل الاف يالهوووووى")
        console.log("exit the for loop")
      if(props.mess==="Please, choose your return flight's seats"){
     
      console.log("props.mess===Please, choose your return flight's seats")
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
      else{
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
  return(
  
    <div  /*className="popup"*/>
      {/* <p>selected seats: {selected_seats}</p> */}
      { console.log(selected_seats+"        selected")}
      { console.log(wrongSeatsTrigger+"        WrongSeats")}
      { console.log(wrongSeatsTrigger+"        WrongSeats")}

      {/* { console.log(noSeats+"        noSeats")} */}

     <div> <h1>{props.mess}</h1></div>
     <br/>     <br/>
     <br/>
     <br/>
     <br/>
     <br/>

             <div id="leftDiv" className="sectionLeft"></div>
             <div id="rightDiv" className="sectionRight"></div>
             <div>
                 {
                      allSeats.map(seat => 
                        {  
                           if (flightClass === "Business"){   //business class map
                               if(seat.seatType === "Business"){
                                  let buttoni = document.createElement("button");
                                  var statusi = seat.status === "free" ? "businessUnreserved" : "businessReserved";
                                  buttoni.setAttribute("class", statusi);
                                  buttoni.setAttribute("id", seat.seatNumber);
                                  buttoni.innerHTML+=seat.seatNumber;
                                  if(seat.seatNumber % 6 <= 2) {
                                      console.log("Button: " + buttoni.id + " in Left Div");
                                      document.getElementById("leftDiv").appendChild(buttoni);
                                  }
                                  else if(seat.seatNumber % 6 > 2) {
                                    console.log("Button: " + buttoni.id + " in Right Div");
                                      document.getElementById("rightDiv").appendChild(buttoni);
                                  }
                                 buttoni.onclick = function() { select(buttoni.id); };
                                }
                            }
                            else if (flightClass === "Economy"){ //economy class map
                               if(seat.seatType === "Economy"){
                                  let buttoni = document.createElement("button");
                                  var statusi = seat.status === "free" ? "economyUnreserved" : "economyReserved";
                                  buttoni.setAttribute("class", statusi);
                                  buttoni.setAttribute("id", seat.seatNumber);
                                  buttoni.innerHTML+=seat.seatNumber;
                                  if(seat.seatNumber % 8 <= 3) {
                                      document.getElementById("leftDiv").appendChild(buttoni);
                                  }
                                  else if(seat.seatNumber % 8 > 3) {
                                      document.getElementById("rightDiv").appendChild(buttoni);
                                  }
                                  buttoni.onclick = function() { select(buttoni.id); };
                                }
                             }
                             console.log("map" + selectedSeats);
                              }
                              
                      )}
                  
                      
                 </div>
              
            
      
        <br></br>
        <div>
          
          <button className="reserve" onClick={ reserve}>Reserve</button>
        </div>
        <WrongSeats trigger={wrongSeatsTrigger}  setTrigger={setWrongSeatsTrigger}></WrongSeats>
      
    </div>
  );


}