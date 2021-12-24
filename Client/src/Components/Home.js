//import Style from './Nstyle.css'
import { useHistory } from 'react-router-dom';
import Axios from "axios";


export default function Home (){
    let history = useHistory();

    const del=() =>{
        
   //     Axios.delete(`http://localhost:3001/deleteticket1/${"61c59916f474b6353ab4e786"}`);      
        Axios.delete(`http://localhost:3001/deleteticket/${"9ca02ae3"}/${"61c59916f474b6353ab4e786"}`);    
    } 
return(
    <div >
         <br/>
         <br/>
   <div>
          <label>Home Page</label>
          {/* <h2>
     Click me!
      </h2> */}
          </div>
          <br/>
         <div><button onClick={() => {history.push('/Hpage');}}>Admin</button>
        <br/>
        <br/>
      <button onClick={() =>{history.push('/User');}}>User</button>

      <button onClick={() =>{del()}}>delte ticket</button>
      </div>
      
  
  </div>
);

}