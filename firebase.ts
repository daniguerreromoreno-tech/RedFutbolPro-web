import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDY_UfUF4URn0-gE1_JjJd64fkFt7bhCP4",
  authDomain: "red-futbol-p-r-o-lzsd2q.firebaseapp.com",
  projectId: "red-futbol-p-r-o-lzsd2q",
  storageBucket: "red-futbol-p-r-o-lzsd2q.firebasestorage.app",
  messagingSenderId: "1069890278580",
  appId: "1:1069890278580:web:c5cc814e9c978d5970f3e1",
  measurementId: "G-WBQ41CYLPM",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);