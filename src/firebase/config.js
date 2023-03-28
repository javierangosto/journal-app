// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcF65kjLKCF5GMJcW5XJHyeMxWmcoRRvE",
  authDomain: "react-cursos-b4d41.firebaseapp.com",
  projectId: "react-cursos-b4d41",
  storageBucket: "react-cursos-b4d41.appspot.com",
  messagingSenderId: "863515651511",
  appId: "1:863515651511:web:b3de52da52d1c91e678c32"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth ( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );