// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU5ofzUkXldY19mnTts3j2kM1KQa--eO8",
  authDomain: "jobportal-a4c02.firebaseapp.com",
  projectId: "jobportal-a4c02",
  storageBucket: "jobportal-a4c02.appspot.com",
  messagingSenderId: "48700976816",
  appId: "1:48700976816:web:5f793ed624d76835d05575",
  measurementId: "G-6RYN32CVD5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
