
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyCqm7SKziwS9Sf1IiQh08LCt-L5l4Sac9w",
    authDomain: "first-progect-8f3fa.firebaseapp.com",
    projectId: "first-progect-8f3fa",
    storageBucket: "first-progect-8f3fa.firebasestorage.app",
    messagingSenderId: "980856595702",
    appId: "1:980856595702:web:c98a9b17e5d7447b58f8d7",
    measurementId: "G-5770FTSR34"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword , signInWithEmailAndPassword}

