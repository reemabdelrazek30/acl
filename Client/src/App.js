import './App.css';
import {BrowserRouter as Router,Route,Switch,} from "react-router-dom";
import CreateFlight from "./Components/CreateFlight";
import Flight from "./Components/Flight";
import Hpage from './Components/Hpage';
import Flight_schedule from './Components/Flight_schedule';



function App() {
  return (
    
    <Router>
      <Switch>
        <Route exact path='/' component={Hpage} />
        <Route exact path="/Flight" component={Flight} />
        <Route exact path="/CreateFlight" component={CreateFlight}/>
        <Route exact path="/Flightschedule" component={Flight_schedule}/>
      </Switch>
    </Router>

  );
}

export default App;
