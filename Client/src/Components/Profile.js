import React, { useEffect } from 'react'
import './createFlight.css';
import { useState } from "react";
import { useHistory } from 'react-router';
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
    }

    return (
        <div>
            <div class="banner">
                <h1> Profile</h1>
            </div>
            {/* <div class="item">
                <h2>Enter ( User ID ) to view profile details</h2>
                <input type="number" name="id" placeholder="User ID" onChange={(event) => {setID(event.target.value)}}></input>
            </div> */}
            <div class="item">
                {/* <button onClick={getProfile}>proceed</button> */}

                {/* {profile.map((val, key) => { */}
                    <form>
                        <div className="item">
                            {/* <h3> User ID : {val.User_id} </h3> */}
                            <input type="text" name="First Name" required={true} defaultValue={First_Name} onChange={(event) => { setFirst_Name(event.target.value) }}></input>
                            <input type="text" name="Last Name" required={true} defaultValue={Last_Name} onChange={(event) => { setLast_Name(event.target.value) }}></input>
                            <input type="text" name="Passport Number " required={true} defaultValue={Passport_Number} onChange={(event) => { setPassport_Number(event.target.value) }}></input>
                            <input type="text" name="Email" required={true} defaultValue={Email} onChange={(event) => { setEmail(event.target.value) }}></input>
                            <button onClick={editProfile}>Edit Data</button>
                        </div>
                    </form>
                {/* })} */}
            </div>
        </div>
    );
}