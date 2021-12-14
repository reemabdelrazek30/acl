import React from 'react'
import {useHistory} from 'react-router-dom'
export default function RegistrationSuccess(props) {
  let history = useHistory();

  return (props.trigger? (
    <div className="popup">
        <p>Your registration was successful, {props.name}!</p>
        <button onClick={() => history.push('/Login')}>Okay</button>
    </div>
  ): (""));
}