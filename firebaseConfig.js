// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAHMrgvHK4XUI0-dIu197P7AYHM93dw5Ag",
    authDomain: "dropshiping-49698.firebaseapp.com",
    projectId: "dropshiping-49698",
    storageBucket: "dropshiping-49698.firebasestorage.app",
    messagingSenderId: "248091961714",
    appId: "1:248091961714:web:54a82e417c8f9a8d9755eb",
    measurementId: "G-VXJ34SSXC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);