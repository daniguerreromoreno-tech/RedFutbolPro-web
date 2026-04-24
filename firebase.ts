// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY_UfUF4URn0-gE1_JjJ6d4fkFt7bhCP4",
  authDomain: "red-futbol-p-r-o-lzsd2q.firebaseapp.com",
  projectId: "red-futbol-p-r-o-lzsd2q",
  storageBucket: "red-futbol-p-r-o-lzsd2q.firebasestorage.app",
  messagingSenderId: "1069890278580",
  appId: "1:1069890278580:web:c5cc814e9c978d5970f3e1",
  measurementId: "G-WB0410VCLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
