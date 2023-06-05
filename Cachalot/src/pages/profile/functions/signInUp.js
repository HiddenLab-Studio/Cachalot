import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import firebaseConfigClient from "../../../services/firebase.config.js";
import {checkFields} from "./checkFields.js";

//Firebase configuration
const { auth, db } = firebaseConfigClient();
const provider = new GoogleAuthProvider();

export const errorManager = {
    getErrorDisplayMessage: (result) => {
        if(errorManager.validCode.includes(result)){
            switch (result) {
                case "invalid":
                    return "Veuillez remplir tous les champs !";
                case "auth/invalid-email":
                    return "L'adresse e-mail est mal formatée !";
                case "auth/user-disabled":
                    return "Compte désactivé ou banni !";
                case "auth/user-not-found":
                    return "Aucun utilisateur correspond à cet email !";
                case "auth/wrong-password":
                    return "Le mot de passe est invalide !";
                case "auth/email-already-in-use":
                    return "L'adresse e-mail est déjà utilisée !";
                case "auth/operation-not-allowed":
                    return "Les connexions par mot de passe ont été désactivées.";
                case "auth/missing-password":
                    return "Veuillez saisir votre mot de passe !";
                case "auth/weak-password":
                    return "Le mot de passe doit contenir au moins 6 caractères !";
                default:
                    console.error("Invalid error code");
            }
        } else {
            console.error("Invalid error code");
        }
    },

    validCode: [
        "invalid",
        "auth/invalid-email",
        "auth/user-disabled",
        "auth/user-not-found",
        "auth/wrong-password",
        "auth/email-already-in-use",
        "auth/operation-not-allowed",
        "auth/missing-password",
        "auth/weak-password",
    ]
}

export async function firebaseRegister(data) {
    let result = {
        showOverlay: true,
        code: undefined,
    };

    if (data.username.length < 3) {
        result.code = "Le nom d'utilisateur doit contenir au moins 3 caractères";
        return result;
    }

    await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;

            //Recuperation de la date et l'heure de connexion
            const dt = new Date();
            const date = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
            const time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
            const dateTime = date + " " + time;
            //Ajout des informations supplémentaires dans la base de donnee
            //Ajout du document dans la collection users
            const userDocRef = doc(db, "users", user.uid);
            //Ajout des informations dans le document
            setDoc(userDocRef, {
                username: data.username,
                age: data.age,
                email: data.email,
                lastLogin: dateTime,
            }).then(() => {
                result.showOverlay = false;
                result.code = "valid";
            });
        })
        .catch((error) => {
            console.log(error.code)
            result.code = errorManager.getErrorDisplayMessage(error.code);
        })
    return result;
}

// Fonction pour se connecter avec firebase
export async function firebaseLogin(data) {
    // On initialise le résultat qui contient le code d'erreur s'il y en a une
    let result = {
        showOverlay: true,
        code: undefined
    };

    await signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // On récupère les informations de l'utilisateur
            const user = userCredential.user;

            // On récupère la date et l'heure de connexion
            const dt = new Date();
            const date = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
            const time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
            const dateTime = date + " " + time;

            // On met à jour les informations de l'utilisateur
            const userDocRef = doc(db, "users", user.uid);
            updateDoc(userDocRef, {
                lastLogin: dateTime
            }).then(() => {
                result.showOverlay = false;
                result.code = "valid";
            })
        }).catch((error) => {
            // Si il y a une erreur
            console.log(error.code)
            // On récupère le message d'erreur
            result.code = errorManager.getErrorDisplayMessage(error.code);
        });
    // On retourne le résultat qui contient le code d'erreur
    return result;
}

// Fonction pour se connecter avec Google et firebase
export async function firebaseGoogleLogin() {
    let result = {
        showOverlay: true,
        code: undefined,
    };

    //Fonction firebase pour se connecter avec google
    await signInWithPopup(auth, provider)
        .then((result) => {
            //Recuperation des informations de l'utilisateur
            const user = result.user;
            //doc à 'créer' dans la collection users
            const docRef = doc(db, "users", user.uid);

            //setup le doc avec les infos de l'utilisateur
            getDoc(docRef).then((docSnap) => {
                if (!docSnap.exists()) {
                    setDoc(docRef, {
                        username: user.displayName,
                        email: user.email,
                        photo: user.photoURL,
                    }).then(() => {
                        result.showOverlay = false;
                    })
                }
            })
        }).catch((error) => {
            //Si il y a une erreur
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });

    return result;
}
