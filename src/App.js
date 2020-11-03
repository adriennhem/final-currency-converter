import logo from './logo.svg';
import { BrowserRouter as Router, 
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Footer from './Footer';
import Home from './Home';
import ExchangeRates from './exchangeRates';


function App() {
  return (
    <Router>
      <div className="App">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link to='/' className="navbar-brand">MyCurrencyConverter</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <Link to='/' className="nav-link">Home</Link>
              </li>
              <li class="nav-item">
                <Link to='/exchange-rates' className="nav-link">Exchange Rates</Link>
              </li>
            </ul>
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
