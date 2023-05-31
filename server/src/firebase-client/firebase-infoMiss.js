import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../composable/firebaseConfigClient.js";

const { auth, db } = firebaseConfigClient();  


function moreInfo(e){
    e.preventDefault();
    //Recuperation des elements html dans un objet
    let obj = {
        age : document.getElementById('ageMiss').value,
    }
    //On recupére l'utilisateur connecté
    const user = auth.currentUser;
    //On récupère le document suppleémentaire de l'utilisateur
    const docRef = doc(db, 'users', user.uid)
    //On update le document supplémentaire de l'utilisateur
    updateDoc(docRef, {
        age: obj.age,
    }).then(() => {
        //On le redirige vers la page de login
        window.location.href = "/";
    }
    ).catch((error) => {
        console.error("Pb update doc Monsieur",error);
    }
    );
}


window.info = function(e){
    moreInfo(e);
}
