// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const app = initializeApp({
    apiKey: "AIzaSyCBff-ZgOJ0KonSF6qPabBaWBCsnrXvJY0",
    authDomain: "mern-chatapp-3b726.firebaseapp.com",
    projectId: "mern-chatapp-3b726",
    storageBucket: "mern-chatapp-3b726.appspot.com",
    messagingSenderId: "995354198020",
    appId: "1:995354198020:web:d637ed9892025f46a33551"
});

export const auth = getAuth(app);