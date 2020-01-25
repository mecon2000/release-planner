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

export const getDB = async () => {
  let db = await fireBaseDB
    .collection("db")
    .get()
    .then(querySnapshot => {
      if (querySnapshot.length > 1)
        throw new Error("expecting to have only 1 documnet!");
      
        let result;
      querySnapshot.forEach(doc => {
        if (doc && doc.data()) result = doc.data();
      });
      return result;
    })
    .catch(error => {
      console.error("Error in getDB: ", error);
    });
  return db;
};

export const updateDB = async newDB => {
  await fireBaseDB
    .collection("db")
    .doc("everything")
    .set(newDB)
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};
