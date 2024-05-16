// Importa las funciones que necesitas de los SDK que necesitas
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de tu aplicación Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCsU3D3RgIqXzrRggw64kMlv6ua1UNayFY",
    authDomain: "vue-retail-38e98.firebaseapp.com",
    projectId: "vue-retail-38e98",
    storageBucket: "vue-retail-38e98.appspot.com",
    messagingSenderId: "531716929179",
    appId: "1:531716929179:web:500b187ff13d3f97c6f83e",
    measurementId: "G-1CPHR9YJQ7",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Cambia esto a getFirestore

export { db };
