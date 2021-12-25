
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