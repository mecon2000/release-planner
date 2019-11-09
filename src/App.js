import React from 'react';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './App.css';
import { db } from './release_planner_db.js';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'


function App() {
  return (
    <div className="App">
      <hr /><h1>Groups:</h1>
      <div cla ssName="Table">
        {db.groups.map((groupName, index) => {
          return (
            <div className="RowHeader" key={index}>
              {groupName}
            </div>
          );
        })};
      </div>

      <hr /><h1>Groups:</h1>
      <div className="responsiveTable"></div>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {db.groups.map((groupName, index) => {
            return (
              <Tr>
                <Td key={index}>{groupName}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
}

export default App;


