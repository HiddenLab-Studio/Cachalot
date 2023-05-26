//Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { firebaseConfig } from "./firebase-register.js";
import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";


// Your web app's Firebase configuration
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//Login system
function login(e) {
    e.preventDefault();
    //Recuperation des element html
    let obj = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    console.log(obj);
    //fonction de login
    signInWithEmailAndPassword(auth, obj.username, obj.password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.uid);

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
                .catch(function (error) { console.log(error); })
            
            //Recuperation du token
            user.getIdToken().then((idToken) => {
                console.log(idToken);
                exports.token = idToken;
            }).catch((error) => {
                console.log("pas de token");
            })

        });

}

window.login = function (e) {
    login(e);
}