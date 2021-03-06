export const initialDb = {
  groups: {
    data: ['Core', 'Web', 'Scanner'],
    enableEditing: false
  },
  teams: {
    data:
      [
        { name: 'Spiders', group: 'Web' },
        { name: 'Sharks', group: 'Web' },
        { name: 'Threads', group: 'Web' },
        { name: 'Team13', group: 'Scanner' },
        { name: 'Seals', group: 'Scanner' },
      ],
    enableEditing: true
  },
  devs: {
    data:
      [
        { name: 'Shay', team: 'Spiders',capacity: {w1:5,w2:4,w3:2} },
        { name: 'Guy', team: 'Spiders', capacity: {w1:1,w2:2,w3:3} },
        { name: 'Lior', team: 'Spiders', capacity: {w1:0,w2:0,w5:0} },
        { name: 'Jenny', team: 'Sharks', capacity: {w1:2,w2:2,w3:2,w4:2} },
        { name: 'Shanny', team: 'Sharks', capacity: {w1:1,w2:1,w3:1} },
      ],
    enableEditing: true
  }
}


export const db_older = {
  devsCapacity: {
    teams: [
      {
        name: "spiders",
        members: [
          {
            name: "shay",
            skill: "FE",
            capacity: [
              { date: "20/10/2019", availableDays: 5 },
              { date: "27/10/2019", availableDays: 5 }

            ]
          },
          {
            name: "lior",
            skill: "FS",
            capacity: [
              { date: "20/10/2019", availableDays: 4 },
              { date: "27/10/2019", availableDays: 3 }

            ]
          }
        ]
      },
      {
        name: "sharks",
        members: [
          {
            name: "Jenny",
            skill: "FE",
            capacity: [
              { date: "20/10/2019", availableDays: 1 },
              { date: "27/10/2019", availableDays: 1 }

            ]
          },
          {
            name: "Shanny",
            skill: "FS",
            capacity: [
              { date: "20/10/2019", availableDays: 5 },
              { date: "27/10/2019", availableDays: 5 }
            ]
          }
        ]
      }
    ]
  },
  "plans": {
    "teams": {
      "spiders": {
        "shay": {
          "epics": {
            "20/10/2019": "35998",
            "27/10/2019": "35998"
          }
        },
        "lior": {
          "epics": {
            "20/10/2019": "36000",
            "27/10/2019": "37000"
          }
        }
      }
    }
  },
  "epics": {
    "35998": {
      "title": "feature parity",
      "priority": 100,
      "estimations": {
        "Core": 32,
        "FS": 12
      }
    },
    "36000": {
      "title": "Time machine",
      "priority": 120,
      "estimations": {
        "FE": 32,
        "BE": 12,
        "Alg": 3
      }
    },
    "37000": {
      "title": "world domination",
      "priority": 130,
      "estimations": {
        "FE": 5,
        "BE": 5
      }
    }
  }
};
