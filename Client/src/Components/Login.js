import React, {  useContext, useState } from "react";
import {LoginContext} from "..LoginContext"
import Axios from "axios";;
export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const {loginI} = useContext(LoginContext);
    Axios.defaults.withCredentials = true;
    const login = () => {
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
                loginI("");
            } else {
                setLoginStatus("Hello," + response.data.First_Name);
            }
        });
    };
    return (
        <div >
            <div className="login">
                {/* <h1>Login</h1> */}
                <br/>
                <input
                    type="text"
                    placeholder="Username..."
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Password..."
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button onClick={login}> Login </button>
            </div>

            <h1>{loginStatus}</h1>
        </div>
    );
}