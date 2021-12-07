
//import Style from './Nstyle.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function User() {
    let history = useHistory();
    const [clicked,setClicked]=useState(false)
    // function clickHandeler(){
    //     <Reserve_FLight/>
    // }
   
return(
    
    <div >
       
   {/* // {clicked ? {<Reserve_FLight/>, setClicked(false)}:null} */}
         <br/>
         <br/>
   <div>
          <label>User page</label>
         
          </div>
          <br/>
         <div><button onClick={() => {history.push('/ReserveFlight');}}>Reserve FLight</button> </div>
         <br/>
         <div><button onClick={() => {history.push('/ViewFlights');}}>View Reserved FLights</button>
       <br/> <div><button onClick={() => {history.push('/Profile');}}>Profile</button></div>
         {/* <div><button onClick={ clickHandeler }>Reserve FLight</button> */}
        <br/>
      
      </div>
      
  
  </div>
);

}