import React from 'react'
import './Popup.css'
import Axios from "axios";
//import emailjs from 'emailjs-com';
//import{ init } from 'emailjs-com';

export function Confirmdelete(props) {
//   const sendEmail =(input) =>
// {
//   init("user_apzwfvITShEvLYpHTpF5s");
//   var templateParams = {
//     confirmation_number:input
// };
//    //e.preventDefault();
//    emailjs.send('service_3h110wr','template_ln34t48',templateParams).then(function(response) {
//     console.log('SUCCESS!', response.status, response.text);
//  }, function(error) {
//     console.log('FAILED...', error);
//  });
// }
    const deleteTicket = (confirmation_number, user_id, departure_flight_id, return_flight_id, seatsAID, seatsDID) => {
        console.log(confirmation_number);
        Axios.delete(`http://localhost:3001/deleteticket/${confirmation_number}/${user_id}`);
        props.setTrigger(false);
    
      
        {seatsDID.map(ds=>
                Axios.put("http://localhost:3001/reserveSeat", {
                seatID: ds,
                flightID:departure_flight_id
                 })
          )};
    
    
        {seatsAID.map(as=>
          Axios.put("http://localhost:3001/reserveSeat", {
          seatID: as,
          flightID:return_flight_id
            })
        )};
      //  sendEmail(confirmation_number);
      };
    

  return (props.trigger)? (
    <div className="popup">
      <div className="popup-inner">
        {props.children}
        <h3>Are You Sure You Want To Delete This Ticket</h3>

        <div><button className="close-btn1" onClick={() => deleteTicket(props.delete_ticket, props.user_id  ,
          props.departure_flight_id, props.return_flight_id, props.seatsAID, props.seatsDID )  }> Confirm </button></div>     
             <button className="close-btn" onClick={() => props.setTrigger(false)}>Cancel</button>
      </div>
    </div>
  ) : ("");

    
}