const db = {
  "devsCapacity": {
    "teams": {
      "spiders": {
        "shay": {
          "skill": "fe",
          "capacity": {
            "20/10/2019": 5,
            "27/10/2019": 5
          }
        },
        "lior": {
          "skill": "fs",
          "capacity": {
            "20/10/2019": 5,
            "27/10/2019": 5
          }
        }
      }
    }
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

export default db;
