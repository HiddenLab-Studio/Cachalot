// Import des fonctions dont on a besoin
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import {getFirestore,collection,doc , setDoc} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";


//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApd9ADhAD0IOBk4eZlL5ogF7CvOCLOh5Y",
  authDomain: "projetbe-512f9.firebaseapp.com",
  projectId: "projetbe-512f9",
  storageBucket: "projetbe-512f9.appspot.com",
  messagingSenderId: "871678987439",
  appId: "1:871678987439:web:10e906ccb15a716e32185a"
};

//Initialisation de firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


function register(e) {
  e.preventDefault();
  //Recuperation des element html dans un objet
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
        console.log(user.uid);

        //Ajout des informations supplémentaires dans la base de donnee
        //Ajout du document dans la collection users
        const userDocRef = doc(db, "users", user.uid);
        //Ajout des informations dans le document
        setDoc(userDocRef, {
          username: obj.username,
          age: obj.age,
          email: obj.email,
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

export { firebaseConfig };





