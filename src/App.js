import React from 'react';
import './App.css';
import { db } from './release_planner_db.js';

function App() {
  return (
    <div className="App">
      <hr /><h1>Groups:</h1>
      <div className="Table">
        {db.groups.map((groupName, index) => {
          return (
              <div className="RowHeader" key={index}>
                {groupName}
              </div>
          );
        })};
      </div>
    </div>
  );
}

export default App;


