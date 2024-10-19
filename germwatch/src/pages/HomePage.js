import React from 'react';

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <b>GermWatch</b>
        </p>
          <input type="text" placeholder="Enter City:" />
          <button>-{'>'}</button>
      </header>
    </div>
  );
}

export default HomePage;
