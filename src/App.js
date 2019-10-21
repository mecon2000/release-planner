import React from 'react';
import logo from './logo.svg';
import './App.css';
import CapacityRow from './CapacityRow';
import Db from './release_planner_db.js';

function App() {
  const spiders = Db.devsCapacity.teams.spiders;
  const availableDaysInWeek_forShay = []
  for (let sprint in spidersshay.capacity) {
    availableDaysInWeek_forShay.push(shay.capacity[sprint]);
  }
  console.log('ddddddddddddd', shay);
  
  const availableDaysInWeek = [5,3,2,5];
  return (    
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React2
        </a> */}
        <CapacityRow resourceName="Ron Ganot" availableDaysInWeek={availableDaysInWeek_forShay} />
        </header>
      
    </div>
  );
}

export default App;
