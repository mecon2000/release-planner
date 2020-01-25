import React from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { dbService } from "../dbService.js";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

export function Groups() {
  const [groups, setGroups] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const g = await dbService.getGroups();
      setGroups(g);
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    console.log(
      `%cmounted or updated. teams=${groups.length}`,
      "background: yellow; color: red;"
    );
  }, [groups]);

  return (
    <React.Fragment>
      <div className="responsiveTable"></div>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {groups.map((groupName, index) => {
              return (
                <Tr key={index}>
                  <Td key={"group" + index}>{groupName}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
    </React.Fragment>
  );
}
