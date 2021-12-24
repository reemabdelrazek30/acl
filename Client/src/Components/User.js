
//import Style from './Nstyle.css'
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
export default function User() {
    let history = useHistory();
    useEffect(() => {
  
      Axios.get("http://localhost:3001/login",{ withCredentials: true}).then(response => {
        console.log("here");
        if (response.data.loggedIn){
   //  setLoggedIn(true);
   console.log(JSON.stringify(response.data.user)+"user logged")
   console.log((response.data.user._id)+"user logged")
   //setId(response.data.user._id)
        }
        else{
          console.log(response.data.user+"user not logged in")
      
        }
       
      }
      
      )
      
  },[])
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