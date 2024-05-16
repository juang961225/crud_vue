import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCsU3D3RgIqXzrRggw64kMlv6ua1UNayFY",
    authDomain: "vue-retail-38e98.firebaseapp.com",
    projectId: "vue-retail-38e98",
    storageBucket: "vue-retail-38e98.appspot.com",
    messagingSenderId: "531716929179",
    appId: "1:531716929179:web:500b187ff13d3f97c6f83e",
    measurementId: "G-1CPHR9YJQ7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
