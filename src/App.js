// import logo from './logo.svg';
import { BrowserRouter as Router, 
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Footer from './Footer';
import Home from './Home';
import ExchangeRates from './exchangeRates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'


function App() {
  return (
    <Router>
      <div className="App">
        <div className="container-fluid" id="top-banner">
                  
            <p className="pt-2 pb-2"><FontAwesomeIcon icon={faChartLine} />  data provided by: <a href="https://exchangeratesapi.io/">Exchange Rates API</a></p> 
        </div>
        <nav className="navbar navbar-expand-lg">
          <div className="container pt-4">
            <Link to='/' className="navbar-brand font-weight-bold">HowMuch?</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to='/' className="nav-link">Convert</Link>
                </li>
                <li className="nav-item">
                  <Link to='/exchange-rates' className="nav-link">Exchange Rates</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/exchange-rates'>
            <ExchangeRates />
          </Route>
        </Switch>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
