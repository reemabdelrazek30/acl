import React, {  useContext, useState } from "react";
 import Axios from "axios";
 import { useHistory } from 'react-router-dom';
 import {LoginContext} from "../Contexts/LoginContext"
 import './Login.css';
Axios.defaults.withCredentials = true;

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const {loginI} = useContext(LoginContext);
    let history = useHistory();
    const LoginH = () => {
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
                loginI("");
            } else 
                setLoginStatus("Hello," + response.data.First_Name);
        });
    };
    return (
       <div class="container" id="container">
	    <div class="form-container sign-up-container">
		<form>
			<h1>Create Account</h1>
			{/* <div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your email for registration</span> */}
			<input type="text" placeholder="Name" />
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<button onClick = {history.push('/Register')}>Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form>
			<h1 className="signIn">Sign in</h1>
			{/* <div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your account</span> */}
			<input type="text"
            onChange={(e) => {
                        setUsername(e.target.value);
                    }}
            placeholder="Username" />
			<input type="password"
            onChange={(e) => {
                        setPassword(e.target.value);
                    }}
             placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button onClick = {LoginH}>Sign In</button>
		</form>
	</div>
</div>
    );
}