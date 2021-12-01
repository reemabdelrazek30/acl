import { useHistory } from 'react-router-dom';

function Hpage() {

  let history = useHistory();

  return (
    <form action ="/">
      <div className="banner">
        <h1>Home Page</h1>
      </div>
      <div className="item">
        <button onClick={() => {history.push('/Flight');}}>View Flights</button>
        <button onClick={() =>{history.push('/CreateFlight');}}>Create Flight</button>
      </div>
    </form>
  );
}

export default Hpage;

            