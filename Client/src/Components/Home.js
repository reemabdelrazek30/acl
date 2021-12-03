import Style from './Nstyle.css'
import { useHistory } from 'react-router-dom';

export default function Home (){
    let history = useHistory();
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
      </div>
      
  
  </div>
);

}