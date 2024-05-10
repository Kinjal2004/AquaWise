import firebase from "firebase/compat/app"; // Update import statement
import "firebase/compat/auth"; // Update import statement
import "firebase/compat/firestore"; // Update import statement

const firebaseConfig = {
  apiKey: "AIzaSyCgzeTi3lbsj75dt9vVNuSbA_Wki_zDLFA",
  authDomain: "aquawisebackend.firebaseapp.com",
  projectId: "aquawisebackend",
  storageBucket: "aquawisebackend.appspot.com",
  messagingSenderId: "265848820670",
  appId: "1:265848820670:web:db207e72e0217ab08f5fef",
  measurementId: "G-4CG8KNZPYR",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export default firebaseApp;
export const firestore = firebase.firestore();
