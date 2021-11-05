import React from "react";
import './Popup.css'
import Axios from "axios";

function Popup(props){

    const deleteFlight = (id)=>{
        Axios.delete(`http://localhost:3001/delete/${id}`)
      };

    return(props.trigger)?(
        <div className="popup">
            <div className="popup-inner">
            <button className="close-btn1" onClick={()=> deleteFlight(props.delete_flight._id)}> confirm </button>
            <button className="close-btn" onClick={()=> props.setTrigger(false)}>cancel</button>
              {props.children}
            
            </div>
            </div>
    ):"";
    
}

export default Popup