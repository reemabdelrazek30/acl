import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from 'react-router-dom';
import { LoginContext } from "../Contexts/LoginContext"
import './Login.css';
import { useLocation } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Logout from './Logout';
const nodemailer = require('nodemailer');
Axios.defaults.withCredentials = true;
export const Login = () => {
    let history = useHistory();
    const location = useLocation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const { loginI } = useContext(LoginContext);
    // const { loggedIn } = useContext(LoginContext);
    const [loggedIn, setLoggedIn] = useState();
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
            Axios.post("http://localhost:3001/login", {username: username, password: password}).then(response => {
            console.log("entered get login post: " + response.data.loggedIn);
                if (response.data.message) {
                    console.log("first if in post");
                    setLoginStatus(response.data.message);
                    loginI("");
                }
                else
                {
                    setLoginStatus("Hello," + response.data.First_Name);
                    history.push('/User');
                }
            });   
        }
    }

const responseGoogle = (response) => {
    console.log(response);
}
useEffect(() => {
    console.log("entered get login");
    Axios.get("http://localhost:3001/login").then(response => {
        console.log("entered get login get" + response.data.loggedIn);
        if (response.data.loggedIn){
            setLoggedIn(true);
        }
        else
            setLoggedIn(false);
    })
}, [])
return (

    <div>
        {loggedIn ?
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
            (

                <div className="banner">
                    <div className="container" id="container">
                        <div className="overlay-container">
                            <div className="overlay">
                                <div className="overlay-panel overlay-right">
                                    <p>Don't have an account?</p>
                                    <h1 className="welcomeBack">Join Our Community!</h1>
                                    <button className="buttonSignIn" onClick={() => { history.push('/Register') }}>Sign Up</button>
                                </div>
                                {/* <h1>Create Account</h1> */}

                                {/* <button onClick = {history.push('/Register')}>Sign Up</button> */}
                            </div>
                        </div>
                        <div className="form-container sign-in-container">
                            <form>
                                <h1 className="signIn">Sign In</h1>
                                <div class="social-container">
                                    {/* <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a> */}
                                    <GoogleLogin
                                        clientId={clientId}
                                        buttonText="Login"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                                <span>or use your account</span>
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
                        </div>
                    </div>
                </div>
            )
        }

    </div>
); }