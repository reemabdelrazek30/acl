import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState,  } from "react";
import { useHistory } from "react-router-dom";



function Changedepartureflight() {
    const location = useLocation();
    let history = useHistory();

    
    const max_date = location.state.returndate.split("T")[0];
  

    const current = new Date();
    let date;
    // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    if (current.getDate() < 10) {
      date = `${current.getFullYear()}-${current.getMonth() + 1}-0${current.getDate()}`;
      if ((current.getMonth() + 1) < 10) {
        date = `${current.getFullYear()}-0${current.getMonth() + 1}-0${current.getDate()}`;
      }
    }
  
  
    // setCurrentDate(date)
    const [info, setInfo] = useState({
      Departure_date: date,
      Class: "Economy"
    });
  
  
    const handleChange = ({ target }) => {
      const { name, value } = target;
      setInfo((previnfo) => ({
        ...previnfo,
        [name]: value
      }));
      
    };

    const TotalPrice=location.state.TotalPrice;
    const arrivalflightairport=location.state.arrivalflightairport;
    const depflightairport=location.state.depflightairport;
    const N_children=location.state.number_of_children;
    const N_adults =location.state.number_of_adults;
    const user_id=location.state.user_id;

    //location.state contains user_id ,number_of_adults,number_of_children,depflightairport,arrivalflightairport,TotalPrice,conf
    const redirect=() =>{
        history.push({
            pathname: '/vadf',
            state: { TotalPrice: TotalPrice, Aflightairport:arrivalflightairport,depflightairport:depflightairport, info:info,N_children:N_children,N_adults:N_adults,
                user_id:user_id, conf:location.state.conf ,olddepflight_id:location.state.olddepflight_id,
                returnticketprice:location.state.returnticketprice},
            
        });
    }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(info, '', 2));
      
      };
    return (
        
        <div  >
        <br />
        <br />
        <div className=" form">
          <form onSubmit={handleSubmit}>
            
            <br />
            <label for="Departure_date">Departure Date</label>
            <input id="Departure_date"
              value={info.Departure_date}
              onChange={handleChange}
              type="date" min={date} max={max_date}
              name="Departure_date"
              placeholder={date}
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
          <h2>children :{N_children}</h2>
          <h2>adult :{N_adults}</h2>
      </div>
    );
}


export default Changedepartureflight;