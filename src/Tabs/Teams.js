import React from "react";
import { cloneDeep } from "lodash";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
//import "./App.css";
import { initialDb } from "./../release_planner_db.js"; //TODO don't use relative, start from root
import { DataAdder } from "./../DataAdder.js";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

export function Teams() {
  const [db, setDb] = React.useState(initialDb);

  const handleAddingTeam = (event, data) => {
    //TODO must be a better way
    let newDb = cloneDeep(db);
    newDb.teams.data.push({ name: data.field0, group: data.field1 });
    setDb(newDb);
  };

  return (
    <React.Fragment>
      <div className="responsiveTable"></div>
      <Table>
        <Thead>
          <Tr>
            <Th width="10%">Name</Th>
            <Th width="90%">Belongs to</Th>
          </Tr>
        </Thead>
        <Tbody>
          {db.teams.data.map((team, index) => {
            return (
              <Tr key={index}>
                <Td key={index} width="10%">
                  {team.name}
                </Td>
                <Td key={index} width="90%">
                  {team.group}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {db.teams.enableEditing ? (
        <DataAdder
          onAddClicked={handleAddingTeam}
          fields={["Add a team name", "belongs to which group?"]}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
