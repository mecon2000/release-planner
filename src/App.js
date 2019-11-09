import React from 'react';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './App.css';
import { db } from './release_planner_db.js';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'


function App() {
  return (
    <div className="App">
      <hr /><h1>Groups:</h1>
      <div cla  ssName="Table">
        {db.groups.map((groupName, index) => {
          return (
            <div className="RowHeader" key={index}>
              {groupName}
            </div>
          );
        })};
      </div>
      <div className="responsiveTable"></div>
      <Table>
        <Thead>
          <Tr>
            <Th>Event</Th>
            <Th>Date</Th>
            <Th>Location</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Tablescon</Td>
            <Td>9 April 2019</Td>
            <Td>East Annex</Td>
          </Tr>
          <Tr>
            <Td>Capstone Data</Td>
            <Td>19 May 2019</Td>
            <Td>205 Gorgas</Td>
          </Tr>
          <Tr>
            <Td>Tuscaloosa D3</Td>
            <Td>29 June 2019</Td>
            <Td>Github</Td>
          </Tr>
        </Tbody>
      </Table>
    </div>
  );
}

export default App;


