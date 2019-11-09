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
      <hr /><h1>Using DB cells</h1>
      <div className="CapacityTable">
        {devs.map((value, index) => {
          return (
            <React.Fragment>
              <div className="RowHeader" key={index}>
                {value.team}, {value.name} ({value.skill})
              </div>
              {value.capacity.map((v2, i2) => {
                return (
                  <div className="OneCell" key={i2}>{v2.availableDays}</div>
                );
              })};
            </React.Fragment>
          );
        })};
      </div>
    </div>
  );
}

export default App;


