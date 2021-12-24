import { useHistory } from 'react-router-dom';
import './Hpage.css'
function Hpage() {

  let history = useHistory();

  return (
    <div>
    <div className="banners">
    <div className="container">
    <form action ="/">
        <h1 className="homePage">Home Page</h1>
      <div className="item">
        <div><button className="buttonHpage" onClick={() => {history.push('/Flight');}}>View Flights</button></div>
        <div><button className="buttonHpage" onClick={() =>{history.push('/CreateFlight');}}>Create Flight</button></div>
        <div><button className="buttonHpage" onClick={() => {history.push('/changePassword')}}>Change Password</button></div>
      </div>
    </form>
    </div>
    </div>
    </div>
  );
}

export default Hpage;

            