import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApd9ADhAD0IOBk4eZlL5ogF7CvOCLOh5Y",
    authDomain: "projetbe-512f9.firebaseapp.com",
    projectId: "projetbe-512f9",
    storageBucket: "projetbe-512f9.appspot.com",
    messagingSenderId: "871678987439",
    appId: "1:871678987439:web:10e906ccb15a716e32185a"
}

export default function firebaseConfigClient()  {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);
    return { app, auth, db , storage};
}