import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import firebaseConfigClient from "../../../services/firebase.config.js";

//Firebase configuration
const { auth, db } = firebaseConfigClient();
const provider = new GoogleAuthProvider();

export async function firebaseRegister(obj) {
    let result = false;
    //Verification des mots de passe
    if (obj.password.length < 6) {
        console.log("Le mot de passe doit contenir au moins 8 caractères");
        return;
        /*} else if (obj.password.match(/[0-9]/g) == null) {
            console.log("Le mot de passe doit contenir au moins un chiffre");
            return;
        } else if (obj.password.match(/[A-Z]/g) == null) {
            console.log("Le mot de passe doit contenir au moins une lettre majuscule");
            return;
        } else if (obj.password.match(/[a-z]/g) == null) {
            console.log("Le mot de passe doit contenir au moins une lettre minuscule");
            return;
        } else if (obj.password.match(/[^a-zA-Z\d]/g) == null) {
            console.log("Le mot de passe doit contenir au moins un caractère spécial");
            return;*/
    } else {
        //Creation de l'utilisateur avec e-mail et mot de passe
        await createUserWithEmailAndPassword(auth, obj.email, obj.password)
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
                    username: obj.username,
                    age: obj.age,
                    email: obj.email,
                    lastLogin: dateTime,
                }).then(() => {
                    result = true;
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            })
    }
    return result;
}

export async function firebaseLogin(data) {
    let result = false;

    await signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            //On récupère lesinfos de l'utilisateur
            const user = userCredential.user;

            //Recuperation de la date et l'heure de connexion
            const dt = new Date();
            const date = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
            const time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
            const dateTime = date + " " + time;

            //doc à chercher dans la collection users
            const userDocRef = doc(db, "users", user.uid);
            //Mise à jour de la date de connexion
            updateDoc(userDocRef, {
                lastLogin: dateTime
            }).then(() => {
                result = true;
            })
        }).catch((error) => {
        console.log(error);
    });
    return result;
}

export async function firebaseGoogleLogin() {
    let result = false;

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
                        result = true;
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
