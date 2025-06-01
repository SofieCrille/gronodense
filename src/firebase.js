// src/firebase.js

// 1. Core SDK
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// 2. Auth SDK
import {
  getAuth,
} from 'firebase/auth';

// Your Firebase config (copy-paste the “Config” snippet from Project Settings → General)
const firebaseConfig = {
  apiKey: "AIzaSyDDKK9Ativa6doHFKv7fwDdcfGk70l5VeI",
  authDomain: "gronodense.firebaseapp.com",
  databaseURL: "https://gronodense-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gronodense",
  storageBucket: "gronodense.firebasestorage.app",
  messagingSenderId: "457748929983",
  appId: "1:457748929983:web:e1830024cb9ef35fead50a",
  measurementId: "G-PJ2X2Z093Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth instance
export const auth = getAuth(app);

export const database = getDatabase(app);
// Export database URL for your REST wrapper
export const databaseUrl = firebaseConfig.databaseURL;
