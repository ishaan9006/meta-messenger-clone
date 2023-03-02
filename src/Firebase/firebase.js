import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCTTs2Cd8bSP8ge8Hsx3uOd_9ReTHJuKus",
    authDomain: "meta-messenger-clone-41755.firebaseapp.com",
    projectId: "meta-messenger-clone-41755",
    storageBucket: "meta-messenger-clone-41755.appspot.com",
    messagingSenderId: "861763292575",
    appId: "1:861763292575:web:45c1be7c92e0f55cfa41aa",
    measurementId: "G-VVNL9LQW1D"
});


const db = firebaseApp.firestore();

export default  db;