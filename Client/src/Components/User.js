
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
         <div><button onClick={() => {history.push('/ReserveFLight');}}>Reserve FLight</button>
        {/* <button onClick={() => {history.push('/test');}}>test</button> */}
         {/* <div><button onClick={ clickHandeler }>Reserve FLight</button> */}
        <br/>
      
      </div>
      
  
  </div>
);

}