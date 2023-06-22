import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {doc, updateDoc, setDoc, getDoc, collection, getDocs} from "firebase/firestore";
import firebaseConfigClient from "../../../services/firebase.config.js";

//Firebase configuration
const { auth, db } = firebaseConfigClient();
const provider = new GoogleAuthProvider();

import xpCacheManager from "../../../context/manager/cache/xpCacheManager.js";

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
                case "auth/popup-closed-by-user":
                    return "La fenêtre de connexion a été fermée !";
                case "auth/cancelled-popup-request":
                    return "La fenêtre de connexion a été fermée !";
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
        "auth/popup-closed-by-user",
        "auth/cancelled-popup-request"
    ]
}

export async function firebaseRegister(data) {
    let result = {
        showOverlay: true,
        code: undefined,
    };

    if (data.username.length < 3 && data.username.length > 15) {
        result.code = "Votre pseudo doit contenir au moins 3 caractères";
        return result;
    } else {
        const usersCollection = collection(db, "users");
        const usersDoc = await getDocs(usersCollection);
        const fetchedUsers = usersDoc.docs.map(doc => doc.data().username);
        console.log(data);
        if(fetchedUsers.includes(data.username)){
            result.code = "Ce nom d'utilisateur est déjà utilisé";
            return result;
        } else {
            console.log("Nom d'utilisateur disponible");
        }
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
                displayName: data.displayName,
                username: data.username,
                age: data.age !== "" ? parseInt(data.age) : 0,
                email: data.email,
                lastLogin: dateTime,
                photo: "https://marketplace.canva.com/EAFEits4-uw/1/0/800w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-r0bPCSjUqg0.jpg",
                accountCreationDate: dateTime,
                cumulatedDays: 0,
                rank : {
                    math : 1,
                    french : 1,
                },
                userXp: {
                    currentXp: 0,
                    currentLvl: 1,
                    cumulatedXp: 0
                },
                userExercise: {
                    totalExerciseDone: 0,
                    totalTrainingDone: 0,
                    // Id des exercices terminés pour ne pas donner de l'expérience à chaque fois
                    exerciseDoneList: [],
                    myExerciseList: [],
                    exerciseLikedList: []
                }
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

            // We retrieve lastLogin from user document in database
            const userDocRef = doc(db, "users", user.uid);
            getDoc(userDocRef).then((doc) => {
                const userDoc = doc.data();
                const lastLogin = userDoc.lastLogin;
                // We retrieve the day from lastLogin
                const lastLoginDay = lastLogin.split(" ")[0].split("/")[0];
                //console.log(lastLoginDay, dt.getDate().toString());
                if(lastLoginDay !== dt.getDate().toString()){
                    // We increment the cumulatedDays (need to get the user document first)
                    const cumulatedDays = userDoc.cumulatedDays;
                    updateDoc(userDocRef, {
                        cumulatedDays: cumulatedDays + 1
                    })
                }
            });

            // On met à jour les informations de l'utilisateur
            updateDoc(userDocRef, {
                lastLogin: dateTime
            }).then(() => {
                xpCacheManager.loadData(user.uid);
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
        .then(async (res) => {
            //Recuperation des informations de l'utilisateur
            const user = res.user;
            //doc à 'créer' dans la collection users
            const docRef = doc(db, "users", user.uid);

            console.log(user);

            // On récupère la date et l'heure de connexion
            const dt = new Date();
            const date = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
            const time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
            const dateTime = date + " " + time;

            const displayName = user.displayName.split(" ")[0];
            let username = displayName;
            while (!await verificationUsername(username)) {
                username = displayName + Math.floor(Math.random() * 100000);
            }

            //setup le doc avec les infos de l'utilisateur
            await getDoc(docRef).then((docSnap) => {
                if (!docSnap.exists()) {
                    setDoc(docRef, {
                        username: username,
                        displayName: user.displayName,
                        email: user.email,
                        photo: user.photoURL,
                        age: 0,
                        lastLogin: dateTime,
                        accountCreationDate: dateTime,
                        cumulatedDays: 0,
                        rank : {
                            math : 1,
                            french : 1,
                        },
                        userXp: {
                            currentXp: 0,
                            currentLvl: 1,
                            cumulatedXp: 0
                        },
                        userExercise: {
                            totalExerciseDone: 0,
                            totalTrainingDone: 0,
                            // Id des exercices terminés pour ne pas donner de l'expérience à chaque fois
                            exerciseDoneList: [],
                            myExerciseList: [],
                            exerciseLikedList: []
                        }
                    }).then(() => {
                        result.showOverlay = false;
                    })
                } else {
                    result.showOverlay = false;
                    console.log("User already exists");
                }
            })
        }).catch((error) => {
            //Si il y a une erreur
            console.log(error.code);
            result.code = errorManager.getErrorDisplayMessage(error.code);
        });

    return result;
}


async function verificationUsername(username) {
    let result = false;
    const usersCollection = collection(db, "users");
    const usersDoc = await getDocs(usersCollection);
    const fetchedUsers = usersDoc.docs.map(doc => doc.data().username);
    fetchedUsers.includes(username) ? result = false : result = true;
    return result;
}
