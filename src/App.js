import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { cloneDeep } from 'lodash';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './App.css';
import { initialDb } from './release_planner_db.js';
import { DataAdder } from './DataAdder.js';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'gray',
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(1);
  const [db, setDb] = React.useState(initialDb);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAddingTeam = (event, data) => {
    //TODO must be a better way
    let newDb= cloneDeep(db);
    newDb.teams.data.push({name: data.field0, group: data.field1});
    setDb(newDb);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="simple tabs example">
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
                  <Td key={'group'+index}>{groupName}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TabPanel>


      <TabPanel value={selectedTab} index={1}>
        <div className="responsiveTable"></div>
        <Table>
          <Thead>
            <Tr>
              <Th width="10%">Name</Th>
              <Th width="90%" >Belongs to</Th>
            </Tr>
          </Thead>
          <Tbody>
            {db.teams.data.map((team, index) => {
              return (
                <Tr key={index}>
                  <Td key={index} width="10%" >{team.name}</Td>
                  <Td key={index} width="90%" >{team.group}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        {db.teams.enableEditing ? 
          <DataAdder 
            onAddClicked={handleAddingTeam} 
            fields={["Add a team name","belongs to which group?"]}
          />  
          : ""}
      </TabPanel>


      <TabPanel value={selectedTab} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}