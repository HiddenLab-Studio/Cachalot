// Import des fonctions dont on a besoin
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../../composable/firebaseConfigClient.js";
import { userExist } from "./firebase-getUsers.js";

//Firebase configuration
const { auth, db } = firebaseConfigClient();


async function register(e) {
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

  //Verification de l'existance du username
  const usernameExist = await userExist(obj.username);
  if (usernameExist) {
    console.log("Le nom d'utilisateur existe déjà");
    return;
  }
  //Verification des mots de passe
  else if (obj.password.length < 8) {
    console.log("Le mot de passe doit contenir au moins 8 caractères");
    return;
  }
  else if (obj.password.match(/[0-9]/g) == null) {
    console.log("Le mot de passe doit contenir au moins un chiffre");
    return;
  }
  else if (obj.password.match(/[A-Z]/g) == null) {
    console.log("Le mot de passe doit contenir au moins une lettre majuscule");
    return;
  }
  else if (obj.password.match(/[a-z]/g) == null) {
    console.log("Le mot de passe doit contenir au moins une lettre minuscule");
    return;
  }
  else if (obj.password.match(/[^a-zA-Z\d]/g) == null) {
    console.log("Le mot de passe doit contenir au moins un caractère spécial");
    return;
  }
  else if (obj.password != obj.confirmPassword) {
    console.log("C'est pas les mêmes mots de passe");
    return;
  }

  else {
    //Creation de l'utilisateur avec e-mail et mot de passe
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: obj.username
        }).then(() => {

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
            accountCreationDate: dateTime,
            userXp: {
              xp: 0,
              level: 1,
            },
            photo: "https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg",


          }).then(() => {
            //On le redirige vers la page de principale

            window.location.href = "/";
          });
        })
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




export async function follow(data) {
  let value = false;
  const user = auth.currentUser;
  const userFollower = doc(db, "users", user.uid + '/following/' + data.id);
  await setDoc(userFollower, {
    username: data.username,
    photoURL: data.photoURL,
  }).then(() => {
    const userFollowing = doc(db, "users", data.id + '/follower/' + user.uid);
    const docRef = doc(db, "users", user.uid);
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        setDoc(userFollowing, {
          username: doc.data().username,
          photoURL: doc.data().photoURL,
        }).then(() => {
          value = true;
        })
      }
    })
  }).catch((error) => {
    console.log(error);
  });

  return value;
}

export async function followingChange(){
  const user = auth.currentUser;
  const userFollower = doc(db, "users", user.uid + '/following');
  await onSnapshot(userFollower, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
              const data = {
                username : change.doc.data().username,
                photo : change.doc.data().photo,
              }
              return data;
          }
          if (change.type === "removed") {
              const data = {
                username : change.doc.data().username,
                photo : change.doc.data().photo,
              }
              return data;
          }
      })
  })
  return data;
}

export async function followerChange(){
  const user = auth.currentUser;
  const userFollower = doc(db, "users", user.uid + '/follower');
  await onSnapshot(userFollower, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
              const data = {
                username : change.doc.data().username,
                photo : change.doc.data().photo,
              }
              return data;
          }
          if (change.type === "removed") {
              const data = {
                username : change.doc.data().username,
                photo : change.doc.data().photo,
              }
              return data;
          }
      })
  })
  return data;
}



export async function unfollow(data) {
  let result = false;
  const user = auth.currentUser;
  const userFollower = doc(db, "users", user.uid + '/following/' + data.id);
  await deleteDoc(userFollower)
  const userFollowing = doc(db, "users", data.id + '/follower/' + user.uid);
  await deleteDoc(userFollowing).then(() => {
      result = true;
  })
 

  return result;
}