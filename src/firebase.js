import { firebase, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAwEOUXl4mRUwerNcgknW8AZWejJDHmpsA",
  authDomain: "travelapp-40fb8.firebaseapp.com",
  projectId: "travelapp-40fb8",
  storageBucket: "travelapp-40fb8.appspot.com",
  messagingSenderId: "1008336322056",
  appId: "1:1008336322056:web:c5d327010bb6c33bbe1bbd",
  measurementId: "G-1JMT7N9SMP",
  databaseURL: " https://travelapp-40fb8-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
const getFStore = getFirestore(app);

export { auth, app, firebaseConfig, database, storage, getFStore };

// Import the functions you need from the SDKs you need
