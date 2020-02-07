import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './App.css';
import { dbService } from './dbService.js';
import { useStyles } from './GeneralStyles.js';
import { TabPanel } from './Tabs/TabPanel.js';
import { GenericTable } from './Tabs/GenericTable.js';

import {
  calculatePlanning,
  getEpicsData,
  convertToFlatArray,
  getCapacity,
  getDevsAndSkillsets,
  getWeekDates,
  getReleasesdates,
  getReleasesNames,
  getTeams,
  getGroups,
  getEpicNames,
  getEpicsHeaders
} from './TempLogic';

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
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const initialTab = 3;

export default function TabsContainer() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(initialTab);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const _log = (newVal, rowHeader, columnHeader) => {
    console.log(`%cVal changed!! ${newVal}, ${rowHeader}, ${columnHeader}`, 'color: orange;');
  };
  const handleCapacityChange = (newVal, rowHeader, columnHeader) => {
    _log(newVal, rowHeader, columnHeader);
    //dbService.setDevCapacityFor1Week()
  };
  const handleReleaseChange = (newVal, rowHeader, columnHeader) => {
    _log(newVal, rowHeader, columnHeader);
    //dbService.
  };
  const handlePlanningChange = (newVal, rowHeader, columnHeader) => {
    _log(newVal, rowHeader, columnHeader);
    //dbService.
  };
  const handleEpicChange = (newVal, rowHeader, columnHeader) => {
    _log(newVal, rowHeader, columnHeader);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="simple tabs example">
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Capacity" {...a11yProps(1)} />
          <Tab label="Epics" {...a11yProps(2)} />
          <Tab label="Planning" {...a11yProps(3)} />
        </Tabs>
      </AppBar>

      {/* --------------- GENERAL TAB ----------------------------------------------------- */}
      <TabPanel value={selectedTab} index={0}>
        <GenericTable title="Groups" columnHeaders={['Name']}>
          {getGroups()}
        </GenericTable>
        <br />

        <GenericTable title="Teams" columnHeaders={['Groups', 'Name']}>
          {getTeams()}
        </GenericTable>
        <br />

        <GenericTable
          title="Releases"
          columnHeaders={['Start date', 'End date']}
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
          columnHeaders={getWeekDates('Spiders')}
          rowHeaders={getDevsAndSkillsets('Spiders')}
          isEditable="true"
          onCellChanged={handleCapacityChange}
        >
          {getCapacity('Spiders')}
        </GenericTable>

        <GenericTable
          title="Sharks"
          columnHeaders={getWeekDates('Sharks')}
          rowHeaders={getDevsAndSkillsets('Sharks')}
          isEditable="true"
          onCellChanged={handleCapacityChange}
        >
          {getCapacity('Sharks')}
        </GenericTable>

        <GenericTable
          title="Threads"
          columnHeaders={getWeekDates('Threads')}
          rowHeaders={getDevsAndSkillsets('Threads')}
          isEditable="true"
          onCellChanged={handleCapacityChange}
        >
          {getCapacity('Threads')}
        </GenericTable>
      </TabPanel>

      {/* --------------- EPICS TAB ----------------------------------------------------- */}
      <TabPanel value={selectedTab} index={2}>
        <GenericTable
          title="Epics"
          columnHeaders={getEpicsHeaders()}
          rowHeaders={getEpicNames()}
          isEditable="true"
          onCellChanged={handleEpicChange}
        >
          {convertToFlatArray(getEpicsData())}
        </GenericTable>
      </TabPanel>

      {/* --------------- PLANNING TAB ----------------------------------------------------- */}
      <TabPanel value={selectedTab} index={3}>
        <h1>Planning:</h1>

        {['Spiders', 'Sharks', 'Threads'].map(teamName => (
          <GenericTable
            title={teamName}
            columnHeaders={getDevsAndSkillsets(teamName)}
            rowHeaders={getWeekDates(teamName)}
            isEditable="true"
            onCellChanged={handlePlanningChange}
          >
            {calculatePlanning(teamName)}
          </GenericTable>
        ))}
      </TabPanel>
    </div>
  );
}
