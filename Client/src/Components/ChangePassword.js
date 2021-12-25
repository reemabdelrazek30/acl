import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import './ChangePassword.css';
export default function ChangePassword(){
    let history = useHistory();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    //  useEffect(() => {
    //     axios.get("http://localhost:3001/login").then(response => {
    //         console.log("here in UseEffect");
    //         console.log(response);
    //         if (response.data.loggedIn) {
    //             const id = response.data.user._id;
    //             console.log(id);
    //             axios.get(`http://localhost:3001/viewProfile/${id}`).then((response => {
    //                 setUsername(response.data.username);
    //             }))
    //                 .catch(err => console.log(err))
    //         }
    //         else
    //             history.push('/Hpage');
    //     })

    // },[])
    // const savePassword = () => {

    // }
    return (
        <div> {console.log("CHANGE PASSWORD")}
            <div className="changePasswordBanner">
                <div className="changePasswordContainer">
                        <h1>Change Your Password</h1>
                        <br /> <br /> <br />
                        <label>Username</label>
                        <input className="inputProfile" readOnly placeholder={username}></input>
                        <br />
                        <label>Password</label>
                        <input className="inputProfile" type="password" onChange={(event) => {setPassword(event.target.value); document.getElementById("discard").disabled=false}}></input>
                        <div>
                            {/* <button onClick={() => {savePassword}}>Save</button> */}
                        </div>
                        <div>
                            <button className="buttonChangePassword" id="discard" onClick={() => {history.push('/Hpage');}}>Change</button>
                        </div>
                </div>
            </div>
        </div>
    );
}