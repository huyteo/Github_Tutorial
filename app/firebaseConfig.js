// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
// Your web app's Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDaT4EK1Th9Z3PNqLu3AE-SOxnkIzb4phU",
  authDomain: "fir-chat-fe488.firebaseapp.com",
  projectId: "fir-chat-fe488",
  storageBucket: "fir-chat-fe488.appspot.com",
  messagingSenderId: "1005744396932",
  appId: "1:1005744396932:web:e3e0d9d10939ef26e2c0d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);

export const useRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');