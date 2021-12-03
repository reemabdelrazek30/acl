import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import CreateFlight from "./Components/CreateFlight";
import Flight from "./Components/Flight";
import Flight_schedule from './Components/Flight_schedule';
import Profile from './Components/Profile';
import Home_page from "./Components/Hpage"
import Home from './Components/Home';
import User from './Components/User';
import Reserve_FLight from './Components/Reserve_FLight';

import View_FLight from './Components/View_FLight';
import test from './Components/test';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
       
         <Route exact path = "/" component={Home}/>
         <Route exact path = "/Hpage" component={Home_page}/>
         <Route exact path = "/CreateFlight" component={CreateFlight}/>
         <Route exact path = "/Flight" component={Flight}/>
         <Route exact path = "/User" component={User}/>
         <Route exact path = "/Reserve_FLight" component={Reserve_FLight}/>
         <Route exact path = "/View_FLight" component={View_FLight}/>
         <Route exact path = "/test" component={test}/>
         <Route exact path="/Flightschedule" component={Flight_schedule}/>
         <Route exact path="/Profile" component={Profile}/>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
