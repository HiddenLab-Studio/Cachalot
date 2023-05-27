//Import the functions you need from the SDKs you need
import { getAuth, signInWithEmailAndPassword, setPersistence, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../composable/firebaseConfigClient.js";

//Firebase configuration
const { auth, db } = firebaseConfigClient();

//Fonction de vérification de l'état de la session utilisateur
let isSessioncheck = false;

function checkAuthState() {
    if (isSessioncheck = true ){
        return;
    } 
    else {
        isSessioncheck = true;
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Utilisateur connecté :", user.uid);
                window.location.href = "/";
            } else {
                // L'utilisateur n'est pas connecté
                console.log("Utilisateur déconnecté")
                window.location.href = "/login";
            }
        });
        
    }
}

checkAuthState(); // Vérifier l'état de la session utilisateur au chargement de la page

//Login system
function login(e) {
    e.preventDefault();
    //Recuperation des element html
    let obj = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };


    //fonction de login
    signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);

            //Recuperation de la date et l'heure de connexion 
            const dt = new Date();
            const date = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
            const time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
            const dateTime = date + " " + time;

            //doc à chercher dans la collection users
            const userDocRef = doc(db, "users", user.uid);
            //Recuperation des informations du document
            getDoc(userDocRef).then((docSnap) => {
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                } else {
                    console.log("No such document!");
                }
            })
            updateDoc(userDocRef, {
                lastLogin: dateTime
            });
        })
        .catch(function (error) { console.log(error); });
    
}


window.login = function (e) {
    login(e);
    window.location.href = "/";
}