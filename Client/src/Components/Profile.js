import React, { useEffect } from 'react'
import './Profile.css';
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
export default function Profile() {
    //let id;
    let history = useHistory();
    // const [id , setID] = useState();
    const [profile, setProfile] = useState([]);
    const [First_Name, setFirst_Name] = useState("");
    const [Last_Name, setLast_Name] = useState("");
    const [Passport_Number, setPassport_Number] = useState("");
    const [Email, setEmail] = useState("");
    const [disabled, setDisabled] = useState(true);
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get("http://localhost:3001/login").then(response => {
            console.log("here in UseEffect");
            console.log(response);
            if (response.data.loggedIn) {
                const id = response.data.user._id;
                console.log(id);
                axios.get(`http://localhost:3001/viewProfile/${id}`).then((response => {
                    setProfile(response.data);
                    setFirst_Name(response.data.First_Name);
                    setLast_Name(response.data.Last_Name);
                    setEmail(response.data.Email);
                    setPassport_Number(response.data.Passport_Number);
                    console.log(profile);
                }))
                    .catch(err => console.log(err))
            }
            else
                history.push('/Login');
        })

    },[])

    const editProfile = () => {
        const id = profile._id;
        axios.put(`http://localhost:3001/editProfile/${id}`, {
            First_Name: First_Name,
            Last_Name: Last_Name,
            Passport_Number: Passport_Number,
            Email: Email,
        })
        history.push('/User');
    }
    const discard = () => {
        console.log("discard changes");
        history.push('/User');
    }
    
 <div>
    <div className="banners">
    <div className="container">
        <br />
          <h1 className="homePage">Home Page</h1>
          {/* <label>Continue As:</label> */}
         <div><button className="buttonHome" onClick={() => {history.push('/Hpage');}}>Admin</button>
        <br/>
        <br/>
      <button className="buttonHome" onClick={() =>{history.push('/User');}}>User</button>
      </div>
  </div>
  </div>
   </div>
    return (
        <div>
            <div className="bannerProfile">
                <div className="containerProfile">
                <h1>Profile</h1>
            <div>
                    <form className="formProfile">
                        <div className="item">
                            <div>
                            <label>First Name</label>
                            <input type="text" className="inputProfile" name="First Name" required={true} defaultValue={First_Name} onChange={(event) => { setFirst_Name(event.target.value); setDisabled(false); }}></input>
                            </div>
                             <div>
                            <label>Last Name</label>
                            <input type="text" className="inputProfile" name="Last Name" required={true} defaultValue={Last_Name} onChange={(event) => { setLast_Name(event.target.value); setDisabled(false); }}></input>
                            </div>
                             <div>
                            <label>Passport Number</label>
                            <input type="text" className="inputProfile" name="Passport Number " required={true} defaultValue={Passport_Number} onChange={(event) => { setPassport_Number(event.target.value); setDisabled(false); }}></input>
                            </div>
                             <div>
                            <label>Email</label>
                            <input type="text" className="inputProfile" name="Email" required={true} defaultValue={Email} onChange={(event) => { setEmail(event.target.value); setDisabled(false); }}></input>
                            </div>
                            <div>
                            <button id="discard" className="buttonDiscard" onClick={discard} disabled={disabled}>Discard Changes</button>
                            <button className="buttonProfile" onClick={editProfile}>Save Changes</button>
                            </div>
                        </div>
                    </form>
                {/* })} */}
            </div>
        </div>
        </div>
            </div>
    );
}