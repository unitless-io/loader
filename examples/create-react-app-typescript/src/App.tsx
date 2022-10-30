import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';
import { sum } from './utils/sum';

function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
      <main>
        <input value={a} type="number" onChange={(e) => setA(+e.currentTarget.value)} />
        +
        <input value={b} type="number" onChange={(e) => setB(+e.currentTarget.value)} /> = {sum(a, b)}
      </main>
    </div>
  );
}

export default App;
