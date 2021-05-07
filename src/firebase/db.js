import firebase from 'firebase';
import 'firebase/firestore';
import Vue from 'vue';


var firebaseConfig = {
    apiKey: "AIzaSyDvhaJt_bucxsuQoaYX5ffEOAwACfECBbQ",
    authDomain: "moviecture.firebaseapp.com",
    projectId: "moviecture",
    storageBucket: "moviecture.appspot.com",
    messagingSenderId: "44134551144",
    appId: "1:44134551144:web:ec092dc59b4a0c5a03f5dd"
  };
  // Initialize Firebase

 

  export const db =  firebase.initializeApp(firebaseConfig).firestore();