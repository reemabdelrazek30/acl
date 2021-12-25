// import React, {  useContext, useState } from "react";
// import {LoginContext} from "..LoginContext"
// import { useHistory } from 'react-router-dom';
// import Axios from "axios";;
// export const Logout = () => {
//     Axios.defaults.withCredentials = true;
//     const {logoutI} = useContext(LoginContext);
//     let hisotry = useHistory();
//     const logout = () => {
//         Axios.post("http://localhost:3001/logout").then((response) => {
//             if (response.loggedOut) 
//              {   
//                  logoutI();
//                  history.push('/User.js');
//              }
            
//         });
//     };
//     return(<div> <button onClick={logout}> Login </button></div>);
// }