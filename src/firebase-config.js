// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjp7Q7rlp6hhe79cprCkabOuHG7-VBjsY",
    authDomain: "rhythm-5cfc5.firebaseapp.com",
    databaseURL: "https://rhythm-5cfc5-default-rtdb.firebaseio.com",
    projectId: "rhythm-5cfc5",
    storageBucket: "rhythm-5cfc5.appspot.com",
    messagingSenderId: "319887740882",
    appId: "1:319887740882:web:6b640d9a58ad3bbfe5820b"
    // apiKey: "AIzaSyCpwowQE23XWzQs9LjB9l7DwX6SAdbGDlE",
    // authDomain: "rhythm-2959e.firebaseapp.com",
    // projectId: "rhythm-2959e",
    // storageBucket: "rhythm-2959e.appspot.com",
    // messagingSenderId: "788373368889",
    // appId: "1:788373368889:web:a250eea0a8b6e8d79fdde8"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

