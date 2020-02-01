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

export default function TabsContainer() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getGroups = () => ['Web', 'Core', 'Scanner'];
  const getTeams = () => [
    ['Web', 'Spiders'],
    ['Web', 'Sharks'],
    ['Web', 'Threads'],
    ['Core', 'Gold Strikers'],
    ['Core', 'Goblins'],
    ['Core', 'Blues'],
    ['Scanner', 'Seals'],
    ['Scanner', 'Team 13'],
  ];
  const getReleasesNames = () => ['20A5','20B', '20C'];
  const getReleasesdates = () => [
    ['2/2/2020', '1/3/2020'],
    ['14/2/2020', '1/4/2020'],
    ['2/4/2020', '1/8/2020']
  ];
  const getCapacity = (team) => {
    switch (team) {
      case 'Spiders': return [['5', '5'],['5', '5'],['5', '5']];
      case 'Sharks': return [['5', '5'],['5', '5'],['5', '5']];
      case 'Threads': return [['5', '5'],['5', '5'],['5', '5']];
      default: return [['5', '5'],['5', '5'],['5', '5']];
      
    }
  }
  const getDevsAndSkillsets = () => ['shay-FS', 'lior-FE'];
  const getWeekDates = () => ['w5', 'w6','w7', 'w8','w9', 'w10','w11', 'w12'];
  const getEpicNames = () => ['snapshot w2', 'patient-mgmt with IDS', 'texture mapping', 'accnt management'];
  const getEpicsData = () => [
    ['20A5', '100', 'ortho', '3', '1', '2', '1', '5', '1', '0', '1', '0', '1', '0', '1', '0'],
    ['20B', '200', 'resto', '2', '1', '2', '1', '3', '1', '4', '1', '5', '1', '6', '1','7'],
    ['20B', '200', 'resto', '2', '1', '2', '1', '3', '1', '4', '1', '5', '1', '6', '1','7'],
    ['20B', '200', 'resto', '2', '1', '2', '1', '3', '1', '4', '1', '5', '1', '6', '1','7'],
    ['20B', '200', 'resto', '2', '1', '2', '1', '3', '1', '4', '1', '5', '1', '6', '1','7']
  ];
  const getPlanningData = () => [
    ['1', '2'],
    ['3', '4'],
    ['1', '2'],
    ['3', '4'],
    ['1', '2'],
    ['3', '4'],
    ['1', '2'],
    ['3', '4'],
  ];

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
          rowHeaders={getDevsAndSkillsets()}
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
          columnHeaders={[
            'Release',
            'priority',
            'Program',
            'FE est',
            'FE max parallel',
            'BE est',
            'BE max parallel',
            'Core est',
            'Core max parallel',
            'Scanner est',
            'Scanner max parallel',
            'MSK est',
            'MSK max parallel',
            'ALG est',
            'ALG max parallel',
            'preferred teams'
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
          columnHeaders={getDevsAndSkillsets('Spiders')}
          rowHeaders={getWeekDates('Spiders')}
          isEditable="true"
          onCellChanged={handlePlanningChange}
        >
          {getPlanningData('Spiders')}
        </GenericTable>
      </TabPanel>
    </div>
  );
}
