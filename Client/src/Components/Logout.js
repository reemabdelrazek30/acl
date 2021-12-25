import React, {  useContext, useState } from "react";
import {LoginContext} from "../Contexts/LoginContext"
import { useHistory } from 'react-router-dom';
import Axios from "axios";
import './Home.css'
export default function Logout () {
    Axios.defaults.withCredentials = true;
    const {logoutI} = useContext(LoginContext);
    let history = useHistory();
    const logout = () => {
        Axios.post("http://localhost:3001/logout").then((response) => {
            if (response.loggedOut) 
             {   
                 logoutI();
                 history.push('/User.js');
             }
            
        });
    };
    return(<div> <button className="buttonHome" onClick={logout}>Log Out</button></div>);
}