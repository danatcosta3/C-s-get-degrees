import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Map from 'Map.js'

function HomePage() {
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
              <Route path="/Map" component={Map}/>
            </Switch>
          </>
        </Router>
          <button>-{'>'}</button>
      </header>
    </div>
  );
}

export default HomePage;
