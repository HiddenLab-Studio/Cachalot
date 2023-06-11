// Import des fonctions dont on a besoin
import { signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { collection, doc, deleteDoc, addDoc, getDoc, onSnapshot, query, orderBy, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../composable/firebaseConfigClient.js";
import { handleQuestCompletion } from "./quests.js";

// Firebase configuration
const { auth, db } = firebaseConfigClient();

let messageCount = 0;

/***** SIGNOUT */
function clickSignOut() {
    // On récupère l'événement du bouton signOut
    let clickSignout = document.getElementById('signOut');
    clickSignout.addEventListener('click', () => {
        // Sign out fonction de firebase
        signOut(auth).then(() => {
            // Youpi il est déconnecté
            console.log('Sign-out successful.');
            window.location.href = "/login";
        }).catch((error) => {
            // Oups, une erreur s'est produite
            console.log('An error happened.');
        });
    })
}

/***** DELETE ACCOUNT */
function clickDeleteAccount() {
    // Event listener pour le bouton deleteAccount
    let clickDeleteAccount = document.getElementById('deleteAccount');
    clickDeleteAccount.addEventListener('click', () => {
        // On récupère l'utilisateur connecté
        const user = auth.currentUser;
        // On récupère le document supplémentaire de l'utilisateur
        const docRef = doc(db, 'users', user.uid)
        // On supprime le document supplémentaire de l'utilisateur
        deleteDoc(docRef).then(() => {
            // On supprime l'utilisateur
            deleteUser(user).then(() => {
                // On le redirige vers la page de login
                window.location.href = "/login";
            }).catch((error) => {
                console.error("Pb supp Monsieur:", error);
            });
        }).catch((error) => {
            console.error("Pb supp doc Monsieur", error);
        });
    })
}

/** GET ROOM */
function getRoom() {
    const room = document.getElementById('room').value;
    return room;
}

window.room = async function (e) {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = "";
    getRoom();
    await getMessage();
}

/***** SEND MESSAGE */
async function sendMessage(e) {
    e.preventDefault();
    // On récupère l'utilisateur connecté
    const user = auth.currentUser;

    // On récupère le username de l'utilisateur
    const docRef = doc(db, "users", user.uid);
    await getDoc(docRef).then(async (doc) => {
        // On récupère le message
        const message = document.getElementById('inputMessage').value;
        // On prend la date
        const date = new Date();
        // On récupère l'heure et la date
        const hour = date.toLocaleDateString() + " | " + date.toLocaleTimeString();
        // On ajoute les infos dans un objet
        const data = {
            message: message,
            user: doc.data().username,
            date: hour,
            like: 0,
        }

        // On ajoute le message dans la collection messages
        await addDoc(collection(db, getRoom()), data);
        document.getElementById('inputMessage').value = "";
        messageCount++;

        if (messageCount === 2) {
            await handleQuestCompletion();
            console.log("Quête terminée !");
            messageCount = 0;
        }
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}


window.message = function (e) {
    sendMessage(e);
}

function scrollToBottom() {
    const messageList = document.getElementById('messageList');
    messageList.scrollTop = messageList.scrollHeight;
}

// On récupère les messages envoyés
function getMessage() {
    // On récupère la collection messages en fonction de la room
    const messagesCollection = collection(db, getRoom());
    // On récupère les messages par date décroissante
    const message = query(messagesCollection, orderBy("like", 'desc'));

    // On regarde les changements dans la collection
    onSnapshot(message, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            // Si le changement est un ajout
            if (change.type === "added") {
                // On récupère les données du message
                const data = change.doc.data();
                const id = change.doc.id;

                // On extrait les informations du message
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
                        <p id="nbrLike+${id}" class="message__like">${like}</p>
                        <button id="like+${id}" onclick="like(id)" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Like
                        </button>
                    </div>`;
                messageList.appendChild(li);
                scrollToBottom();
            }
            if (change.type === "modified") {
                const like = change.doc.data().like;
                const id = change.doc.id;

                const nbrLike = document.getElementById('nbrLike+' + id);
                nbrLike.innerHTML = like;
            }
        });
    });
}

/***** LIKE */
function like(id) {
    // On récupère l'id du message avec le split qui prend le deuxième élément du tableau
    const idMessage = id.split('+')[1];
    const user = auth.currentUser;

    console.log(idMessage);
    console.log(getRoom());
    // On récupère le document du message
    const docRef = doc(db, getRoom(), idMessage);
    // On récupère le document de l'utilisateur
    const userDocRef = doc(db, `${getRoom()}/${idMessage}/like`, user.uid);
    // On regarde si le like existe déjà pour cet utilisateur
    getDoc(userDocRef).then((doc) => {
        // Si le like existe déjà
        if (doc.exists()) {
            console.log("You have already liked this message.");
        } else {
            // Sinon on ajoute le like pour cet utilisateur
            updateDoc(userDocRef, { liked: true }).then(() => {
                // On récupère le like actuel du message
                getDoc(docRef).then((doc) => {
                    const currentLikes = doc.data().like;
                    // On incrémente le like
                    updateDoc(docRef, { like: currentLikes + 1 });
                });
            });
        }
    });
}

// Fonction d'initialisation
function init() {
    clickSignOut();
    clickDeleteAccount();
    getRoom();
    getMessage();
}

init();
