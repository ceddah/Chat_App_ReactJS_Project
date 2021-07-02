import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyB0X-h7BDquA66fYra1O_6_6njtRZMystw",
    authDomain: "unichat-f2f25.firebaseapp.com",
    projectId: "unichat-f2f25",
    storageBucket: "unichat-f2f25.appspot.com",
    messagingSenderId: "997583123573",
    appId: "1:997583123573:web:ccf129c709a0c4ea05f43c"
}).auth();