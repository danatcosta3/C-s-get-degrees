import logo from './logo.svg';
import './App.css';

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
              <Route path="/" exact component={Home} />
              <Route path="/research" component={Research} />
              <Route path="/publications" component={Publications} />
              <Route path="/student" component={Student} />
              <Route path="/about" component={About} />
            </Switch>
          </>
        </Router>
          <button>-{'>'}</button>
      </header>
    </div>
  );
}

export default App;
