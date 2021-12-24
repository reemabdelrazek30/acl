import React, {useState, useEffect} from "react";
import Axios from "axios";
import './Login.css';
import {useLocation} from 'react-router-dom';
import { useHistory } from 'react-router';
import {GoogleLogin} from 'react-google-login';
export const Login = () => {
    const location = useLocation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);
    const clientId = "15756298551-8i42qm169dk39lk9u4tp7irgfgbecrbr.apps.googleusercontent.com";
    let history = useHistory();
    Axios.defaults.withCredentials = true;
    const login = () => {
        if (username != "" || password != ""){
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
                console.log("loginStatus: " + loginStatus);
            } else {
                setLoginStatus("Hello," + response.data.First_Name);
            }
        });
        }
        if (location.state.viewFlights==="true")
              history.push('/ViewFlights');
        else
              history.push('/User');
    };
    const responseGoogle = (response) => {
        console.log(response);
    }
     useEffect(() => {
      console.log("entered get login");
      Axios.get("http://localhost:3001/login").then(response => {
        if (response.data.loggedIn) 
            setLoggedIn(true);
        else
            setLoggedIn(false);
    })},[])
    const logout = () => {
        window.localStorage.clear();
        setLoggedIn(false);
        history.push('/User');
    }
    return (

        <div>
        {loggedIn?
            (
            
            <div className="bannerLogIn">
                <div className="container" id="container">
                <div>
                    <br /> <br />
                     <h1 className="signIn">Oops! It appears you're already logged in</h1>
                     <h2 className="signIn">Log Out Instead?</h2>
                     <button className="buttonSignUp" onClick={() => {logout()}}>Log Out</button>
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
				<button className="buttonSignIn" onClick={() => {history.push('/Register')}}>Sign Up</button>
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
                      clientId = {clientId}
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
            className = "inputClass"
            placeholder="Username" />
			<input type="password"
            onChange={(e) => {
                        setPassword(e.target.value);
                    }}
            required
            className = "inputClass"
             placeholder="Password" />
			{/* <a href="#">Forgot your password?</a> */}
			<button className="buttonSignUp" onClick = {login}>Sign In</button>
		</form>
	</div>
    </div>
    </div>
            )
        }
	    
  </div>
    );
     }