const { initializeApp } = require('firebase/app');
const {getFirestore} = require('firebase/firestore');
const {getStorage} =  require('firebase/storage');

const firebaseConfig = {
  apiKey: "AIzaSyCdCweCah6rf5u6Ry8hiAfbbkQxLiUcemo",
  authDomain: "spotify-a2696.firebaseapp.com",
  projectId: "spotify-a2696",
  storageBucket: "spotify-a2696.appspot.com",
  messagingSenderId: "459295263012",
  appId: "1:459295263012:web:0e4fc4ccd370a5d5934bb1",
  measurementId: "G-31P2Y2PHDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

module.exports = {app, db, storage};