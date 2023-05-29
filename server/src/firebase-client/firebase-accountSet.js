// Import des fonctions dont on a besoin
import { signOut, updatePassword, deleteUser, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { getFirestore, collection, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../composable/firebaseConfigClient.js";


//Firebase configuration
const { auth, db } = firebaseConfigClient();


function clickSignOut() {
    //On recupere l'evenement du bouton signOut
    let clickSignout = document.getElementById('signOut');
    clickSignout.addEventListener('click', () => {
        // Sign out fonction de firebase
        signOut(auth).then(() => {
            // Youpi il est deco
            console.log('Sign-out successful.');
            window.location.href = "/login";
        }).catch((error) => {
            // On non une erreur
            console.log('An error happened.');
        });
    })
}


function clickDeleteAccount() {
    //Event listener pour le bouton deleteAccount
    let clickDeleteAccount = document.getElementById('deleteAccount');
    clickDeleteAccount.addEventListener('click', () => {
        //On recupére l'utilisateur connecté
        const user = auth.currentUser;
        //On récupère le document suppleémentaire de l'utilisateur
        const docRef = doc(db, 'users', user.uid)
        //On supprime le document supplémentaire de l'utilisateur
        deleteDoc(docRef).then(() => {
            //On supprime l'utilisateur
            deleteUser(user).then(() => {
                //On le redirige vers la page de login
                window.location.href = "/login";
            }).catch((error) => {
                console.error("Pb supp Monsieur:",error);
            }
            );
        }).catch((error) => {
            console.error("Pb supp doc Monsieur",error);
        });
    })
}




clickSignOut();
clickDeleteAccount();