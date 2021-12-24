import React from 'react';
import { useLocation,useHistory } from 'react-router-dom';
import { useState, useEffect } from "react"
import Axios from 'axios'



function Viewavailabledepflights() {
    const location = useLocation();
    let history = useHistory();

    const[flight,setflight]= useState([]);
    const [id_duration, setId_duration] = useState({})
    const [showMoreInfo, setShowMoreInfo] = useState({});
    const [confirm , setconfirm] = useState(true);

    const chosen_class = location.state.info.Class;

    useEffect(()=>{
        Axios.post("http://localhost:3001/get_flitered_dep_flights",{
            TotalPrice:location.state.TotalPrice,
            depflightairport:location.state.depflightairport,
            arrivalflightairport:location.state.Aflightairport,
            chosen_class:location.state.info.Class,
            chosen_dep_date:location.state.info.Departure_date,
        }).then((Response) => {
            setflight(Response.data);
        })
    },[]);
    const reserve_seat_redirect=(flightid,flightnumber,depdate,deptime,arrivaldate,arrivaltime,depairport,arrivalairport,flightprice) =>{
      //  setconfirm(true);
        console.log( "here  "+confirm);
        history.push({
            pathname: '/ReserveSeats',
            state: { classT: chosen_class , id:flightid, number:location.state.N_adults+location.state.N_children, confirm:confirm ,
            confirmation_number:location.state.conf,
            flightnumber:flightnumber,
            depdate:depdate, deptime:deptime, depairport: depairport,
            arrivaldate:arrivaldate, arrivaltime:arrivaltime, arrivalairport:arrivalairport,
            flightprice:flightprice,
            user_id:location.state.user_id,
            olddepflight_id:location.state.olddepflight_id
            
         },
            
        });
    }

    const handelClickingRow = (id, date1, date2, a, b) => {
        console.log("row clicked" + id)
        getDuration(id, date1, date2, a, b)
        let new_value;
        if (showMoreInfo[id]) {
          new_value = showMoreInfo[id] ? false : true;
        }
        else {
          new_value = true;
        }
        setShowMoreInfo((prev) => (
    
          { ...prev, [id]: new_value }))
       // console.log("test" + JSON.stringify(showMoreInfo)) // to see the new values i should go out of the method
      }

    const getDuration = (id, date1, date2, a, b) => {
        let date1n = date1.substring(0, 10)
        let date2n = date2.substring(0, 10)
        //  let d1= Date.parse(date1 )
        //  let d2=Date.parse(date2 )
        // let ms=d2-d1
        let d = 24 * 60 * 60
        let h = 60 * 60
        let m = 60
        var dat1 = new Date(date1n + " " + a + ":00");
        var dat2 = new Date(date2n + " " + b + ":00");
        //diff will be the number of milliseconds between the two times.
        var diff = Math.abs(dat2 - dat1);
      //  let test = diff / 1000 / 60 / 60
        let rms = diff;
        // let rms=diff+ms;
        let rs = rms / 1000
        let Days = Math.floor(rs / d)
        rs = rs % d
        let Hours = Math.floor(rs / h)
        rs = rs % h
        let Minutes = Math.floor(rs / m)
        let Seconds = rs % 60
        let result = { Days, Hours, Minutes, Seconds };
    
    
        //   var a="14:10";
        // var b="19:02";
    
    
        setId_duration((prev) => (
          { ...prev, [id]: result }
        ))
      }


    return(
        <div>
        <h2>Select departure flight</h2>

  <>
    <table >

      <thead>
        {<tr >

          <th >Flight Number</th>
          <th>Departure Date</th>
          <th>Departure time</th>
          <th>Arrival Date</th>
          <th>Arrival time</th>

          <th>Departure Airport</th>
          <th>Arrival Airport</th>
          <th> Price Difference</th>
        </tr>}
      </thead>
      <br />
      <tbody>
        {
          flight.map((flight) => (
            < >
               <tr key={flight._id} onClick={() => { handelClickingRow(flight._id, flight.Departure_Date, flight.Arrival_Date, flight.Departure_Time, flight.Arrival_Time) }}>
              
                <td > {flight.Flight_Number} </td>
                <td > {flight.Departure_Date} </td>
                <td > {flight.Departure_Time} </td>
                <td > {flight.Arrival_Date} </td>
                <td > {flight.Arrival_Time} </td>
                <td > {flight.Departure_Airport} </td>
                <td > {flight.Arrival_Airport} </td>
                <td>{(flight.price_adult *location.state.N_adults + flight.price_child*location.state.N_children )-location.state.TotalPrice}</td>

                <td > 
                    <button  >Select Flight </button>

                </td>
              </tr>

              <br />
                {showMoreInfo[flight._id] ? (

                <tr typeof="a" /*id="diplay_flight_info"*/>
                <td colSpan="3"> Flight Duration:  {JSON.stringify(id_duration[flight._id])}  </td>
                <td colSpan="3">  Baggage Allowance.:  {flight.baggage} </td>
                <button onClick={()=>reserve_seat_redirect(flight._id,flight.Flight_Number,flight.Departure_Date,flight.Departure_Time,
                    flight.Arrival_Date,flight.Arrival_Time,flight.Departure_Airport,flight.Arrival_Airport,
                    (flight.price_adult *location.state.N_adults + flight.price_child*location.state.N_children )
                    )}>Choose Seat</button>
                

                <br />



                </tr>
                ) : <br />}

              <br />
            </>
          ))
        }
      </tbody>
    </table>
  </>
  {/* <ReserveSeats Did={flightid} 
        flightClass={chosen_class}  number={location.state.N_adults + location.state.N_children} 
        /> */}
  <p></p>

        </div>
    )
}


export default Viewavailabledepflights;