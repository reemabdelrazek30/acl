// // import React from 'react';
// // import Seatmap from 'react-seatmap';
// // import { useHistory } from 'react-router';
// // import './ReserveSeats.css';

// // export default function(){
// //     let history = useHistory();
// //     return(
// //     <Seatmap rows={25} maxReservableSeats={3} alpha />,
// //     document.getElementById('app')
// // );
// // }
// import React from 'react';
// import Seat from './Seat.js'
// import './Seat.css'
// //import Seatmap from 'react-seatmap';
// import { useHistory } from 'react-router';
// import './ReserveSeats.css';

// export default function ReserveSeats(){
//     //const seatsMap = new map();
//     //const seatsNumber = 10; //just for testing
//     const seatsBool = [false, false, false, false, true, true, true, false, true, false];
//     seatsBool.forEach(showSeat);

//     //function logic

//     // if (seatID % 6 <= 0) --> 
//     //    add button to the right div
//     //    check if it's reserved or not and based on that choose the color
//     //     
//     // else if (seatID % 6 <= 3) --> 
//     //    add button to the left div
//     //    check if it's reserved or not and based on that choose the color
//     //
//     // else --> 
//     //    add button to the right div
//     //    check if it's reserved or not and based on that choose the color


//     function showSeat(index, arr){
//         if(arr[index]){
//             <button class = "reserved" id={index}></button>
//         }
//         else{
//             <button class = "unreserved" id={index} data-isReserved="false" data-isSelected="false" onClick="reserveSeat()"></button>
//         }
//     }
//     function reserveSeat(){
//            // data-isSelected = "true";
//            // data
//     }
// }
import React from 'react'
import './Popup.css'
import Axios from "axios";
import { useState, useEffect } from 'react';
import './ReserveSeats.css';
import { Fragment } from 'react';

export function ReserveSeats(props) {
  const [allSeats, setAllSeats] = useState([]);
 /// const reserveSeat = (id) => {
 //   Axios.get(`http://localhost:3001/getSeats/${id}`);
    // reserveSeat(props.flight._id)
   const id = props.flight._id;
  // console.log(props.flight._id);
  //  console.log("I'M IN RESERVE SEATS");
    useEffect(() => { Axios.get(`http://localhost:3001/getSeats/${id}`).then((Response) => setAllSeats(Response.data.flightSeats))
    });
   console.log(allSeats);
 // };

  return (props.trigger? (
    <div className="popup">
      <div className="popup-inner">
          <div>
             <div className="sectionLeft">
                 <div>here
                      {
                          allSeats.map(seat => 
                           {  console.log(seat.seatNumber);
                              if (seat.seatNumber % 6 <= 2){
                                if (seat.status === "free"){
                                  console.log("hereeeeeeeee");
                                  <Fragment>
                                  <button>ay text</button>
                                  <button className = "unreserved">{seat.seatNumber}</button>
                                  </Fragment>
                                }
                                else {
                                  <button className = "reserved">{seat.seatNumber}</button>
                                }
                              }
                              if (seat.seatNumber % 6 === 2){
                                <br></br>
                              }
                           }
                          )
                       }
                 </div>
              </div>
             <div className="sectionRight">
                 <div>right here
                   {
                          allSeats.map(seat => 
                           {console.log(seat);
                              if (seat.seatNumber % 6 > 2){
                                if (seat.status === "free"){
                                  <Fragment>
                                  <button className = "unreserved">{seat.seatNumber}</button>
                                  </Fragment>
                                }
                                else {
                                  <button className = "reserved">{seat.seatNumber}</button>
                                }
                              }
                              if (seat.seatNumber % 6 === 5){
                                <br></br>
                              }
                           }
                          )
                       }
                 </div>
             </div>
        </div>
        <br></br>
        <div><button className="close-btn1" /*onClick={() => reserveSeat(props.flight._id)}*/>Reserve</button></div>
        <button className="close" onClick={() => props.setTrigger(false)}>Cancel</button>
      </div>
    </div>
  ) : (""));

    
}