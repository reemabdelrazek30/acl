import ReserveSeats from './ReserveSeats'
import { useState, useEffect } from "react"
import Axios from "axios";
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

    const [trigger,setTrigger]=useState(true)
    const [mess,setMess] = useState("Please, choose your departure flight's seats")

    return(
<div>
<p>????????????</p>
<p>{mess}</p>
<p>{trigger}</p>


{trigger?<ReserveSeats Did={Did} Aid={Aid} priceD={priceD} priceA={priceA} flightClass={flightClass} number={number} set={setTrigger} mess={mess} setM={setMess}/>:
<ReserveSeats Did={Did} Aid={Aid}  priceD={priceD} priceA={priceA} flightClass={flightClass} number={number} set={setTrigger} mess={mess} setM={setMess}/>

//<h1>"we are testing"</h1>

}



</div>

    );
}