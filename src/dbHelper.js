//TODO can use import instead?
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

let dbfb = null;

export const connectToDb = () => {
  // Initialize Cloud Firestore through Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyA9GWdpSk-eAFYzaYCdsqjNagBnZy6Z9sk",
    authDomain: "releaseplanner-902dc.firebaseapp.com",
    projectId: "releaseplanner-902dc"
  });
  dbfb = firebase.firestore();
};

export const addData = dbfbdataToAdd => {
  dbfb
    .collection("users")
    .add({
      first: "Ada",
      last: "Lovelace",
      born: 1815
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};

export const getData = dataToGet => {
  dbfb
    .collection("users")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });
};
