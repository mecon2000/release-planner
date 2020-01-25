import React from "react";
import { cloneDeep } from "lodash";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
//import "./App.css";
import { dbService } from "../dbService.js";
import { DataAdder } from "./../DataAdder.js";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

export function Teams() {
  const [teams, setTeams] = React.useState([]); //getTeams());
  const [canAddATeam, setCanAddATeam] = React.useState(false); //isTeamsEnabledForEditing());

  //TODO should wait with rendering until actually getting data?
  React.useEffect(() => {
    const fetchData = async () => {
      const t = await dbService.getTeams();
      setTeams(t);
      const a = await dbService.isTeamsEnabledForEditing();
      setCanAddATeam(a);
    };
    fetchData();
  }, []);

  const handleAddingTeam = (event, data) => {
    let newTeamsList = cloneDeep(teams);
    newTeamsList.push({ name: data.field0, group: data.field1 });
    setTeams(newTeamsList);
    dbService.addTeam(data.field0, data.field1); //TODO should be in useeffect, but howdo i differentiate with updating because of fetch?
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
          {teams
            ? teams.map((team, index) => {
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
              })
            : ""}
        </Tbody>
      </Table>
      {canAddATeam ? (
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
