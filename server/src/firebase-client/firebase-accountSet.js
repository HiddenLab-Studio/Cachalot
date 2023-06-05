// Import des fonctions dont on a besoin
import { signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { collection, doc, deleteDoc, addDoc, getDoc, onSnapshot, query, orderBy, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { ref, onChildAdded } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import firebaseConfigClient from "../composable/firebaseConfigClient.js";


//Firebase configuration
const { auth, db } = firebaseConfigClient();

/***** SIGNOUT */
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

/***** DELET ACCOUNT */
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
                console.error("Pb supp Monsieur:", error);
            }
            );
        }).catch((error) => {
            console.error("Pb supp doc Monsieur", error);
        });
    })
}

function addXPToUser() {
    const user = auth.currentUser;
    const docRef = doc(db, 'users', user.uid)
    getDoc(docRef).then((doc) => {
        const xp = doc.data().xp;
        updateDoc(docRef, {
            xp: xp + 1,
        })
    })
}             


/**GET CANNAL */
function room() {
    const room = document.getElementById('room').value;
    return room;
}

window.room = async function (e) {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = "";
    room()
    await getMessage();
}

/***** SEND MESSAGE */
function sendMessage(e) {
    e.preventDefault();
    //On recupere l'utilisateur connecté
    const user = auth.currentUser;
    //On recupere le username de l'utilisateur
    let username = "Anonymous";
    let xp = 0;
    getDoc(doc(db, "users", user.uid)).then((doc) => {
        username = doc.data().username;
        //On recupere l'xp de l'utilisateur
        xp = doc.data().xp;
    }).then(() => {
        //On recupere le message
        const message = document.getElementById('inputMessage').value;
        //On prend la date 
        const date = new Date();
        //On recupere l'heure et la date  
        const hour = date.toLocaleDateString() + " | " + date.toLocaleTimeString();

        //On ajoute les info dans un objet
        const data = {
            message: message,
            user: username,
            date: hour,
            like: 0,
            xp: xp,
        }
        //On ajoute le message dans la collection messages
        addDoc(collection(db, room()), data).then(() => {
            document.getElementById('inputMessage').value = "";
        })
        addXPToUser();

    }).catch((error) => {
        console.error("Error adding document: ", error);
    });

}

window.message = function (e) {
    sendMessage(e);
}


//on recupere les messages envoyé 
function getMessage() {
    //On recupere la collection messages en fonction de le room
    const messagesCollection = collection(db, room());
    //On recupere les messages par date croissante
    const message = query(messagesCollection, orderBy("date", 'asc'));

    //On regarde le changement dans la collection
    onSnapshot(message, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            //Si le changement est un ajout
            if (change.type === "added") {
                //On recupere les données du message
                const data = change.doc.data();
                const message = data.message;
                const user = data.user;
                const date = data.date;
                const like = data.like;

                const messageList = document.getElementById('messageList');
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="message">
                        <p class="message__user">${user}</p>
                        <p class="message__content">${message}</p>
                        <p class="message__date">${date}</p>
                        <p class="message__like">${like}</p>
                        <button id="like+${change.doc.id}" onclick="like(id)" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Like
                        </button>
                    </div>`;
                messageList.appendChild(li);
            }
        });
    });
}

/***** LIKE */
function like(id) {
    //On recupere l'id du message avec le split qui prend le deuxieme element du "tableau"
    const idMessage = id.split('+')[1];
    const user = auth.currentUser;

    console.log(idMessage);
    console.log(room());
    //On recupere le document du message
    const docRef = doc(db, room(), idMessage);
    //On recupere le document de l'utilisateur
    const userDocRef = doc(db, room() + "/" + idMessage + "/like", user.uid);
    //On regarde si l'utilisateur a deja like
    getDoc(userDocRef).then((doc) => {
        if (doc.exists()) {
            console.log("Il a deja like");
            return;
        }
        //Sinon on push le like avec l'utilisteur qui a like dans la collection like
        else {
            getDoc(docRef).then((doc) => {
                //On recupere les likes
                const like = doc.data().like;
                //On update le document avec 1 like en plus 
                updateDoc(docRef, {
                    like: like + 1,
                    //On update la collection des différene utilisateur qui ont like
                }).then(() => {
                    console.log("Perfecto");
                    setDoc(userDocRef, {
                        like: 1,
                    })
                }).catch((error) => {
                    console.error("Error getting document:", error);
                });
            }).catch((error) => {
                console.error("Error getting document:", error);
            });
        }
    })
}


window.like = function (id) {
    like(id);
}


/*** CREATE ROOM */

function createRoom() {
    const user = auth.currentUser;
    //On crée une chaine de caractères aléatoire de 5 caractères
    const room = Math.random().toString(36).substring(2, 7).toUpperCase();
    //On ajoute la room dans la collection rooms
    console.log(room);
    const docRef = doc(db, "rooms", room);
    const data = {
        admin: user.uid,
        date: new Date(),
    }

    setDoc(docRef, {
        admin: data.admin,
        date: data.date,
    })

}


function clickCreateRoom() {
    const createRoomButton = document.getElementById('createRoom');
    createRoomButton.addEventListener('click', () => {
        createRoom();
    })
}


getMessage();
clickSignOut();
clickDeleteAccount();
clickCreateRoom();