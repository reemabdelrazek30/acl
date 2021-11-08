import './App.css';
import {BrowserRouter as Router,Route,Switch,} from "react-router-dom";
import CreateFlight from "./Components/CreateFlight";
import Flight from "./Components/Flight";
import Hpage from './Components/Hpage';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Hpage} />
        <Route exact path="/Flight" component={Flight} />
        <Route exact path="/CreateFlight" component={CreateFlight}/>
        {/* <Route exact path="/EditFlight" component={EditFlight}/> */}
      </Switch>
    </Router>

  );
}

export default App;
