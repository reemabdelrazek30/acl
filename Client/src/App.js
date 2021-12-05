import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import CreateFlight from "./Components/CreateFlight";

import view_schedule from "./Components/Schedule";
import Home_page from "./Components/Hpage"
import Flight from "./Components/Flight"
import Home from './Components/Home';
import User from './Components/User';
import Reserve_FLight from './Components/Reserve_FLight';

import View_FLight from './Components/View_FLight';
import payment from './Components/Payment';
// import ReserveSeats from './Components/ReserveSeats';
import Salma from './Components/salma';
import Summary from './Components/Summary_reserved_flights';




// <Route exactpath = "/CreateFlight" component={CreateFlight}/>
// if you got here that means I am crying 
// Hallo
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
         {/* <Route exact path="/ReserveSeats" component={ReserveSeats}/> */}
         <Route exact path="/salma" component={Salma}/>
         {/* <Route exact path = "/View_FLight" component={View_FLight}/> */}
         <Route exact path = "/Summary_reserved_flights" component={Summary}/>

         <Route exact path = "/payment" component={payment}/>
         


        
          </Switch>
        </Router>
    </div>
  );
}

export default App;
