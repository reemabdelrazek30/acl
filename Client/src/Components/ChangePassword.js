import React, {useHistory, useState} from 'react';
import axios from 'axios';

export default function ChangePassword(){
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
    let history = useHistory();
    const savePassword = () => {

    }
    return(
        <div>
            <div className="changePasswordBanner">
                <div className="changePasswordContainer">
                        <h1>Change Your Password</h1>
                        <br /> <br /> <br />
                        <label>Username</label>
                        <input readonly placeholder={username}></input>
                        <br />
                        <label>Password</label>
                        <input type="password" onChange={(event) => {setPassword(event.target.value); document.getElementById("discard").disabled=false}}></input>
                        <div>
                            {/* <button onClick={() => {savePassword}}>Save</button> */}
                        </div>
                        <div>
                            {/* <button id="discard" onClick={() => {discard}}>Change</button> */}
                        </div>
                </div>
            </div>
        </div>
    );
}