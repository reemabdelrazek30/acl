
//import Style from './Nstyle.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './User.css'
export default function User() {
    let history = useHistory();
   // const [clicked,setClicked]=useState(false)
    // function clickHandeler(){
    //     <Reserve_FLight/>
    // }
   
return(
       <div className="banners"> 
       <div className="container">
         <br /> <br />
          <h1 className="h1User">User page</h1>
          <br/>
         <div><button className="buttonUser" onClick={() => {history.push('/ReserveFlight');}}>Reserve Flight</button> </div>
         <div><button className="buttonUser" onClick={() => {
            axios.get("http://localhost:3001/login").then(response => {
            console.log("here in UseEffect");
            console.log(response);
            if (response.data.loggedIn)
              history.push('/ViewFlights');
           else {
              history.push({
              pathname: '/Login',
              state: { viewFlights: "true" }
           });
            }})}}>View Reserved Flights</button> </div>
         <div><button className="buttonUser" onClick={() => {history.push('/Profile');}}>Profile</button></div>
         <button className="buttonUser" onClick={() => {history.push('/Login')}}>Log In</button>
      </div>
   </div>
  // </div>
);

}