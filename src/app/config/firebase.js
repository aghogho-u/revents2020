import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDQoXmOXaTORUHi8kZ0Z_oNVupB7ehcwiM",
    authDomain: "revent2020.firebaseapp.com",
    projectId: "revent2020",
    storageBucket: "revent2020.appspot.com",
    messagingSenderId: "40610506233",
    appId: "1:40610506233:web:28b2dfc6f23e6e11e9c928"
 }

 firebase.initializeApp(firebaseConfig);
 firebase.firestore();

 export default firebase;