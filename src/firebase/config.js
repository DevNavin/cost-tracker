import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASn0XL7vN3YOmjFE5ViLFz3D5HiJKdEgs",
  authDomain: "expense-tracker-702e7.firebaseapp.com",
  projectId: "expense-tracker-702e7",
  storageBucket: "expense-tracker-702e7.appspot.com",
  messagingSenderId: "32659229031",
  appId: "1:32659229031:web:e6584426ff148ebe5d47c2",
};

firebase.initializeApp(firebaseConfig);

const fireStore = firebase.firestore();
const firebaseAuth = firebase.auth();
const timeStamp = firebase.firestore.Timestamp;

export { fireStore, firebaseAuth, timeStamp };
