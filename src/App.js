import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./App.css";
import { dbService } from "./dbService.js";
import { useStyles } from "./GeneralStyles.js";
import { TabPanel } from "./TabPanel.js";
import { initialDb } from "./release_planner_db.js";
import { GenericTable } from "./Tabs/GenericTable.js";

dbService.connectToDb();
//dbService.resetToInitialDB();

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

export default function TabsContainer() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(1);
  const [db, setDb] = React.useState(initialDb);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getGroups = () => ["Web", "Core"];
  const getTeams = () => [
    ["Web", "Spiders"],
    ["Web", "Sharks"]
  ];
  const getReleasesNames = () => ["20B", "20C"];
  const getReleasesdates = () => [
    ["1/1/2020", "4/1/2020"],
    ["5/1/2020", "9/1/2020"]
  ];
  const getCapacity = () => [
    ["5", "3"],
    ["1", "2"],
    ["1", "11"]
  ];
  const getDevsAndSkillsets = () => ["shay-FS", "lior-FE"];
  const getWeekDates = () => ["w1", "w2"];
  const getEpicNames = () => ["snapshot", "patient-search"];
  const getEpicsData = () => [
    "epicData1",
    "epicData2",
    "epicData3",
    "epicData4",
    "epicData5",
    "epicData6"
  ];
  const getPlanningData = () => [
    ["1", "2"],
    ["3", "4"]
  ];

  const _log = (newVal, rowNumber, columnNumber) => {
    console.log(
      `%cVal changed!! ${newVal}, ${rowNumber}, ${columnNumber}`,
      "color: orange;"
    );
  };
  const handleCapacityChange = (newVal, rowNumber, columnNumber) => {
    _log(newVal, rowNumber, columnNumber);
  };
  const handleReleaseChange = (newVal, rowNumber, columnNumber) => {
    _log(newVal, rowNumber, columnNumber);
  };
  const handlePlanningChange = (newVal, rowNumber, columnNumber) => {
    _log(newVal, rowNumber, columnNumber);
  };
  const handleEpicChange = (newVal, rowNumber, columnNumber) => {
    _log(newVal, rowNumber, columnNumber);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="simple tabs example"
        >
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Capacity" {...a11yProps(1)} />
          <Tab label="Epics" {...a11yProps(2)} />
          <Tab label="Planning" {...a11yProps(3)} />
        </Tabs>
      </AppBar>

      {/* --------------- GENERAL TAB ----------------------------------------------------- */}
      <TabPanel value={selectedTab} index={0}>
        <GenericTable title="Groups" columnHeaders={["Name"]}>
          {getGroups()}
        </GenericTable>
        <br />

        <GenericTable title="Teams" columnHeaders={["Groups", "Name"]}>
          {getTeams()}
        </GenericTable>
        <br />

        <GenericTable
          title="Releases"
          columnHeaders={["Start date", "End date"]}
          rowHeaders={getReleasesNames()}
          isEditable="true"
          onCellChanged={handleReleaseChange}
        >
          {getReleasesdates()}
        </GenericTable>
      </TabPanel>

      {/* --------------- CAPACITY TAB ----------------------------------------------------- */}
      <TabPanel value={selectedTab} index={1}>
        {/* use 'for' here, take array of groups: */}
        <h1>Capacity:</h1>
        <GenericTable
          title="Spiders"
          columnHeaders={getWeekDates("Spiders")}
          rowHeaders={getDevsAndSkillsets("Spiders")}
          isEditable="true"
          onCellChanged={handleCapacityChange}
        >
          {getCapacity("Spiders")}
        </GenericTable>

        <GenericTable
          title="Sharks"
          columnHeaders={getWeekDates("Sharks")}
          rowHeaders={getDevsAndSkillsets("Sharks")}
          isEditable="true"
          onCellChanged={handleCapacityChange}
        >
          {getCapacity("Sharks")}
        </GenericTable>

        <GenericTable
          title="Threads"
          columnHeaders={getWeekDates("Threads")}
          rowHeaders={getDevsAndSkillsets()}
          isEditable="true"
          onCellChanged={handleCapacityChange}
        >
          {getCapacity("Threads")}
        </GenericTable>
      </TabPanel>

      {/* --------------- EPICS TAB ----------------------------------------------------- */}
      <TabPanel value={selectedTab} index={2}>
        <GenericTable
          title="Epics"
          columnHeaders={[
            "Release",
            "priority",
            "Pro)ram",
            "FE est",
            "BE est",
            "FS est",
            "Core est",
            "Scanner est",
            "MSK est",
            "ALG est"
          ]}
          rowHeaders={getEpicNames()}
          isEditable="true"
          onCellChanged={handleEpicChange}
        >
          {getEpicsData()}
        </GenericTable>
      </TabPanel>

      {/* --------------- PLANNING TAB ----------------------------------------------------- */}
      <TabPanel value={selectedTab} index={3}>
        {/* use 'for' here, take array of teams: */}
        <h1>Planning:</h1>
        <GenericTable
          title="Spiders"
          columnHeaders={getDevsAndSkillsets("Spiders")}
          rowHeaders={getWeekDates("Spiders")}
          isEditable="true"
          onCellChanged={handlePlanningChange}
        >
          {getPlanningData()}
        </GenericTable>
      </TabPanel>
    </div>
  );
}
