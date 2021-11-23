import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import CreateFlight from "./Components/CreateFlight";
import test from "./Components/test";
import Test2 from "./Components/test2";
import view_schedule from "./Components/Schedule";

// <Route exactpath = "/CreateFlight" component={CreateFlight}/>
// if you got here that means I am crying 
// Hallo
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
       
         <Route exactpath = "/view_schedule" component={view_schedule}/>
        
          </Switch>
        </Router>
    </div>
  );
}

export default App;
