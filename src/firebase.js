import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDJoKLrSNiq-VRDBcca4ywD5npMbVRP-h8",
  authDomain: "slack-ab38a.firebaseapp.com",
  projectId: "slack-ab38a",
  storageBucket: "slack-ab38a.appspot.com",
  messagingSenderId: "415799077965",
  appId: "1:415799077965:web:d9c34ce5da7f5ff57b0004",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
