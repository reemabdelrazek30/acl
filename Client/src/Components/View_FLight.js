 import { useState, useEffect } from "react"
 import Axios from "axios";
 import { useHistory } from 'react-router-dom';

 import  './Nstyle.css'
import Summary from "./Summary_reserved_flights";

 export default function View_FLight(props){


 const [flights,setFlights]=useState([]);
 const [returnFlights,setReturnFlights]=useState([]);

const [choosenFlight,setChoosenFlight]=useState("")
const [showMoreInfo,setShowMoreInfo]=useState({})
const [checkClickedButton,setCheckClickedButton]=useState({})

const [id_duration,setId_duration]=useState({})



const [depatureFlight,setDepatureFlight]=useState({})
const [arrivalFlight,setArrivalFlight]=useState({})
 const [pop,setPop]=useState(false)

////////////////////////////////////////////////////////

const [clickedGoToReturnflights_button,setClickedGoToReturnflights_button]=useState(false)

const [show_departure_component,setshow_departure_component]=useState(true)

const [show_return_component,setshow_return_component]=useState(false)

const [show_departure_button,setshow_departure_button]=useState(false)

const [show_return_button,setshow_return_button]=useState(false)
const [button_content,setButton_content] = useState('Proceed')
///////////////////////////////////////////////////////////////////////////////

const [border_color,setBorder_color]=useState("white")
const [border_color_selected,setBorder_color_selected]=useState("navy")

const [show_summery,setShow_summary]=useState(false)

const [con_Number,setCon_Number]=useState('')



const x=true;

//////////////////////////////////////////////////////////////////////////////////
 const handelClickingRow =(id, date1,date2,a ,b)=>{
   console.log("row clicked"+id)
   getDuration(id,date1,date2,a,b)
  let new_value;
  if(showMoreInfo[id]){
     new_value=showMoreInfo[id]? false:true;
  }
  else{
new_value=true;
  }
  setShowMoreInfo((prev) =>(
   
  {...prev , [id] : new_value}) )
  console.log("test"+JSON.stringify(showMoreInfo)) // to see the new values i should go out of the method
 }

 ////////////////////////////////////////////////////////////////////////////////////////////

 const handleserving=(id,flight_number,flight_Departure_Date,flight_Departure_Time,
  flight_Arrival_Date,flight_Arrival_Time,cprice,aprice,flight_Departure_Airport,flight_Arrival_Airport)=>{
    if(show_departure_component)
  {  setDepatureFlight(()=>({
    
    ["Flight_Number"]:flight_number,
      ["flight_Departure_Date"]:flight_Departure_Date, 
      ["flight_Arrival_Date"]:flight_Arrival_Date,
      ["flight_Departure_Time"]:flight_Departure_Time,
      
      ["flight_Arrival_Time"]:flight_Arrival_Time,
      ["flight_Departure_Airport"]:flight_Departure_Airport,
      ["flight_Arrival_Airport"]:flight_Arrival_Airport,
      ["Class"]:props.info.Class,
      ["Price"]:((cprice*props.info.N_childern)+(aprice*props.info.N_adult)),
      ["Seats"]:[1,2]
    }))}
    else{
      setArrivalFlight(()=>({
        ["Flight_Number"]:flight_number,
        ["flight_Departure_Date"]:flight_Departure_Date, 
        ["flight_Arrival_Date"]:flight_Arrival_Date,
        ["flight_Departure_Time"]:flight_Departure_Time,
        
        ["flight_Arrival_Time"]:flight_Arrival_Time,
        ["flight_Departure_Airport"]:flight_Departure_Airport,
        ["flight_Arrival_Airport"]:flight_Arrival_Airport,
        ["Class"]:props.info.Class,
        ["Price"]:((cprice*props.info.N_childern)+(aprice*props.info.N_adult)),
        ["Seats"]:[1,3]
      }))
    }
    setshow_return_button(true)
  setChoosenFlight(id);
  // setButton_content('Proceed')
  setButton_content((prev)=>{
    if(prev === 'Proceed'){
      return 'Proceed'
    }
    return 'Review booking'
  }
  )
  let new_value;
  if(checkClickedButton[id]){
     new_value=checkClickedButton[id]? false:true;
    //  setshow_return_component(new_value)
  }
  else{
new_value=true;
// setshow_return_component(true)
  }
  setCheckClickedButton((prev) =>(
   
    {...prev , [id] : new_value}) )
    console.log("test which button"+JSON.stringify(checkClickedButton)) // to see the new values i should go out of the method
     }
 
//////////////////////////////////////////////////////////////////////

const goBack_to_departure_flights=()=>{
  if(button_content ==='Confirm booking'||button_content==='Proceed to payment'){
    setshow_departure_component(false)
    setshow_departure_button(true)
    setshow_return_component(true)
    setshow_return_button(false)
    setShowMoreInfo({})
    setButton_content('Review booking')
    setShow_summary(false)
  }
else
  {setshow_departure_component(true)
  setshow_departure_button(false)
  setshow_return_component(false)
  setshow_return_button(false)
  setShowMoreInfo({})
  setButton_content('Proceed')}

}

/////////////////////////////////////////////////////////////////////
// const handle_final_booking=()=>{

//   Axios.post("http://localhost:3001/confirm_booking",{
  
//     Departure_flight:props.Dflight,
//     Arrival_flight:props.Aflight,
  
//   Total_price:(props.Aflight.Price+props.Dflight.Price),
//   Class:props.Aflight.Class,
//   Departure_seats:props.Dflight.Seats,
//   Arrival_seats:props.Aflight.Seats
      
  
  
//     }).then((Response) => 
//     console.log("enterd front  3"+"  axios"+JSON.stringify(props.Dflight) )) 
    
      
     
      
  
  
//     }
///////////////////////////////////////////////////////////////
const goToReturnFlights=()=>{
  if(button_content==='Proceed')
    {Axios.post("http://localhost:3001/get_return_flights",{

  

    // Departure_Date:depatureFlight.Departure_date,
   
    Departure_Date:depatureFlight["flight_Arrival_Date"],
    Arrival_Date:props.info.Arrival_date,
    Departure_Airport: depatureFlight["flight_Arrival_Airport"],
    Arrival_Airport: depatureFlight["flight_Departure_Airport"],
    Dtime: depatureFlight["flight_Arrival_Time"],
    Class:props.info.Class,
    seats: (props.info.N_childern+props.info.N_adult)


  }).then((Response) => {setReturnFlights(Response.data)
  console.log("enterd front  2"+"  axios"+JSON.stringify(depatureFlight)+JSON.stringify(Response.data ) )}) 
  setShowMoreInfo({})
  setClickedGoToReturnflights_button(true
    )
    setshow_departure_component(false)
    setshow_return_component(true)
    setshow_return_button(false)
    setshow_departure_button(true)
    setButton_content('Review booking')}
    else if(button_content ==='Confirm booking'){
     
      Axios.post("http://localhost:3001/confirm_booking",{
  
        Departure_flight:depatureFlight,
        Arrival_flight:arrivalFlight,
      
      Total_price:(arrivalFlight["Price"]+depatureFlight["Price"]),
      Class:arrivalFlight["Class"],
      Departure_seats:depatureFlight["Seats"],
      Arrival_seats:arrivalFlight["Seats"],
      Confirmation_number:con_Number
          
      
      
        }).then((Response) => 
        console.log("enterd front  3"+"  axios"+JSON.stringify(arrivalFlight) )) 
        // button_content==='Proceed to payment'
        setButton_content('Proceed to payment')
        setshow_departure_button(false)
        setshow_return_button(true)
      
    
    }
    else if (button_content==='Proceed to payment'){
      // let history = useHistory();
     
    //  { history.push('/Payment');}
    }
    else{
      setshow_departure_component(false)
      setshow_return_component(false)
      setshow_return_button(true)
      setshow_departure_button(true)
      // setButton_content('Review booking')}
      setShow_summary(true)
      setButton_content('Confirm booking')
      Axios.get("http://localhost:3001/confirmition_number",{
      }).then((Response) => {
        setCon_Number(Response.data);
        setPop(true)
             console.log("enterd confirmation number"+"  axios"+JSON.stringify(con_Number)+JSON.stringify(Response.data)) })
             
            

    }
    // setshow_return_component(faltrse)

}
///////////////////////////////////////////////////////////////////////////////////
 
useEffect(() => { Axios.post("http://localhost:3001/get_available_flights",{

  

    Departure_Date:props.info.Departure_date,
   
    

    Departure_Airport: props.info.Departure_airport,
    Arrival_Airport: props.info.Arrival_airport,
    Number_of_children: props.info.N_childern,
    Number_of_adults: props.info.N_adult,
    Class:props.info.Class,
    seats: (props.info.N_childern+props.info.N_adult)


  }).then((Response) => {setFlights(Response.data)
  console.log("enterd front  "+"  axios"+JSON.stringify(Response.data ) )
  setShowMoreInfo({})
  setshow_departure_component(true)
  setshow_return_component(false)
  setshow_return_button(false)
  setshow_departure_button(false)
  setButton_content('Proceed')
  setShow_summary(false)

}) },[props.clicked]);

//////////////////////////////////////////////////////////////////////////////////////////////////////
const getDuration =(id,date1,date2,a,b)=>{
  let date1n = date1.substring(0,10)
  let date2n = date2.substring(0,10)
//  let d1= Date.parse(date1 )
//  let d2=Date.parse(date2 )
// let ms=d2-d1
let d = 24*60*60
let h=60*60
let m=60
var dat1=new Date(date1n+" " + a + ":00");
var dat2=new Date(date2n +" "+ b + ":00");
//diff will be the number of milliseconds between the two times.
var diff = Math.abs(dat2 - dat1);
let test=diff/1000/60/60
let rms=diff;
// let rms=diff+ms;
let rs=rms/1000
let Days= Math.floor(rs/d)
 rs=rs%d
let Hours=Math.floor(rs/h)
rs=rs%h
let Minutes=Math.floor(rs/m)
let Seconds=rs%60
let result ={Days,Hours,Minutes,Seconds};


//   var a="14:10";
// var b="19:02";


setId_duration((prev)=>(
  { ...prev,[id]:result}
    ))
}
///////////////////////////////////////////////////////////////////////////////////////////////////
//{show_return_component ?
// (returnFlights.length>0?(
     return(
      <div>
<div  id="view_flight" > 
{show_departure_component?(
  
  flights.length>0?(<h1>Choose Departure Flight</h1>):<h1>Sorry, no available departure flights for your inputs</h1>
):(show_return_component?(
  
  returnFlights.length>0?(<h1>Choose Arrival Flight</h1>):<h1>Sorry, no available return flights for the selected departure flight try choose another one</h1>
):((show_summery && button_content==='Proceed to payment')?( <h1> Your Confirmation code is {con_Number}</h1>):"")
)
}
<br/>
<br/>
<br/>
{/* <p>{JSON.stringify(props.info) }</p>
<br/>
<p> hi {JSON.stringify(props.info.Departure_airport) }</p>
<p> hi {JSON.stringify(showMoreInfo)+"clicked"+ "\n"} </p> */}
{/* <br/>
{/* <p> clicked button {JSON.stringify(checkClickedButton)+"clicked one row button    "+ "\n show return button" +JSON.stringify(show_return_component)} </p> */}

<br/>
{/* <p>{"depatureFlight:" +JSON.stringify(depatureFlight)}</p>
<br/>
<p>{"arrivalFlight:"+JSON.stringify(arrivalFlight)}</p> */} 
<br/>
<div className="spicalButton">
  
  <button  disabled={!show_departure_button} onClick={goBack_to_departure_flights}>  Go Back </button>
 <button  disabled={!show_return_button} onClick={goToReturnFlights}/*disabled={show_return_component} */>{button_content}</button>
{/* <button className="spicalButtonRigth"> Go to return flights</button> */}

</div>
<br/>
<br/>
{show_departure_component?(
  
  flights.length>0?(
  <>
  
 
<table >

        <thead>
         { <tr >
         
            <th >Flight Number</th>
            <th>Departure Date</th>
            <th>Departure time</th>
            <th>Arrival Date</th>
            <th>Arrival time</th>
           
            <th>Departure Airport</th>
            <th>Arrival Airport</th>
            <th /*className="special_td"*/>Actions</th>
            {/* <th>Actions</th> */}
            {/* <th>Economy Class Seats</th>
            <th>Business Class Seats</th> */}
            {/* <th>Actions</th> */}
          </tr>}
        </thead>
        <br/>
        <tbody>
{
    flights.map((flight) => (
      
       < >
        
        <tr key={flight._id} style={{"border-color": "lawngreen"}} onClick={()=>{ handelClickingRow(flight._id,flight.Departure_Date,flight.Arrival_Date,flight.Departure_Time,flight.Arrival_Time)}}>
        {/* <tr key={flight._id} onClick={handelClickingRow(flight._id)}> */}
        <td > {flight.Flight_Number} </td>
        <td > {flight.Departure_Date} </td>
        <td > {flight.Departure_Time} </td>
        <td > {flight.Arrival_Date} </td>
        <td > {flight.Arrival_Time} </td>
        <td > {flight.Departure_Airport} </td>
        <td > {flight.Arrival_Airport} </td>
        {/* <td style={{display:"relative"}}></td> */}
        
        <td /*className="special_td"*/> V  <button  onClick={()=>{ handleserving(flight._id,flight.Flight_Number,flight.Departure_Date,flight.Departure_Time,
          flight.Arrival_Date,flight.Arrival_Time,flight.price_child,flight.price_adult,flight.Departure_Airport,flight.Arrival_Airport
          )}}>Select Flight </button>   </td>
 </tr>
 
 <br/>
       { showMoreInfo[flight._id ] ?(
       
         <tr typeof="a" /*id="diplay_flight_info"*/>
         <td colSpan="3"> Flight Duration:  {JSON.stringify(id_duration[flight._id])}  </td>
         <td colSpan="2">  Cabin Class:  {props.info.Class} </td>
         <td colSpan="3">  Baggage Allowance.:  {flight.baggage} </td>
         
       {/* <label>Baggage Allowance:  {flight.baggage_allowance} </label>*/}
       {/* <br/> */}

  {/* <label>Price:  {flight.price} </label>*/}
       
       <br/>
       
       
      
       </tr>
       ):<br/>}
        <br/>
        </>
      ))
}
            </tbody>
            </table>
            </>):<p className="para" >No available flights with the provided inputs</p>
):<p></p>}


{show_return_component ?
(returnFlights.length>0?(
  <>
  {/* <h1>Choose Arrival Flight</h1> */}
  {/* <p>{clickedGoToReturnflights_button+"RETURN FLIGHTS"}</p> */}
<table >
  
  
        <thead>
         { <tr >
         
            <th >Flight Number</th>
            <th>Departure Date</th>
            <th>Departure time</th>
            <th>Arrival Date</th>
            <th>Arrival time</th>
           
            <th>Departure Airport</th>
            <th>Arrival Airport</th>
            <th /*className="special_td"*/>Actions</th>
            {/* <th>Actions</th> */}
            {/* <th>Economy Class Seats</th>
            <th>Business Class Seats</th> */}
            {/* <th>Actions</th> */}
          </tr>}
        </thead>
        <br/>
        <tbody>
{
    returnFlights.map((flight) => (
      <   >
     
        <tr key={flight._id}  onClick={()=>{ handelClickingRow(flight._id,flight.Departure_Date,flight.Arrival_Date,flight.Departure_Time,flight.Arrival_Time)}}>
      {/* <tr key={flight._id} onClick={handelClickingRow(flight._id)}> */}
      <td > {flight.Flight_Number} </td>
      <td > {flight.Departure_Date} </td>
      <td > {flight.Departure_Time} </td>
      <td > {flight.Arrival_Date} </td>
      <td > {flight.Arrival_Time} </td>
      <td > {flight.Departure_Airport} </td>
      <td > {flight.Arrival_Airport} </td>
      {/* <td style={{display:"relative"}}></td> */}
      
      <td /*className="special_td"*/> V    <button className="buttonClass" onClick={()=>{ handleserving(flight._id,flight.Flight_Number,flight.Departure_Date,flight.Departure_Time,
        flight.Arrival_Date,flight.Arrival_Time,flight.price_child,flight.price_adult,flight.Departure_Airport,flight.Arrival_Airport
        )}}>Select flight </button> </td>
</tr>

{ showMoreInfo[flight._id ] ?(
       
       <tr typeof="a" /*id="diplay_flight_info"*/>
       <td colSpan="3"> Flight Duration:  {JSON.stringify(id_duration[flight._id])}  </td>
       <td colSpan="2">  Cabin Class:  {props.info.Class} </td>
       <td colSpan="3">  Baggage Allowance.:  {flight.baggage} </td>
       
     {/* <label>Baggage Allowance:  {flight.baggage_allowance} </label>*/}
     {/* <br/> */}

{/* <label>Price:  {flight.price} </label>*/}
     
     <br/>
     
     
    
     </tr>
     ):<br/>}
      <br/>
      </>
      ))
}
            </tbody>
            </table>
            </>):<p className="para" >No available return flights with the provided inputs</p>

     ):<p></p>   }
     {/* <p>{JSON.stringify(depatureFlight)}</p> */}
    
</div>
<Summary trigger={show_summery} button_content={button_content} Dflight={depatureFlight} con={con_Number} Aflight={arrivalFlight}/>
</div>

     )
 }