//this file is temp - it will:
//1. mock the data retrieved from server
//2. calculate the planning table (which is supposed to be done on the server)

export const getGroups = () => ['Web', 'Core', 'Scanner'];
export const getTeams = () => [
  ['Web', 'Spiders'],
  ['Web', 'Sharks'],
  ['Web', 'Threads'],
  ['Core', 'Gold Strikers'],
  ['Core', 'Goblins'],
  ['Core', 'Blues'],
  ['Scanner', 'Seals'],
  ['Scanner', 'Team 13']
];
export const getReleasesNames = () => ['20A5', '20B', '20C'];
export const getReleasesdates = () => [
  ['2/2/2020', '1/3/2020'],
  ['14/2/2020', '1/4/2020'],
  ['2/4/2020', '1/8/2020']
];

const getCapacityfor1Dev = (devName, week) => {
  return 5;
};
export const getCapacity = team => {
  switch (team) {
    case 'Spiders':
      return [
        ['5', '5'],
        ['5', '5'],
        ['5', '5']
      ];
    case 'Sharks':
      return [
        ['5', '5'],
        ['5', '5'],
        ['5', '5']
      ];
    case 'Threads':
      return [
        ['5', '5'],
        ['5', '5'],
        ['5', '5']
      ];
    default:
      return [
        ['5', '5'],
        ['5', '5'],
        ['5', '5']
      ];
  }
};
export const getDevsAndSkillsets = teamName => ['shay-FE', 'lior-BE'];
export const getWeekDates = () => ['w5', 'w6', 'w7', 'w8', 'w9', 'w10', 'w11', 'w12'];
export const getEpicNames = () => ['snapshot w2', 'patient-mgmt with IDS', 'texture mapping', 'accnt management'];
export const getEpicsHeaders = () => [
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
];

// prettier-ignore
export const getEpicsData = () => [
  { release:'20B', priority:'100', program:'ortho', estimations:{FE:{est:'15', max_parallel:'1'}, BE:{est:'5', max_parallel:'1'}, Core:{est:'5', max_parallel:'1'}, Scanner:{est:'0', max_parallel:'1'}, MSK:{est:'0', max_parallel:'1'}, ALG:{est:'0', max_parallel:'1'}}, candidate_teams: ['Spiders','Gold Strikers']},  //'snapshot w2'
//  { release:'20B', priority:'200', program:'ortho', estimations:{FE:{est:'10', max_parallel:'1'}, BE:{est:'15', max_parallel:'1'}, Core:{est:'7', max_parallel:'1'}, Scanner:{est:'0', max_parallel:'1'}, MSK:{est:'0', max_parallel:'1'}, ALG:{est:'0', max_parallel:'1'}}, candidate_teams: ['Sharks','Gold Strikers']},   //'patient-mgmt with IDS'
//  { release:'20B', priority:'300', program:'ortho', estimations:{FE:{est:'10', max_parallel:'1'}, BE:{est:'0',  max_parallel:'1'}, Core:{est:'10',max_parallel:'1'}, Scanner:{est:'0', max_parallel:'1'}, MSK:{est:'0', max_parallel:'1'}, ALG:{est:'0', max_parallel:'1'}}, candidate_teams: ['Spiders','Gold Strikers']},  //'texture mapping'
  { release:'20A5', priority:'50', program:'ortho', estimations:{FE:{est:'15', max_parallel:'1'}, BE:{est:'15', max_parallel:'1'}, Core:{est:'0', max_parallel:'1'}, Scanner:{est:'0', max_parallel:'1'}, MSK:{est:'0', max_parallel:'1'}, ALG:{est:'0', max_parallel:'1'}}, candidate_teams: ['Spiders','Gold Strikers']},  //'accnt management'
];

const priorityComparer = (epic1, epic2) => epic2.priority - epic1.priority;

const addEpicName = (epic, epicIndex) => {
  epic.name = getEpicNames()[epicIndex];
  return epic;
};

const getDevsWithRelevantSkill = (tablesWithEfforts, teamName, skill, parallel) => {
  //TODO fucking rewrite this, more readable!
  //TODO implement the use of parallel here. for now assuming it's always 1
  const devsWithRelevantSkillSets = getDevsAndSkillsets(teamName).filter(dev => dev.includes(skill));
  //return 1 dev who's most free:
  const a = tablesWithEfforts.filter(dev => devsWithRelevantSkillSets.includes(dev.name));
  const b = a.sort((dev1, dev2) => dev2.nextFreeWeek - dev1.nextFreeWeek);
  const c = b[0];
  const d = [];
  d.push(c && c.name);
  return d;
};

const addEffortToDevs = (tablesWithEfforts, devs, epicName, skillEffort) => {
  let remainingEffort = skillEffort;
  let dev = tablesWithEfforts.find(dev => devs.includes(dev.name));
  console.log(`%c${JSON.stringify(dev)}`, 'background: yellow; color: red;');
  if (!dev) return;

  let currentWeek = dev.nextFreeWeek.slice(1);
  while (remainingEffort > 0) {
    dev['w' + currentWeek] = epicName;
    remainingEffort -= getCapacityfor1Dev(dev.name, currentWeek);
    currentWeek++;
  }
  dev.nextFreeWeek = 'w' + currentWeek;
};

const add1SkillIn1EpicToCorrectDev = (tablesWithEfforts, teamName, epicName, skill, skillEffort, parallel) => {
  const devs = getDevsWithRelevantSkill(tablesWithEfforts, teamName, skill, parallel);

  if (devs.length) {
    addEffortToDevs(tablesWithEfforts, devs, epicName, skillEffort);
  }
};

export const calculatePlanning = teamName => {
  const sortedEpicsWithNames = getEpicsData()
    .filter(epic => epic.candidate_teams.includes(teamName))
    .map(addEpicName)
    .sort(priorityComparer)
    .map(epic => {
      return { name: epic.name, estimations: epic.estimations }; //TODO can this map be shorten?
    });

  //now each epic should look like this:  {name:'name', estimations:{FE: {est:'5',max_parallel:'1'},....}}
  let tablesWithEfforts = getDevsAndSkillsets(teamName).map(dev => {
    return { name: dev, nextFreeWeek: 'w5' };
  });

  sortedEpicsWithNames.forEach(epic => {
    for (const skillName of Object.keys(epic.estimations)) {
      add1SkillIn1EpicToCorrectDev(
        tablesWithEfforts,
        teamName,
        epic.name,
        skillName,
        epic.estimations[skillName].est,
        epic.estimations[skillName].max_parallel
      );
    }
  });
  const x = convertToRenderableArray(tablesWithEfforts);
  return x;
};

const convertToRenderableArray = table => {
  let result = [];
  getWeekDates().forEach(weekdate => {
    let result2 = [];
    table.forEach(devPlan => result2.push(devPlan[weekdate] ? devPlan[weekdate] : '-'));
    result.push(result2);
  });
  return result;
};

export const convertToFlatArray = obj => {
  let result = Object.keys(obj).map(key => (typeof obj[key] === 'object' ? convertToFlatArray(obj[key]) : obj[key]));
  return result.flat();
};

//TODO - add release to comparer? depends on Mike.
/*
for each epic (sorted by release & priority):  
foreach skillset needed in epic:
  finddevs to do the work (using candidate_teams and availability in planning table, and parallel number)
  fill their planning cells (=put short epic name) until est runs out. round up.
  also color the cell, make a list of colors 

*/
