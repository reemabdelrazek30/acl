import React from 'react'
import './Popup.css'
import Axios from "axios";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ReserveSeats.css';
import { Fragment } from 'react';
import { useLocation } from "react-router-dom";
// import { PromiseProvider } from 'mongoose';

export default function ReserveSeatsN(props) {
    let history = useHistory();

  // console.log("I'M IN RESERVE SEATS");
    // var searchParams = window.location.searchParams;
    // console.log(searchParams.id);
    // const query = new URLSearchParams(useLocation().search);
    // console.log(query);
    const id =props.id;
    const flightClass = props.Class;
    console.log(id);
    console.log(flightClass+"test nouran");
    const [allSeats, setAllSeats] = useState([]);
    const [selected_seats, setSelectedSeats] = useState([]);
    let selectedSeats = [];

    useEffect(() => {
      console.log("enter nouran")
       Axios.get(`http://localhost:3001/getSeats/${props.id}`).
       then((Response) => (setAllSeats((Response.data.flightSeats)), console.log("nourannnnnnnnnnnnnn"+Response.data.flightSeats.toString())));
    },[props.id]);

    const select = (id1) => {
         if (document.getElementById(id1).className === "businessSelected"){ //button already selected -> deselect
            document.getElementById(id1).className = "businessUnreserved";
            selected_seats.pop(allSeats.at(id1));
            //console.log("deselected button: " + id1);
         }
         else if (document.getElementById(id1).className === "economySelected"){ //button already selected -> deselect
            document.getElementById(id1).className = "economyUnreserved";
            selected_seats.pop(allSeats.at(id1));
            //console.log("deselected button: " + id1);
         }
         else if (document.getElementById(id1).className === "economyUnreserved"){ //button not selected -> select
            document.getElementById(id1).className = "economySelected";
            selected_seats.push(allSeats.at(id1));
            //console.log(selectedSeats);
            //console.log("deselected button: " + id1);
         }
         else if (document.getElementById(id1).className === "businessUnreserved"){ //button not selected -> select
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
      //console.log(selected_seats.length);
      for (var i = 0; i < selected_seats.length; i++){
        console.log("i entered reserve for loop");
        Axios.post("http://localhost:3001/reserveSeat",{
          flightID: props.id,
          seatID: selected_seats[i]._id
        });
        console.log('seat '+ selected_seats.at(i).seatNumber + ' reserved');
      }
      props.setTrigger(false);

    //   history.push({
    //     pathname: '/View_Flight',
    //     search:'?SD=true' +'&Class'+flightClass+  '&SA=false'
    // });
    }

     let div1= document.createElement("div")
     let div2= document.createElement("div")
     div1.setAttribute("id","leftDiv")
     div2.setAttribute("id","rightDiv")

  return(

    props.trigger? (<div id="popup1">
            {/* window.onload = newdiv(); */}

      <p>selected seats: {selected_seats}</p>

             {/* <div id="leftDiv" className="sectionLeft"></div>
             <div id="rightDiv" className="sectionRight"></div> */}
             <div>
                 {
                      allSeats.map(seat => 
                        {  
                          console.log(JSON.stringify(seat)+"seat");
                          // console.log(JSON.stringify(document)+"document")
                          // document.getElementById("popup1").appendChild(div1)
                          // document.getElementById("popup1").appendChild(div2)
                           if (flightClass === "Business"){   //business class map
                               if(seat.seatType === "Business"){
console.log("fff");
                                 /* let buttoni = document.createElement("button");
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
                                }*/
                              <div>  <button className="reserve">hellllo </button> </div>
                            }}
                            else /*if (flightClass === "Economy")*/{ //economy class map
                               if(seat.seatType === "Economy"){
                                  // let buttoni = document.createElement("button");
                                  // var statusi = seat.status === "free" ? "economyUnreserved" : "economyReserved";
                                  // buttoni.setAttribute("class", statusi);
                                  // buttoni.setAttribute("id", seat.seatNumber);
                                  // buttoni.innerHTML+=seat.seatNumber;
                                  // if(seat.seatNumber % 8 <= 3) {
                                  //     document.getElementById("leftDiv").appendChild(buttoni);
                                  // }
                                  // else if(seat.seatNumber % 8 > 3) {
                                  //     document.getElementById("rightDiv").appendChild(buttoni);
                                  // }
                                  // buttoni.onclick = function() { select(buttoni.id); };
                                }
                             }
                             console.log("map" + selectedSeats);
                              }
                              
                      )}
                  
                      
                 </div>
              
            
      
        <br></br>
        <div>
          
          <button className="reserve" onClick={() => reserve()}>Reserve</button>
          <button className="close" onClick={() => props.setTrigger(false)}>Cancel</button>
        </div>
       
    </div>
 ):"no pop" )
  
    
}