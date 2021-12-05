import ReserveSeats from './ReserveSeats'
import { useState, useEffect } from "react"
import Axios from "axios";
import Summary from "./Summary";

import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";

export default function Salma (){
    const query = new URLSearchParams(useLocation().search);
    //      search:'?Did=' + depatureFlight["id"]+'Aid=' + arrivalFlight["id"]+ '&class='+prop.Class +'&number='+ (props.info.N_childern+props.info.N_adult) //+'&props='+JSON.stringify(prop)+'&clicked='+clicked

    console.log(query+"  ضعثقغ هى قثسثقرث حشلث");
    const Did = query.get("Did");
    const Aid = query.get("Aid");
    const flightClass = query.get("class");
    const number=query.get("number");
    const priceD=query.get("priceD");
    const priceA=query.get("priceA");
    const [info,setInfo]=useState({
        "Did":Did,
        "Aid":Aid,
        "priceD":priceD,
        "priceA":priceA,
        "flightClass":flightClass
    })

    const [trigger,setTrigger]=useState(true)
    const [trigger2,setTrigger2]=useState(false)
    const [trigger3,setTrigger3]=useState(true)
    const [mess,setMess] = useState("Please, choose your departure flight's seats")



    return(
<div>
<p>????????????</p>
<p>{mess+"mess"}</p>
<p>{trigger+"trigger"}</p>
<p>{trigger2+"trigger2"}</p>
<p>{trigger3+"trigger3"}</p>




 {(mess==="Please, choose your departure flight's seats"||mess==="Please, choose your return flight's seats")?(<ReserveSeats Did={Did} Aid={Aid} priceD={priceD} priceA={priceA} 
flightClass={flightClass} number={number} set={setTrigger} 
 setT2={setTrigger2}  setT3={setTrigger3} mess={mess} setM={setMess}/>):
 (
    // <ReserveSeats Did={Did} Aid={Aid} priceD={priceD} priceA={priceA} 
    // flightClass={flightClass} number={number} set={setTrigger} 
    //  setT2={setTrigger2}  setT3={setTrigger3} mess={mess} setM={setMess}/>
    // <Summary info={info}/>  //  const [trigger2,setTrigger2]=useState(false)
<p>"came back to salma"</p>
 )
 }
{/*
<ReserveSeats Did={Did} Aid={Aid}  priceD={priceD} priceA={priceA} 
flightClass={flightClass} number={number} set={setTrigger} 
trigger2={trigger2} setT2={setTrigger2} trigger3={trigger3}
 setT3={setTrigger3} mess={mess} setM={setMess}/> */}

 {/* {trigger2?<Summary Did={Did} Aid={Aid} priceD={priceD} priceA={priceA} flightClass={flightClass} number={number} set={setTrigger}/>  //  const [trigger2,setTrigger2]=useState(false)

:""}  */}
{/* //<h1>"we are testing"</h1> */}





</div>

    );
}