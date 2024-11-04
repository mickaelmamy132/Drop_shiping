// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import pour le stockage

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHMrgvHK4XUI0-dIu197P7AYHM93dw5Ag",
    authDomain: "dropshiping-49698.firebaseapp.com",
    projectId: "dropshiping-49698",
    storageBucket: "dropshiping-49698.appspot.com", // Corrigé pour utiliser le stockage Firebase
    messagingSenderId: "248091961714",
    appId: "1:248091961714:web:54a82e417c8f9a8d9755eb",
    measurementId: "G-VXJ34SSXC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialisation du stockage

export { database, firestore, storage };
