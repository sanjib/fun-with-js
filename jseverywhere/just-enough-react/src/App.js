import React from 'react';
import './App.css';

// Local imports
import Sparkle from './Sparkle';

function App() {
  const name = 'Sanjib';
  const now = String(new Date());
  return (
    <div className='App'>
      <p>Hello {name}!</p>
      <p>The current time is {now}</p>
      <p>2 + 2 = {2 + 2}</p>
      <Sparkle />
    </div>
  );
}

export default App;
