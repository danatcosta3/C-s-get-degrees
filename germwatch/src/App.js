<<<<<<< Updated upstream
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import Header from './components/common/header';
import Footer from './components/common/footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes />
      <Footer />
    </Router>
=======
import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import About from 'About.js';
import Map from 'Map.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <b>GermWatch</b>
        </p>
          <input type="text" placeholder="Enter City:" />
          <Router>
          < >
            <Navigation />
            <UpButton />
            <Switch>
              <Route path=/>
            </Switch>
          </>
        </Router>
          <button>-{'>'}</button>
      </header>
    </div>
>>>>>>> Stashed changes
  );
}

export default App;
