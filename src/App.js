import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./App.css";
import { connectToDb, getDB, updateDB } from "./dbHelper.js";
import { useStyles } from "./GeneralStyles.js";
import { TabPanel } from "./TabPanel.js";
import { initialDb } from "./release_planner_db.js";
import { Teams } from "./Tabs/Teams.js";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

async function playWithDb() {
  console.log("s-------");
  connectToDb();
  console.log("1-------");

  let someDB = await getDB();
  console.log(someDB);
  console.log("2-------");
  await updateDB({
    first: "RONNIE",
    last: "GA",
    born: 1815
  });
  console.log("e-------");
}

playWithDb();

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
