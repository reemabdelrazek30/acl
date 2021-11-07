import './App.css';
import {BrowserRouter as Router,Route,Switch, Link} from "react-router-dom";
import CreateFlight from "./Components/CreateFlight";
import Flight from "./Components/Flight";
import EditFlight from './Components/EditFlight';

// if you got here that means I am crying 
// Hallo
function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/addFlight">Create A Flight</Link>
            </li>
            <li>
              <Link to="/allFlights">View All Flights</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/addFlight">
            <CreateFlight />
          </Route>
          <Route path="/allFlights">
            <Flight />
          </Route>
        </Switch>
      </div>
    </Router>
    
    </div>
  );
}

export default App;