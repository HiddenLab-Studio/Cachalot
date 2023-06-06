import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { getFirestore, updateDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";



//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApd9ADhAD0IOBk4eZlL5ogF7CvOCLOh5Y",
    authDomain: "projetbe-512f9.firebaseapp.com",
    projectId: "projetbe-512f9",
    storageBucket: "projetbe-512f9.appspot.com",
    messagingSenderId: "871678987439",
    appId: "1:871678987439:web:10e906ccb15a716e32185a"
};


export default function firebaseConfigClient() {
    //Initialisation de firebase
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const db = getFirestore(app)
    const storage = getStorage(app)

    return { storage, auth, db }
}