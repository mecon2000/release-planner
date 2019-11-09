import React from 'react';
import Button from '@material-ui/core/Button';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './App.css';
import { db } from './release_planner_db.js';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'


function App() {
  return (
    <div className="App">
      <hr /><h1>Groups:</h1>
      <div cla ssName="Table">
        {db.groups.data.map((groupName, index) => {
          return (
            <div className="RowHeader" key={index}>
              {groupName}
            </div>
          );
        })};
      </div>

      <hr />
      <h1>Groups:</h1>
      <div className="responsiveTable"></div>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {db.groups.data.map((groupName, index) => {
            return (
              <Tr>
                <Td key={index}>{groupName}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <hr />

      <h1>Teams:</h1>
      <div className="responsiveTable"></div>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Belongs to</Th>
          </Tr>
        </Thead>
        <Tbody>
          {db.teams.data.map((team, index) => {
            return (
              <Tr>
                <Td key={index}>{team.name}</Td>
                <Td key={index + db.teams.data.length}>{team.group}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      {db.teams.enableEditing ? (
      <Button variant="contained" color="primary">
        Add
      </Button>) : "" }

    </div >
  );
}

export default App;


