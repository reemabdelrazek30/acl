import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState,  } from "react";
import { useHistory } from "react-router-dom";



function ChangeReturnFlight() {
    const location = useLocation();
    let history = useHistory();

    
    const min_date = location.state.depdate.split("T")[0];
  
  
    // setCurrentDate(date)
    const [info, setInfo] = useState({
      Departure_date: min_date,
      Class: "Economy"
    });
  
  
    const handleChange = ({ target }) => {
      const { name, value } = target;
      setInfo((previnfo) => ({
        ...previnfo,
        [name]: value
      }));
      
    };

    // const TotalPrice=location.state.TotalPrice;
    // const arrivalflightairport=location.state.arrivalflightairport;
    // const depflightairport=location.state.depflightairport;
    // const N_children=location.state.number_of_children;
    // const N_adults =location.state.number_of_adults;
    const user_id=location.state.user_id;

    //location.state contains user_id ,number_of_adults,number_of_children,depflightairport,arrivalflightairport,TotalPrice,conf
    const redirect=() =>{
        history.push({
            pathname: '/varf',
            state: {  info:info, user_id:user_id, pastflightinfo:location.state.pastflightinfo },
            
        });
    }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(info, '', 2));
      
      };
    return (
        
        <div  >
        <br />
        <h2>Change Return Flight-Step 1</h2>
        <br />
        <div className=" form">
          <form onSubmit={handleSubmit}>
            
            <br />
            <label for="Departure_date">Departure Date</label>
            <input id="Departure_date"
              value={info.Departure_date}
              onChange={handleChange}
              type="date" min={min_date} 
              name="Departure_date"
              placeholder={min_date}
            />
            <br />
            
           
            <label className="form_label_special" for="class"> Class </label>
            <select name="Class" id="class" value={info.Class} onChange={handleChange}>
              < option value="Economy">Economy</option>
              <option value="Business">Business</option>
            </select>
  
  
            <br />
            <br />
  
            <button onClick={()=>redirect()} type="submit">See  available flights</button>
          </form>
        </div>
         <br />
         <h2>class:{info.Departure_date}</h2>
          <h2>class:{info.Class}</h2>
          <h2>children :{location.state.pastflightinfo.children_no}</h2>
          <h2>adult :{location.state.pastflightinfo.adult_no}</h2>
      </div>
    );
}


export default ChangeReturnFlight;