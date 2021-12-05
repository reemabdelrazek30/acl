import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Axios from "axios";

export default function Summary (){
  const query = new URLSearchParams(useLocation().search);
  //      search:'?Did=' + depatureFlight["id"]+'Aid=' + arrivalFlight["id"]+ '&class='+prop.Class +'&number='+ (props.info.N_childern+props.info.N_adult) //+'&props='+JSON.stringify(prop)+'&clicked='+clicked
/*
 history.push({//Did={Did} Aid={Aid} flightClass={flightClass} number={number}
            pathname: '/Summary_reserved_flights',
  search:'?Did=' + props.Did+  '&priceD='+priceD +'&priceA='+priceA+'&Aid=' + props.Aid+ '&class='+props.flightClass //+'&number=' //+'&props='+JSON.stringify(prop)+'&clicked='+clicked
        });
*/
  console.log(query+"  ضعثقغ هى قثسثقرث حشلث");
  // const Did = query.get("Did");
  // const Aid = query.get("Aid");
  // const flightClass = query.get("class");
  // // const number=query.get("number");
  // const priceD=query.get("priceD");
  // const priceA=query.get("priceA");
const [departure_fligth,setDeparture_flight]=useState({})
const [arrival_fligth,setArrival_fligth]=useState({})
const [con_Number,setCon_Number]=useState('')
const [clicked,set_clicked]=useState(false)


// useEffect(()=>{
//   Axios.get("http://localhost:3001/confirmition_number",{
//     }).then((Response) => {
//       setCon_Number(Response.data);
//       // setPop(true)
//            console.log("enterd confirmation number"+"  axios"+JSON.stringify(con_Number)+JSON.stringify(Response.data)) })
          
// },[])

// useEffect(() => { Axios.post("http://localhost:3001/get_flights",{

  

    
//     id: Did


//   }).then((Response) => {setDeparture_flight(Response.data)
//   console.log("enterd front  "+"  axios"+JSON.stringify(Response.data ) )
  

// }) },[]);

// useEffect(() => { Axios.post("http://localhost:3001/get_flights",{

  

    
//     id: Aid


//   }).then((Response) => {setArrival_fligth(Response.data)
//   console.log("enterd front  "+"  axios"+JSON.stringify(Response.data ) )
  

// }) },[]);


// //   const handle_final_booking=()=>{

// // Axios.post("http://localhost:3001/confirm_booking",{

// //   Departure_flight:props.Dflight,
// //   Arrival_flight:props.Aflight,

// // Total_price:(props.Aflight.Price+props.Dflight.Price),
// // Class:props.Aflight.Class,
// // Departure_seats:props.Dflight.Seats,
// // Arrival_seats:props.Aflight.Seats
  


// //   }).then((Response) => 
// //   console.log("enterd front  3"+"  axios"+JSON.stringify(props.Dflight) )) 
  
    
   
    


// //   }

// const hadel_serving=()=>{
//   Axios.post("http://localhost:3001/confirm_booking",{
  
//     Departure_flight:departure_fligth,
//     Arrival_flight:arrival_fligth,
  
//   Total_price:(priceD+priceA),
//   Class:flightClass,
//   Departure_seats:[1,2],
//   Arrival_seats:[1,2],
//   Confirmation_number:con_Number
      
  
  
//     }).then((Response) => 
//     console.log("enterd front  3"+"  axios"+JSON.stringify(arrival_fligth) )) 
//     // button_content==='Proceed to payment'
//     // setButton_content('Proceed to payment')
//     // setshow_departure_button(false)
//     // setshow_return_button(true)
//     set_clicked(true)
// }

    return( 

<div >
  <div id="summary" >
    <p>{arrival_fligth}+"--arra"</p>
    <p>{departure_fligth}+"--dep"</p>
    <p>]ogjjjjjjjjjjjjjjjjjjjjj</p>


   {/* {clicked?( <h1> Your Confirmation code is {con_Number}</h1>):""} */}


<table >

        <thead>
          <tr >
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
           
          </tr>
        </thead>
       
        <tbody>

      
     
        <tr>
        <th > Departure Flight</th>
        <td > {departure_fligth["Flight_Number"]} </td>
        <td > {departure_fligth["Departure_Date"]} </td>
        <td > {departure_fligth["Departure_Time"]} </td>
        <td > {departure_fligth["Arrival_Date"]} </td>
        <td > {departure_fligth["Arrival_Time"]} </td>
        <td > {departure_fligth["Departure_Airport"]} </td>
        <td > {departure_fligth["Arrival_Airport"]} </td>
        {/* <td rowSpan="2"> {flightClass} </td> */}
        {/* <td > {JSON.stringify([1,2])} </td> */}
        {/* <td > {priceD} </td> */}
       
        
       
 </tr>
 {/* <button>test</button> */}
 {/* <p> "hello                             "{props.Aflight.Flight_Number}</p>
 <p> "hello                             "{props.Aflight.Flight_Number}</p>
 <p> "hello            props.Aflight.Seats                 "{props.Aflight.Flight_Number}</p> */}
 
 <tr>
        <th > Arrival Flight</th>
        <td > {arrival_fligth["Flight_Number"]} </td>
        <td > {arrival_fligth["Departure_Date"]} </td>
        <td > {arrival_fligth["Departure_Time"]} </td>
        <td > {arrival_fligth["Arrival_Date"]} </td>
        <td > {arrival_fligth["Arrival_Time"]} </td>
        <td > {arrival_fligth["Departure_Airport"]} </td>
        <td > {arrival_fligth["Arrival_Airport"]} </td>
        {/* <td > {JSON.stringify( [3,4] )} </td> */}
        {/* <td > {priceA} </td> */}
        
       
       
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
      {/* <td>{priceA+priceD} </td> */}
    </tr>
  </tfoot>
            </table>
          
          
            <br/>

            {/* <button onClick={hadel_serving}>Confirm serving </button> */}

</div>

</div> 

)       
 
   
}