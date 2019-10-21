import React from 'react';
import './App.css';
import CapacityRow from './CapacityRow';
import Db from './release_planner_db.js';

function getDevsList() {
  const devs = [];
  for (let team of Db.devsCapacity.teams) {
    for (let member of team.members) {
      member.team = team.name;
      devs.push(member);
    }
  }
  return devs;
}

function App() {
  const devs = getDevsList();
  
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


