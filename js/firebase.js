// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwAgORBm7vBDRLksjernmdB7ySIuxVlrw",
  authDomain: "dagsoppgave.firebaseapp.com",
  projectId: "dagsoppgave",
  storageBucket: "dagsoppgave.appspot.com",
  messagingSenderId: "911164437941",
  appId: "1:911164437941:web:3c1525c643e5bd8a8d55fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db