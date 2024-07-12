// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoNtcm4Y0CA7pm9ACcyXrOH33tKFupFaA",
  authDomain: "badminton-booking-e300a.firebaseapp.com",
  projectId: "badminton-booking-e300a",
  storageBucket: "badminton-booking-e300a.appspot.com",
  messagingSenderId: "411134831250",
  appId: "1:411134831250:web:f817b5a56b0f1f639b944b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
