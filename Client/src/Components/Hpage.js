import './Hpage.css';
import { useHistory } from 'react-router-dom';

function Hpage() {

  let history = useHistory();
  const url = "/SeatsMap?id=61a237d550b6c1fcd7df6e7b";
  return (
    <div className="Hpage">
      <div className="Data">
        <label>Home Page</label>
        <button onClick={() => {history.push('/Flight');}}>View Flights</button>
        <button onClick={() =>{history.push('/CreateFlight');}}>Create Flight</button>
        
        <button onClick={() =>{history.push(url);}}>Reserve Seats</button>
      </div>  
    </div>
  );
}

export default Hpage;

            