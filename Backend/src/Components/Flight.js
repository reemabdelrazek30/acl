import React,{ useState,useEffect} from 'react'
import './Flight.css'
import Axios from "axios";
import Popup from  './Popup';

const Flight = () => {

 const[popupbutton,setpopupbutton]=useState(false); 
 const[aflight,setaflight]=useState([]);

 const[allflights,setAllflights]=useState([]);
 const[searchterm,setsearch]=useState([]);
 const[searchDD,setsearchDD]=useState([]);
 const[searchDT,setsearchDT]=useState([]);
 const[searchDA,setsearchDA]=useState([]);

  useEffect(() =>{
    Axios.get("http://localhost:3001/").then((Response)=> {
      setAllflights(Response.data)
    })
  
  },[]);



  const button_action=(value)=>{
    setpopupbutton(true);
    setaflight(value);
  }

 


  return (<div className="app-container">
    <h1> Flights</h1>
    <table>
    <tbody>  
     <tr>
       <th>flight Number</th>
       <th>Departure Date</th>
       <th>Departure time</th>
       <th>Departure Airport</th>
       <th>Arrival Date</th>
       <th>Arrival time</th>
       <th>Arrival Airport</th>
       <th>Economy Class Seats</th>
       <th>Business Class Seats</th>
       <th>Actions</th>
       
       </tr>
     
      <tr>
      <td><input type="Number" placeholder="Flight Number" onChange={(event)=> {setsearch(event.target.value); }} /></td> 
      <td><input type="Date" placeholder="Departure Date" onChange={(event)=> {setsearchDD(event.target.value); }} /></td> 
      <td><input type="String" placeholder="Departure Time" onChange={(event)=> {setsearchDT(event.target.value); }} /></td> 
      <td><input type="String"  placeholder="Departure Airport" onChange={(event)=> {setsearch(event.target.value); }} /></td> 
      <td><input type="Date"   /></td> 
      <td><input type="String"/></td> 
      <td><input type="String"  /></td> 
      <td></td> 
      <td></td> 

      <td>
      {/*<button onClick={()=> filterflights()}>filter</button>*/}
      </td>
      
      
      </tr>
    
      
   {allflights.filter((val)=> {
     return val
    //  if(searchterm == ""  ){
    //   return val
    // } else if(val.Flight_Number == searchterm  ){
    //    return val
    // }
     
    
{/*   if(searchterm == "" &searchDD=="" &searchDT=="" & searchDA== ""){
      return val
    } else if(searchterm==val.Flight_Number &searchDT==""   &searchDD==""  & searchDA== ""   ){
      return  val
    }else if(searchterm == "" & val.Departure_Time.includes(searchDT) &searchDD=="" & searchDA== ""  ){
      return val
    }else if(searchterm == "" &searchDT==""  & val.Departure_Date.includes(searchDD) & searchDA== ""  ){
      return val
    }
    
    else if(searchterm == "" &searchDT==""  &searchDD==""&  val.Departure_Airport.includes(searchDA)   ){
        return val
    }else if(searchterm==val.Flight_Number  &searchDD==""  &  val.Departure_Airport.includes(searchDA)   ){
      return val
    }else if(searchterm =="" &val.Departure_Date.includes(searchDD)  &  val.Departure_Airport.includes(searchDA)   ){
    return val
    }else if(searchterm ==val.Flight_Number  &val.Departure_Date.includes(searchDD)  &  val.Departure_Airport.includes(searchDA)   ){
      return val
    }
  */}


{ /*   switch(searchterm | searchDA){
      case ""|"":
      case val.Flight_Number | "":
      case "" | val.Departure_Airport:
      case val.Flight_Number | val.Departure_Airport: return val; break;
    }
  */ }

   })
   .map((val)=>{
     return (
        <tr  key={val._id}>  
       <td>{val.Flight_Number }</td> 
       <td>{val.Departure_Date} </td> 
       <td>{val.Departure_Time }</td>
       <td>{val.Departure_Airport} </td>  
       <td>{val.Arrival_Date} </td> 
       <td>{val.Arrival_Time} </td> 
       <td>{val.Arrival_Airport} </td> 
       <td>{val.Number_of_Economy_seats} </td> 
       <td>{val.Number_of_Business_seats} </td> 
       <td>  <button>Edit</button>
       {/*<button onClick={()=> deleteFlight(val._id)}>Delete</button>*/}
       <button onClick={()=> button_action(val)}>Delete</button>

       
       </td> 
       </tr>
     
       )
   })}

   </tbody>
  </table>
   
  <Popup trigger={popupbutton}  setTrigger={setpopupbutton} delete_flight={aflight} >
         <h2>Are you sure you want to delete the following flight:</h2>
         <h3>Flight Number:{aflight.Flight_Number }</h3> 
         <h3>Departure Date: {aflight.Departure_Date}  </h3> 
         <h3>Departure Time: {aflight.Departure_Date}  </h3>
         <h3>Departure Airport: {aflight.Departure_Airport}  </h3>
         <h3>Arrival Date: {aflight.Arrival_Date}  </h3>
         <h3>Arrival Time: {aflight.Arrival_Time}  </h3>
         <h3>Arrival Airport: {aflight.Arrival_Airport}  </h3>
         <h3>Number of Economy seats: {aflight.Number_of_Economy_seats}  </h3>
         <h3>Number of Business seats: {aflight.Number_of_Business_seats}  </h3>
       </Popup>
    
  </div>
  )
}

export default Flight