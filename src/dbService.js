import { initialDb } from "./release_planner_db.js";

//TODO can use import instead?
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

let fireBaseDB = null;

export const connectToDb = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyA9GWdpSk-eAFYzaYCdsqjNagBnZy6Z9sk",
    authDomain: "releaseplanner-902dc.firebaseapp.com",
    projectId: "releaseplanner-902dc"
  });
  fireBaseDB = firebase.firestore();
};

export const getFullDB = async () => {
  let db = await fireBaseDB
    .collection("db")
    .get()
    .then(querySnapshot => {
      if (querySnapshot.size !== 1) {
        throw new Error(`expecting to have exactly 1 documnet, but have ${querySnapshot.size}!`);
      }
      return querySnapshot.docs[0].data();
    })
    .catch(error => {
      console.error("Error in getDB: ", error);
    });
  return db;
};

export const updateFullDB = async newDB => {
  await fireBaseDB
    .collection("db")
    .doc("everything")
    .set(newDB)
    .catch(function(error) {
      console.error("Error in updateDB: ", error);
    });
};

export const resetToInitialDB = async () => {
  await fireBaseDB
    .collection("db")
    .doc("everything")
    .set(initialDb)
    .catch(function(error) {
      console.error("Error in resetToInitialDB: ", error);
    });
};

export const getTeams = async () => {
  const db = await getFullDB();
  return db.teams.data;
}

export const isTeamsEnabledForEditing = async () => {
  const db = await getFullDB();
  return db.teams.enableEditing;
}


export const addTeam = async (newTeam, group) => {
  let db = await getFullDB();
  db.teams.data.push({ name: newTeam, group });
  await updateFullDB(db);
}

export const getGroups = async () => {
  const db = await getFullDB();
  return db.groups.data;
}

export const
