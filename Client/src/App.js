import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import CreateFlight from "./Components/CreateFlight";
import Flight from "./Components/Flight";
import Flight_schedule from './Components/FlightSchedule';
import Profile from './Components/Profile';
import Home_page from "./Components/Hpage"
import Home from './Components/Home';
import User from './Components/User';
import Reserve_FLight from './Components/ReserveFlight';
import {Payment} from './Components/Payment';
// import ReserveSeats from './Components/ReserveSeats';
import ReserveSeats from './Components/ReserveSeats';
import Salma from './Components/salma';
import Summary from './Components/Summary';
import { Login } from './Components/Login';
import { Register } from './Components/Register';
import ViewFlight from './Components/ViewFlight'
import ViewFlights from './Components/ViewFlights';
import StripeContainer from './Components/StripeContainer';
import PaymentForm from './Components/PaymentForm';
import Changedepartureflight from './Components/Changedepartureflight';
import Viewavailabledepflights from './Components/Viewavailabledepflights';
import Viewavailablereturnflights from './Components/Viewavailablereturnflights';
import ChangeReturnFlight from './Components/ChangeReturnFlight';
import changePassword from './Components/ChangePassword';
import FlightCreationSuccessful from './Components/FlightCreationSuccessful';
import logout from './Components/Logout';
import loginAdmin from './Components/LoginAdmin';

// <Route exactpath = "/CreateFlight" component={CreateFlight}/>
// if you got here that means I am crying 
// Hallo
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>  
        <Route exact path = "/" component={Home}/>
        <Route exact path = "/Login" component={Login}/>
         {/* <Route exact path = "/" component={Home}/> */}
         <Route exact path = "/Hpage" component={Home_page}/>
         <Route exact path = "/CreateFlight" component={CreateFlight}/>
         <Route exact path = "/Flight" component={Flight}/>
         <Route exact path = "/User" component={User}/>
         <Route exact path = "/ReserveFlight" component={Reserve_FLight}/>
         <Route exact path = "/ViewFlight" component={ViewFlight}/>
         <Route exact path = "/ViewFLights" component={ViewFlights}/>
         <Route exact path="/FlightSchedule" component={Flight_schedule}/>
         <Route exact path="/Profile" component={Profile}/>
         <Route exact path = "/Summary" component={Summary}/>
         <Route exact path="/ReserveSeats" component={ReserveSeats}/>
         {/* <Route exact path = "/View_FLight" component={View_FLight}/> */}
         <Route exact path = "/payment" component={Payment}/>
         <Route exact path = "/Login" component={Login}/>
         <Route exact path = "/Register" component={Register}/>
         <Route exact path = "/salma" component={Salma}/>
         <Route exact path = "/StripeContainer" component={StripeContainer}/>
         <Route exact path = "/PaymentForm" component={PaymentForm}/>
         <Route exact path = "/cdf" component={Changedepartureflight}/>
         <Route exact path = "/vadf" component={Viewavailabledepflights}/>
         <Route exact path = "/crf" component={ChangeReturnFlight}/>
         <Route exact path = "/varf" component={Viewavailablereturnflights}/>
         <Route exact path = '/ChangePassword' component={changePassword}/>
         <Route exact path = '/FlightCreationSuccessful' component={FlightCreationSuccessful}/>
         <Route exact path = '/Logout' component={logout}/>
         <Route exact path = '/loginAdmin' component={loginAdmin}/>
        
          </Switch>
        </Router>

    </div>
  );
}

export default App;
