import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "revent2020.firebaseapp.com",
    databaseURL: "https://revent2020-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "revent2020",
    storageBucket: "revent2020.appspot.com",
    messagingSenderId: "40610506233",
    appId: "1:40610506233:web:28b2dfc6f23e6e11e9c928"
 }

 firebase.initializeApp(firebaseConfig);
 firebase.firestore();

 export default firebase;