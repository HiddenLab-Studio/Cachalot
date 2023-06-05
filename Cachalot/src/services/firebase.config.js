import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApd9ADhAD0IOBk4eZlL5ogF7CvOCLOh5Y",
    authDomain: "projetbe-512f9.firebaseapp.com",
    projectId: "projetbe-512f9",
    storageBucket: "projetbe-512f9.appspot.com",
    messagingSenderId: "871678987439",
    appId: "1:871678987439:web:10e906ccb15a716e32185a"
};

export default function firebaseConfigClient()  {
    //Initialisation de firebase
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const db = getFirestore(app)

    return { app,auth,db }
}