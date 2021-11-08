import './Hpage.css';
import { useHistory } from 'react-router-dom';

function Hpage() {

  let history = useHistory();

  return (
    <div className="Hpage">
      <div className="Data">
        <label>Home Page</label>
        <button onClick={() => {history.push('/Flight');}}>View Flights</button>
        <button onClick={() =>{history.push('/CreateFlight');}}>Create Flight</button>
      </div>  
    </div>
  );
}

export default Hpage;

            