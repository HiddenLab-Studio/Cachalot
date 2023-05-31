import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import firebaseConfigClient from "../composable/firebaseConfigClient.js";


//Firebase configuration
const { auth, db } = firebaseConfigClient();


//Password reset
function passwordReset(e) {
    e.preventDefault();
    //on recupere l'email
    const email = document.getElementById("email").value;
    //on envoie un email de reinitialisation de mot de passe
    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset email sent!");
        })
        .catch((error) => {
            alert(error.message);
        });
}


window.passwordReset = function (e) {
    passwordReset(e);
}