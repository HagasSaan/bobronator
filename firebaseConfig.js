import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR7tqmuUPXlphefTP6BW5W2MYITzR9uI8",
  authDomain: "lab5-20210.firebaseapp.com",
  projectId: "lab5-20210",
  storageBucket: "lab5-20210.appspot.com",
  messagingSenderId: "165506675521",
  appId: "1:165506675521:web:666dabe9ea9de0acc7e7c0",
};

var app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig); // If no app exists.
} else {
  const APPS = getApps();
  app = APPS[0]; // Choose the first app from the array.
}

export const db = getDatabase(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const firestore = getFirestore(app);
