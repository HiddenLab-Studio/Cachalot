//Import the functions you need from the SDKs you need
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../composable/firebaseConfigClient.js";

//Firebase configuration
const { auth, db } = firebaseConfigClient();

//On regarde l'état de session de l'utilisateur
onAuthStateChanged(auth, (user) => {
    if (user) {
        //doc à chercher dans la collection users
        const userDocRef = doc(db, "users", user.uid);
        //Recuperation des informations du document users de l'utilisateur connecté
        getDoc(userDocRef).then((docSnap) => {
            if (docSnap.exists()) {
                if (docSnap.data().age == null){
                    //Redirection vers la page moreInfo
                    window.location.href = "/info";
                }
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
    } else {
        // L'utilisateur n'est pas connecté
        console.log("Utilisateur déconnecté")
        // Redirection vers la page de login
        window.location.href = "/login";
    }
});