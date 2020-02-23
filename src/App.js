import React, { useState, useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './App.css';
import { useStyles } from './GeneralStyles.js';
import { TabPanel } from './Tabs/TabPanel.js';
import { GenericTable } from './Tabs/GenericTable.js';

import { Button } from '@material-ui/core';

//props for accessibility:
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const serverUrl = 'http://localhost:3333';
const initialTab = 3;

export default function TabsContainer() {
  // todo: rename file to tabscontainer, add another app.js contains just tabs container
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

  const recalculatePlan = teamName => {
    fetchData(`/plans/recalculate&team=${teamName}`).then(plansFor1Team => {
      const newPlans = { ...plans };
      newPlans[teamName] = plansFor1Team;
      setPlans(newPlans);
    });
  };

  //#endregion handlers
  const [groups, setGroups] = useState([]);
  const [teams, setTeams] = useState([]);
  const [releases, setReleases] = useState([]);
  const [weekDates, setweekDates] = useState([]);
  const [devs, setDevs] = useState([]);
  const [epics, setEpics] = useState([]);
  const [plans, setPlans] = useState([]);

  // todo: can refactor all the above useState to a new hook

  const fetchPlansForEachTeam = async teams => {
    const fetchPromises = [];
    teams.forEach(team => {
      fetchPromises.push(
        fetchData(`/plans/team/${team.name}`).then(res => {
          return { teamName: team.name, newPlan: res };
        })
      );
    });
    const fetchPromisesResults = await Promise.all(fetchPromises);

    let newPlans = {};
    fetchPromisesResults.forEach(async team => {
      newPlans[team.teamName] = team.newPlan;
    });

    if (Object.keys(newPlans).length) {
      setPlans(newPlans);
    }
  };

  const fetchData = async path => {
    const res = await fetch(serverUrl + path);
    const resObject = await res.json();
    return resObject;
    //TODO handle error, if resObject is empty?
  };

  useEffect(() => {
    fetchData('/groups').then(g => setGroups(g));

    fetchData('/teams/withDevs').then(t => {
      setTeams(t);
      fetchPlansForEachTeam(t);
    });

    fetchData('/releases').then(r => setReleases(r));
    fetchData('/weekDates').then(w => setweekDates(w));
    fetchData('/devs').then(d => setDevs(d));
    const priorityComparer = (epic1, epic2) => epic1.priority - epic2.priority;
    fetchData('/epics').then(e => setEpics(e.sort(priorityComparer)));
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

  const create1weekRow = (devsInTeam, weekData) => {
    let weekRow = [];
    devsInTeam.forEach(dev => {
      const epic = weekData && weekData.epics.find(e => e.dev.toLowerCase() === dev.toLowerCase());
      const epicTheDevIsWorkingOnThisWeek = epic && epic.epicName;
      weekRow.push(epicTheDevIsWorkingOnThisWeek ? epicTheDevIsWorkingOnThisWeek : '-');
    });
    return weekRow;
  };

  //TODO implement! should take earliest release startdate, and latest release endDate,
  //and transform their dates into week number
  const getWeekRange = () => [5, 12];

  const getPlansAs2dArray = (teamName, devsInTeam) => {
    const hasPlans = plans && plans[teamName] && plans[teamName].length && devsInTeam && devsInTeam.length;
    if (!hasPlans) return [['no data', 'no data']];

    const [startingWeek, endingWeek] = getWeekRange();
    const sortedPlansFor1Team = plans[teamName].sort((w1, w2) => w2.week - w1.week);

    let res = [];
    for (let weekNumber = startingWeek; weekNumber <= endingWeek; weekNumber++) {
      const weekNumberAsString = 'w' + weekNumber.toString().padStart(2, '0');
      const weekData = sortedPlansFor1Team.find(w => w.week === weekNumberAsString);
      let weekRow = create1weekRow(devsInTeam, weekData);
      res.push(weekRow);
    }
    return res;
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
        <h2>Capacity:</h2>
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
          rowHeaders={epics.map(e => e.name)}
          isEditable="true"
          onCellChanged={handleEpicChange}
        >
          {convertToFlatArray(epics)}
        </GenericTable>
      </TabPanel>

      {/* --------------- PLANNING TAB ----------------------------------------------------- */}
      <TabPanel value={selectedTab} index={3}>
        <h2>Planning:</h2>
        <div class="scrolling">
          {teams.map(team => (
            <React.Fragment>
              <div className="horizontallyStackedTable">
                <GenericTable
                  title={team.name}
                  key={team.name}
                  columnHeaders={team.devs}
                  rowHeaders={weekDates}
                  isEditable="true"
                  onCellChanged={handlePlanningChange}
                >
                  {getPlansAs2dArray(team.name, team.devs)}
                </GenericTable>
                <Button onClick={e => recalculatePlan(team.name)} variant="contained" color="primary">
                  re-calculate plans <br />
                  for {team.name}
                </Button>
              </div>
            </React.Fragment>
          ))}
        </div>
      </TabPanel>
    </div>
  );
}
