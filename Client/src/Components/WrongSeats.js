import React from 'react'
export default function WrongSeats(props) {
  return (props.trigger? (
    <div className="popup">
        <p>You have selected a wrong number of seats! </p>
        <button onClick={() => props.setTrigger(false)}>Cancel</button>
    </div>
  ): (""));
}