// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh7KNUVVo-7VME3WcRYRT7GgZj-qf4QYY",
  authDomain: "assignment-skylow.firebaseapp.com",
  projectId: "assignment-skylow",
  storageBucket: "assignment-skylow.appspot.com",
  messagingSenderId: "372585204569",
  appId: "1:372585204569:web:6ce750ccd4ba88685c9a48",
  measurementId: "G-BR3C38WVLW"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);

export { app, auth, db };

