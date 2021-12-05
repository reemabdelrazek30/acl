import React from 'react'
export default function WrongSeats(props) {
  return (props.trigger? (
    <div className="popup">
     <p>No the correct number of seats! </p>
        <button onClick={() => {props.setTrigger(false) }}>OK</button>
    </div>
  ): (""));
}