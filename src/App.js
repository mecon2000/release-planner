import React from 'react';
import logo from './logo.svg';
import './App.css';
import CapacityRow from './CapacityRow';
import Db from './release_planner_db.js';

function getDevsList() {
  const devs = [];
  for (let team of Db.devsCapacity.teams) {
    for (let member of team.members) {
      devs.push(member);
    }
  }
  return devs;
}

function App() {
  const devs = getDevsList();
  console.log('ddddddddddddd', devs);

  return (    
    <div className="App">
      <header className="App-header">        
        {devs.map((value, index) => {
        return <CapacityRow key={index} resource={value} />
      })}
      </header>
      
    </div>
  );
}

export default App;


