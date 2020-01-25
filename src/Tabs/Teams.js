import React from "react";
import { cloneDeep } from "lodash";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
//import "./App.css";
import { getTeams, addTeam, isTeamsEnabledForEditing } from "../dbService.js/index.js";
import { DataAdder } from "./../DataAdder.js";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

export function Teams() {
  const [teams, setTeams] = React.useState([]); //getTeams());
  const [canAddATeam, setCanAddATeam] = React.useState(false); //isTeamsEnabledForEditing());

  //TODO should wait with rendering until actually getting data?
  React.useEffect(() => {
    console.log("mounted, WILL BE CALLED ONLY ONCE");
    const fetchData = async () => {
      const t = await getTeams();
      setTeams(t);
      const a = await isTeamsEnabledForEditing();
      setCanAddATeam(a);
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    console.log(
      `%cmounted or updated. teams=${teams.length}, canAddATeam=${canAddATeam}`,
      "background: yellow; color: red;"
    );
  }, [teams, canAddATeam]);

  const handleAddingTeam = (event, data) => {
    let newTeamsList = cloneDeep(teams);
    newTeamsList.push({ name: data.field0, group: data.field1 });
    setTeams(newTeamsList);
    addTeam(data.addInputField0, data.addInputField1); //TODO should be in useeffect, but howdo i differentiate with updating because of fetch?
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
