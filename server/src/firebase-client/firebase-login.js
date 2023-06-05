//Import the functions you need from the SDKs you need
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { doc, updateDoc, setDoc,getDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../composable/firebaseConfigClient.js";

//Firebase configuration
const { auth, db } = firebaseConfigClient();
const provider = new GoogleAuthProvider();

//On regarde si il veut rester connecté tout le temps ou pas 
function checkRemember() {
    //Recuperation de la valeur du checkbox
    const remember = document.getElementById('remember').checked;
    //Si check alors on laisse la valeur par defaut 
    if (remember) {
        return undefined
    }
    //Sinon on met la valeur à session, quand le navigateur est fermé la session est fermé
    else {
        return setPersistence(auth, browserSessionPersistence)
    }
}

//Login system
function login(e) {
    e.preventDefault();
    //Recuperation des element html
    let obj = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    //Set la persistence
    checkRemember();
    //Fonction firebase pour se connecter avec email et password
    signInWithEmailAndPassword(auth, obj.email, obj.password)
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
                //On le redirige vers la page de principale
                window.location.href = "/";
            })
        })
        .catch(function (error) { console.log(error); });
};




function Google(e) {
    e.preventDefault();
    setPersistence(auth, browserSessionPersistence)

    //Fonction firebase pour se connecter avec google
    signInWithPopup(auth, provider)
        .then((result) => {
            //Recuperation des informations de l'utilisateur
            const user = result.user;
            //doc à 'créer' dans la collection users
            const docRef = doc(db, "users", user.uid);

            //setup le doc avec les infos de l'utilisateur
            getDoc(docRef).then((docSanp) => {
                if (docSanp.exists()) {
                    window.location.href = "/";
                }
                else {
                    setDoc(docRef, {
                        username: user.displayName,
                        email: user.email,
                        xp : 0,
                        photo : user.photoURL,

                    }).then(() => {
                        window.location.href = "/";
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
};


//Event listener pour le bouton google
function clickGoogle() {
    let clickGoogle = document.getElementById('google');
    clickGoogle.addEventListener('click', function (e) {
        Google(e);
    });
};



//Quand on clique sur le bouton login on lance la fonction login
window.login = function (e) {
    login(e);
}

clickGoogle();
