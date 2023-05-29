// Import des fonctions dont on a besoin
import {createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import {collection ,doc , setDoc} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../composable/firebaseConfigClient.js";

//Firebase configuration
const {auth, db } = firebaseConfigClient();


function register(e) {
  e.preventDefault();
  //Recuperation des elements html dans un objet
  let obj = {
    email: document.getElementById('email').value,
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value,
    age: document.getElementById('age').value,
  };
  console.log(obj);

  //Verification des mots de passe
  if (obj.password != obj.confirmPassword) {
    alert("passwords do not match");
    return;
  }
  else {
    //Creation de l'utilisateur avec e-mail et mot de passe
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
      .then((userCredential) => {
        const user = userCredential.user;
      

        //Ajout des informations supplémentaires dans la base de donnee
        //Ajout du document dans la collection users
        const userDocRef = doc(db, "users", user.uid);
        //Ajout des informations dans le document
        setDoc(userDocRef, {
          username: obj.username,
          age: obj.age,
          email: obj.email,
        }).then(() => {
          //On le redirige vers la page de principale
          window.location.href = "/";
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      })
  }
};




//Event listener pour le bouton register
window.register = function (e) {
  register(e);
};





