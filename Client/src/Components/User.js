
//import Style from './Nstyle.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function User() {
    let history = useHistory();
    const [clicked, setClicked] = useState(false)
    return (

        <div >

            <br />
            <br />
            <div>
                <label>User page</label>
            </div>
            <br />
            <div><button onClick={() => { history.push('/Reserve_FLight'); }}>Reserve FLight</button>
                <br />
                <button onClick={() => { history.push('/Profile'); }}>view Profile</button>
            </div>


        </div>
    );

}