//TODO can use import instead?
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

let fireBaseDB = null;

export const connectToDb = () => {
  // Initialize Cloud Firestore through Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyA9GWdpSk-eAFYzaYCdsqjNagBnZy6Z9sk",
    authDomain: "releaseplanner-902dc.firebaseapp.com",
    projectId: "releaseplanner-902dc"
  });
  fireBaseDB = firebase.firestore();
};

export const getDB = async () => {
  let dd = "ronggg"; 
  dd= await fireBaseDB
    .collection("db")
    .get()
    // .then(querySnapshot => {
    //   return querySnapshot.get().data();
    // })

    .then(querySnapshot => {
      let mydata = []; 
      querySnapshot.forEach(doc => {
        //console.log(`${doc.id} => ${doc.data()}`);
        if (doc && doc.data()) mydata.push(doc.data());
      });
      return mydata;
    });

    console.log("inside getDB");
    return dd;
};


export const updateDB = async newDB => {
  await fireBaseDB
    .collection("db")
    .add(newDB)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};


// export const addData = dataToAdd => {
//   fireBaseDB
//     .collection("users")
//     .add({
//       first: "Ada",
//       last: "Lovelace",
//       born: 1815
//     })
//     .then(function(docRef) {
//       console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function(error) {
//       console.error("Error adding document: ", error);
//     });
// };

// export const getData = dataToGet => {
//   fireBaseDB
//     .collection("users")
//     .get()
//     .then(querySnapshot => {
//       querySnapshot.forEach(doc => {
//         console.log(`${doc.id} => ${doc.data()}`);
//       });
//     });
// };
