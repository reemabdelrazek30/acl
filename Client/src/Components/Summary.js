// import { useState } from "react";
import Axios from "axios";
import emailjs from 'emailjs-com'
export default function Summary(props) {
  //const [Email , setEmail] = useState("");
  const getUserEmail = () => 
  {
    Axios.get('http://localhost:3001/login').then(Response
    => 
    {
      if (Response.isLoggedIn){
        props.Email = Response.user.Email;
        props.FirstName = Response.user.FirstName;
      }
      else 
        <Login/>
    } ).catch(err => console.log(err))
  }
  const sendEmail = (e) =>
  {
    e.preventDefault();  
    emailjs.send("service_3h110wr",'template_ln34t48',this.props,'user_apzwfvITShEvLYpHTpF5s');
  }
  return (props.trigger ?

    (<div >
      <div id="summary" >


        <table >

          <thead>
            {<tr >
              <th >Flight type</th>
              <th >Flight Number</th>
              <th>Departure Date</th>
              <th>Departure time</th>
              <th>Arrival Date</th>
              <th>Arrival time</th>

              <th>Departure Airport</th>
              <th>Arrival Airport</th>

              <th>Class</th>
              <th>Seats</th>
              <th>Price</th>

            </tr>}
          </thead>
          {/* <br/> */}
          <tbody>
            <tr>
              <th > Departure Flight</th>
              <td > {props.Dflight.Flight_Number} </td>
              <td > {props.Dflight.flight_Departure_Date} </td>
              <td > {props.Dflight.flight_Departure_Time} </td>
              <td > {props.Dflight.flight_Arrival_Date} </td>
              <td > {props.Dflight.flight_Arrival_Time} </td>
              <td > {props.Dflight.flight_Departure_Airport} </td>
              <td > {props.Dflight.flight_Arrival_Airport} </td>
              <td rowSpan="2"> {props.Dflight.Class} </td>
              <td > {props.Dflight.Seats} </td>
              <td > {props.Dflight.Price} </td>
            </tr>
            <tr>
              <th > Arrival Flight</th>
              <td > {props.Aflight.Flight_Number} </td>

              <td > {props.Aflight.flight_Departure_Date} </td>
              <td > {props.Aflight.flight_Departure_Time} </td>
              <td > {props.Aflight.flight_Arrival_Date} </td>
              <td > {props.Aflight.flight_Arrival_Time} </td>
              <td > {props.Aflight.flight_Departure_Airport} </td>
              <td > {props.Aflight.flight_Arrival_Airport} </td>
              <td > {props.Aflight.Seats} </td>
              <td > {props.Aflight.Price} </td>

            </tr>




          </tbody>
          <tfoot>
            <tr>
              <th>Total Price</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{props.Aflight.Price + props.Dflight.Price} </td>
            </tr>
          </tfoot>
        </table>


        <br />



      </div>

    </div>

    ) : ""
  )

}