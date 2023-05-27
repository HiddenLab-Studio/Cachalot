// Import des fonctions dont on a besoin
import {signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import firebaseConfigClient from "../composable/firebaseConfigClient.js";

//Firebase configuration
const {auth, db } = firebaseConfigClient();


async function getDataUser(user){
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    }
    else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

function clickSignOut(){
    let clickSignout = document.getElementById('signOut');
    clickSignout.addEventListener('click', () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('Sign-out successful.');
            window.location.href = "/login";
        }).catch((error) => {
            // An error happened.
            console.log('An error happened.');
        });
    })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Utilisateur connecté :", user.uid);
        getDataUser(user);
    } else {
        // L'utilisateur n'est pas connecté
        console.log("Utilisateur déconnecté")
        window.location.href = "/login";
    }
});


clickSignOut();