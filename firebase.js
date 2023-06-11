// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat';
import 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr5twxQurIXIJA2ig38YeJEHkFxU6usio",
  authDomain: "unique-tickets.firebaseapp.com",
  projectId: "unique-tickets",
  storageBucket: "unique-tickets.appspot.com",
  messagingSenderId: "934784992956",
  appId: "1:934784992956:web:cd84772fd68bdab755b2b9"
};

// Initialize Firebase
// la syntaxe change en fonction de la version du package firebase, faire attention !

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const db = firebase.firestore();
const auth = getAuth();
const FieldPath = firebase.firestore.FieldPath;


export { auth, db, FieldPath };
