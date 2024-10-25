// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Pour Firestore
import { getDatabase } from "firebase/database"; // Pour Realtime Database
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "VOTRE_API_KEY",
    authDomain: "VOTRE_AUTH_DOMAIN",
    projectId: "VOTRE_PROJECT_ID",
    storageBucket: "VOTRE_STORAGE_BUCKET",
    messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
    appId: "VOTRE_APP_ID",
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Pour Firestore
// const db = getDatabase(app); // Pour Realtime Database si vous préférez
const auth = getAuth(app);

export { db, auth };
