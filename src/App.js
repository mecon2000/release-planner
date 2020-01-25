import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./App.css";
import { connectToDb, getFullDB, updateFullDB, resetToInitialDB, getTeams, addTeam, getGroups } from "./dbHelper.js";
import { useStyles } from "./GeneralStyles.js";
import { TabPanel } from "./TabPanel.js";
import { initialDb } from "./release_planner_db.js";
import { Teams } from "./Tabs/Teams.js";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

//TODO this should become several unit-tests
// async function playWithDb() {
//   connectToDb();
//   await resetToInitialDB();

//   const teams = await getTeams();
//   console.log(`%cBEFORE: ${JSON.stringify( teams)}`, 'background: yellow; color: red; font-size: large');
  
//   await addTeam('someTeam', 'someGroup');

//   const teams2 = await getTeams();
//   console.log(`%cAFTER: ${JSON.stringify(teams2)}`, 'background: yellow; color: red; font-size: large');
 
  // const groups = await getGroups();
  // console.log(`%c${JSON.stringify(groups)}`, 'background: yellow; color: red; font-size: large');
  
  //let someDB = await getDB();
  //let newDB = {bla:true, blaaa:false};
  //newDB.born = newDB.born+1; 
  //await updateDB(newDB);
//}

//playWithDb();

//props for accessibility:
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function SimpleTabs() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(1);
  const [db, setDb] = React.useState(initialDb);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="simple tabs example"
        >
          <Tab label="Groups" {...a11yProps(0)} />
          <Tab label="Teams" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={selectedTab} index={0}>
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
                <Tr key={index}>
                  <Td key={"group" + index}>{groupName}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <Teams />
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
