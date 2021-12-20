import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export const Register = () => {
    const [fNReg, setfNReg] = useState("");
    const [lNReg, setlNReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [passportReg, setPassportReg] = useState("");
    let history =useHistory();
    const register = () => {
        Axios.post("http://localhost:3001/register", {
            First_Name:fNReg, 
            Last_Name:lNReg, 
            Passport_Number:passportReg, 
            Email:emailReg, 
            password:passwordReg
        }).then((response) => {
            console.log(response);
            history.push({
                pathname: '/Login',
            })
        });
    };
    return (
        <div className="registration">
            {/* <h1>Registration</h1> */}
            <label>First Name</label>
            <input
                type="text"
                onChange={(e) => {
                    setfNReg(e.target.value);
                }}
            />
            <label>Last Name</label>
            <input
                type="text"
                onChange={(e) => {
                    setlNReg(e.target.value);
                }}
            />
            <label>Email</label>
            <input
                type="text"
                onChange={(e) => {
                    setEmailReg(e.target.value);
                }}
            />
            <label>Passport_Number</label>
            <input
                type="text"
                onChange={(e) => {
                    setPassportReg(e.target.value);
                }}
            />
            <label>Password</label>
            <input
                type="text"
                onChange={(e) => {
                    setPasswordReg(e.target.value);
                }}
            />
            <button onClick={register}> Register </button>
        </div>);
}
export default Register;