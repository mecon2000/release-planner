import React, { useState, useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './App.css';
import { useStyles } from './GeneralStyles.js';
import { TabPanel } from './Tabs/TabPanel.js';
import { GenericTable } from './Tabs/GenericTable.js';

import { calculatePlanning, getDevsAndSkillsets } from './TempLogic';

//props for accessibility:
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const serverUrl = 'http://localhost:3333';
const initialTab = 2;

export default function TabsContainer() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(initialTab);

  //#region handlers
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const _log = (newVal, rowHeader, columnHeader) => {
    console.log(`%cVal changed!! ${newVal}, ${rowHeader}, ${columnHeader}`, 'color: orange;');
  };
  const handleCapacityChange = (newVal, rowHeader, columnHeader) => {
    _log(newVal, rowHeader, columnHeader);
  };
  const handleReleaseChange = (newVal, rowHeader, columnHeader) => {
    _log(newVal, rowHeader, columnHeader);
  };
  const handlePlanningChange = (newVal, rowHeader, columnHeader) => {
    _log(newVal, rowHeader, columnHeader);
  };
  const handleEpicChange = (newVal, rowHeader, columnHeader) => {
    _log(newVal, rowHeader, columnHeader);
  };
  //#endregion handlers
  const [groups, setGroups] = useState([]);
  const [teams, setTeams] = useState([]);
  const [releases, setReleases] = useState([]);
  const [weekDates, setweekDates] = useState([]);
  const [devs, setDevs] = useState([]);
  const [epics, setEpics] = useState([]);

  useEffect(() => {
    const fetchData = async (path, callback) => {
      const res = await fetch(serverUrl + path);
      const resObject = await res.json();
      callback && callback(resObject);
      //TODO handle error, if resObject is empty?
    };

    fetchData('/groups', g => setGroups(g));
    fetchData('/teams/withDevs', t => setTeams(t));
    fetchData('/releases', r => setReleases(r));
    fetchData('/weekDates', w => setweekDates(w));
    fetchData('/devs', d => setDevs(d));

    const priorityComparer = (epic1, epic2) => epic1.priority - epic2.priority;
    fetchData('/epics', e => setEpics(e.sort(priorityComparer)));
  }, []);

  const getReleasesNames = () => {
    const releasesNames = releases.map(r => r.name);
    return releasesNames;
  };
  const getReleasesdates = () => {
    const releasesDates = releases.map(r => [r.startDate, r.endDate]);
    return releasesDates;
  };
  const getCapacity = teamName => {
    const capacityOfDevsInTeam = devs.filter(d => d.team === teamName).map(d => Object.values(d.capacity));
    //TODO needs to sort by weeks, and needs to handle cases where devs dont always start/end on same week (i.e shay has w5..w12, but Lior has w9..w15)

    return capacityOfDevsInTeam;
  };

  const convertToFlatArray = obj => {
    let rows = [];
    obj.forEach(epicData => {
      let row = [];
      row.push(epicData.release);
      row.push(epicData.priority);
      row.push(epicData.program);
      Object.values(epicData.estimations).forEach(skillSet => {
        row.push(skillSet.est);
        row.push(skillSet.max_parallel);
      });
      row.push(epicData.candidate_teams.join());
      rows.push(row);
    });
    return rows;
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
          {groups}
        </GenericTable>
        <br />

        <GenericTable title="Teams" columnHeaders={['Groups', 'Name']}>
          {teams.map(x => [x.name, x.group])}
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
        <h1>Capacity:</h1>
        {teams.map(team => (
          <GenericTable
            title={team.name}
            key={team.name}
            columnHeaders={weekDates}
            rowHeaders={team.devs}
            isEditable="true"
            onCellChanged={handleCapacityChange}
          >
            {getCapacity(team.name)}
          </GenericTable>
        ))}
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
          rowHeaders={epics.map(e=>e.name)}
          isEditable="true"
          onCellChanged={handleEpicChange}
        >
          {convertToFlatArray(epics)}
        </GenericTable>
      </TabPanel>

      {/* --------------- PLANNING TAB ----------------------------------------------------- */}
      <TabPanel value={selectedTab} index={3}>
        <h1>Planning:</h1>
        {teams.map(team => (
          <GenericTable
            title={team.name}
            key={team.name}
            columnHeaders={getDevsAndSkillsets(team.name)}
            rowHeaders={weekDates}
            isEditable="true"
            onCellChanged={handlePlanningChange}
          >
            {calculatePlanning(team.name)}
          </GenericTable>
        ))}
      </TabPanel>
    </div>
  );
}
