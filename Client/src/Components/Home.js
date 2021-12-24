//import Style from './Nstyle.css'
import { useHistory } from 'react-router-dom';
import './Home.css';
export default function Home (){
    let history = useHistory();
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