import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from 'react-router-dom';
import { LoginContext } from "../Contexts/LoginContext"
import './Home.css';
import { useLocation } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Logout from './Logout';
const nodemailer = require('nodemailer');
Axios.defaults.withCredentials = true;
export default function LoginAdmin (){
    let history = useHistory();
    const location = useLocation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const { loginI } = useContext(LoginContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const clientId = "15756298551-8i42qm169dk39lk9u4tp7irgfgbecrbr.apps.googleusercontent.com";
    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "airport-reservation-system@hotmail.com",
            pass: "airport_reservation_system"
        }
    });
    const options = {
        from: "airport-reservation-system@hotmail.com",
        to: "salma.elshafey@student.guc.edu.eg",
        subject: "7asby allah",
        text: "7asby allah"
    }
    const LoginH = () => {
        if (username != "" || password != "") {
            Axios.post("http://localhost:3001/loginAdmin", {username: username, password: password}).then(response => {
                if (response.data.message) {
                    setLoginStatus(response.data.message);
                    loginI("");
                }
                else
                    setLoginStatus("Hello," + response.data.First_Name);
            });
        }
    }

//     let info = transporter.sendMail(options, function (err, info) {
//         if (err)
//             console.log(err);
//         else
//             console.log(info.response);
//     });
//     console.log("info: " + info);
//     if (location.state.viewFlights === "true")
//         history.push('/ViewFlights');
//     else
//         history.push('/User');
// };

// useEffect(() => {
//     console.log("entered get login");
//     Axios.get("http://localhost:3001/login").then(response => {
//         if (response.data.loggedIn)
//             setLoggedIn(true);
//         else
//             setLoggedIn(false);
//     })
// }, [])
const logout = () => {
    history.push('/Logout');
}
return (
            <div className="bannerProfile">
                <div className="containerProfile">
                            <form>
                                <h1 className="signIn">Sign In</h1>
                                <input type="text"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    required
                                    className="inputClass"
                                    placeholder="Username" />
                                <input type="password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    required
                                    className="inputClass"
                                    placeholder="Password" />
                                    
                                {/* <button onClick = {LoginH}>Sign In</button> */}
                                {/* <a href="#">Forgot your password?</a> */}
                                <button className="buttonSignUp" onClick={LoginH}>Sign In</button>
                            </form>
                        </div> </div>
); }



        {/* {loggedIn ?
            (
                <div className="bannerLogIn">
                    <div className="container" id="container">
                        <div>
                            <br /> <br />
                            <h1 className="signIn">Oops! It appears you're already logged in</h1>
                            <h2 className="signIn">Log Out Instead?</h2>
                            <Logout />
                        </div>
                    </div>
                </div>)
            :
            ( */}

//  <div>
//             <div className="bannerProfile">
//                 <div className="containerProfile">
//                 <h1 className="profile">Profile</h1>
//                     <form className="formProfile">
//                         <div className="item">
//                             <div>
//                             <label>First Name</label>
//                             <input type="text" className="inputProfile" name="First Name" required={true} defaultValue={First_Name} onChange={(event) => { setFirst_Name(event.target.value); setDisabled(false); }}></input>
//                             <br /> <br /> 
//                             </div>
//                              <div>
//                             <label>Last Name</label>
//                             <input type="text" className="inputProfile" name="Last Name" required={true} defaultValue={Last_Name} onChange={(event) => { setLast_Name(event.target.value); setDisabled(false); }}></input>
//                             <br /> <br /> 
//                             </div>
//                              <div>
//                             <label>Passport Number</label>
//                             <input type="text" className="inputProfile" name="Passport Number " required={true} defaultValue={Passport_Number} onChange={(event) => { setPassport_Number(event.target.value); setDisabled(false); }}></input>
//                             <br /> <br /> 
//                             </div>
//                              <div>
//                             <label>Email</label>
//                             <input type="text" className="inputProfile" name="Email" required={true} defaultValue={Email} onChange={(event) => { setEmail(event.target.value); setDisabled(false); }}></input>
//                             <br /> <br /> 
//                             </div>
//                             <div>
//                             <button id="discard" className="buttonDiscard" onClick={discard} disabled={disabled}>Discard Changes</button>
//                             <button className="buttonProfile" onClick={editProfile}>Save Changes</button>
//                             </div>
//                         </div>
//                     </form>
//                 {/* })} */}
//             </div>
//         </div>
//         </div>