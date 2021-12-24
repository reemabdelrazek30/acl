import React, { useState } from "react";
import Axios from "axios";
import './Register.css';
import RegistrationSuccess from './RegistrationSuccess';
import { useHistory } from 'react-router';
export const Register = () => {
    const [fNReg, setfNReg] = useState("");
    const [lNReg, setlNReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [passportReg, setPassportReg] = useState("");
    const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
    const [userName, setUserName] = useState("");
    let history = useHistory();
    const register = () => {
        Axios.post("http://localhost:3001/register", {
            First_Name:fNReg, 
            Last_Name:lNReg, 
            Passport_Number:passportReg, 
            Email:emailReg, 
            password:passwordReg
        }).then((response) => {
            setUserName = response.data.First_Name;
            setRegistrationSuccessful = true;
        });
    };
    const login = (event) => {
            event.preventDefault();
            history.push('/Login');
    }
return (
    <div>
        <div className="banner">
<div className="container" id="container">
	<div className="form-container sign-in-container">
		<form>
			<h1 className="createAccount">Create Account</h1>
			<input type="text"
                required
                className="inputClass"
                placeholder="First Name"
                onChange={(e) => {
                    setfNReg(e.target.value);
                }}/>
                <input type="text"
                required
                className="inputClass"
                placeholder="Last Name"
                onChange={(e) => {
                    setlNReg(e.target.value);
                }}/>
			<input type="text"
                required
                className="inputClass"
                placeholder="Email"
                onChange={(e) => {
                    setEmailReg(e.target.value);
                }}
                />
            <input type="text"
                required
                className="inputClass"
                placeholder="Passport Number"
                onChange={(e) => {
                    setPassportReg(e.target.value);
                }}
                />
			<input type="password"
                required
                className="inputClass"
                placeholder="Password"
                onChange={(e) => {
                    setPasswordReg(e.target.value);
                }}/>
			<button className="buttonSignUp" onClick={register}>Sign Up</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-right">
				<h1 className="welcomeBack">Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button className="buttonSignIn" onClick={(event) => {login(event)}} id="signIn">Sign In</button>
			</div>
		</div>
	</div>
    </div>
</div>
 <RegistrationSuccess trigger={registrationSuccessful} name={userName} setTrigger={setRegistrationSuccessful}></RegistrationSuccess>
</div>
);
}