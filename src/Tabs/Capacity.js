import React from "react";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { dbService } from "../dbService.js";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

export function Capacity() {
  const [capacityOfDevs, setCapacityOfDevs] = React.useState([]);
  const [canEditCapacity, setCanEditCapacity] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const cap = await dbService.getCapacityOfDevs();
      setCapacityOfDevs(cap);
      const a = await dbService.isDevsCapacityEnabledForEditing();
      setCanEditCapacity(a);
    };
    fetchData();
  }, []);

  //TODO no reason to do this more then once, just remember the answer
  const getMaxNumberOfWeeks = () => {
    if (!capacityOfDevs || capacityOfDevs.length === 0) return 0;

    return capacityOfDevs.reduce((maxWeeks, currentDevData) => {
      const lastWeekForCurrentDev = Object.keys(currentDevData.capacity)
        .map(w => parseInt(w.slice(1)))
        .reduce((a, c) => Math.max(a, c));
      return Math.max(maxWeeks, lastWeekForCurrentDev);
    }, 0);
  };

  const createCapacityHeaderElements = () => {
    const weeksHeaders = [];
    for (let i = 1; i <= getMaxNumberOfWeeks(); i++) {
      weeksHeaders.push(<Th width="5%">w{i}</Th>);
    }
    return weeksHeaders;
  };

  const createCapacityElementsFor1Dev = capacity => {
    const capacityElements = [];
    for (let i = 1; i <= getMaxNumberOfWeeks(); i++) {
      const cellData = capacity["w" + i] || '0';
      capacityElements.push(
        <Td key={i} width="5%">
          {cellData}
        </Td>
      );
    }
    return capacityElements;
  };

  // const handleAddingTeam = (event, data) => {
  //   let newTeamsList = cloneDeep(capacityOfDevs);
  //   newTeamsList.push({ name: data.field0, group: data.field1 });
  //   setCapacityOfDevs(newTeamsList);
  //   dbService.addTeam(data.field0, data.field1); //TODO should be in useeffect, but howdo i differentiate with updating because of fetch?
  // };

  //TODO width should be in a param that all adress it.

  return (
    <React.Fragment>
      <div className="responsiveTable"></div>
      <Table>
        <Thead>
          <Tr>
            <Th width="10%">Team</Th>
            <Th width="10%">Name</Th>
            {createCapacityHeaderElements()}
          </Tr>
        </Thead>
        <Tbody>
          {capacityOfDevs
            ? capacityOfDevs.map((devData, index) => {
                return (
                  <Tr key={index}>
                    <Td key={index} width="5%">
                      {devData.team}
                    </Td>
                    <Td key={index} width="5%">
                      {devData.name}
                    </Td>
                    {createCapacityElementsFor1Dev(devData.capacity)}
                  </Tr>
                );
              })
            : ""}
        </Tbody>
      </Table>
    </React.Fragment>
  );
}
