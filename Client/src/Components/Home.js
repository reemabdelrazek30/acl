//import Style from './Nstyle.css'
import { useHistory } from 'react-router-dom';
import Axios from "axios";


import './Home.css';
export default function Home (){
    let history = useHistory();

    const del=() =>{
        
   //     Axios.delete(`http://localhost:3001/deleteticket1/${"61c59916f474b6353ab4e786"}`);      
        Axios.delete(`http://localhost:3001/deleteticket/${"9ca02ae3"}/${"61c59916f474b6353ab4e786"}`);    
    } 
return(
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
);

}