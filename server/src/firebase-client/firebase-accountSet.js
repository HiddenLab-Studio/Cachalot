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
async function getXP() {
    const user = auth.currentUser;
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    const xp = docSnap.data().xp;
    return xp;
}

async function getLevel() {
    const user = auth.currentUser;
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    const level = docSnap.data().level;
    return level;
}

async function addXPToUser() {
    const user = auth.currentUser;
    const docRef = doc(db, 'users', user.uid);

    try {
        const docSnap = await getDoc(docRef);
        let xp = docSnap.data().xp;

        if (typeof xp === 'number' && !isNaN(xp)) {
            xp = Math.max(0, xp) + 1;
            console.log(xp);
        } else {
            xp = 1;
        }

        await updateDoc(docRef, { xp: xp });
        return xp; // Ajout de cette ligne pour renvoyer la nouvelle valeur de l'XP
    } catch (error) {
        console.error("Error updating XP:", error);
        throw error; // Ajout de cette ligne pour propager l'erreur
    }
}


async function levelUp() {
    const user = auth.currentUser;
    const docRef = doc(db, 'users', user.uid);

    try {
        const docSnap = await getDoc(docRef);
        const xp = await addXPToUser(); // Utiliser la nouvelle valeur de xp renvoyée par addXPToUser()

        let level = docSnap.data() && docSnap.data().level; // Vérifier si docSnap.data() existe et si level est défini
        level = xp >= 10 ? Math.max(0, level || 0) + 1 : (level || 0);

        console.log('Level up');
        console.log(level);

        await updateDoc(docRef, { xp: 0, level: level });
    } catch (error) {
        console.error("Error updating XP and level:", error);
    }
}

// Récupérer la référence du bouton
const xpButton = document.getElementById('xpButton');

// Ajouter le gestionnaire d'événements au bouton
xpButton.addEventListener('click', async () => {
    console.log('click boutton xp');
    const newXP = await addXPToUser();
    if (newXP !== null && newXP >= 10) {
        await levelUp();
    }
});



async function getusername() {
    const user = auth.currentUser;
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    const username = docSnap.data().username;
    return username;
}

/**GET CANNAL */
function room() {
    const room = document.getElementById('room').value;
    return room;
}

window.room = async function (e) {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = "";
    await room();
    await getMessage();
}

async function sendMessage(e) {
    e.preventDefault();
    // On récupère l'utilisateur connecté
    const user = auth.currentUser;
    // On récupère le username de l'utilisateur
    let username = await getusername();
    // On récupère l'xp de l'utilisateur
    let xp = await getXP();
    let level = await getLevel();

    if (!level) {
        level = 0; // Valeur par défaut pour level
    }


    //const docRef = doc(db, "users", user.uid);
    //const docSnap = await getDoc(docRef);
    //username = docSnap.data().username;

    // On récupère le message
    const message = document.getElementById('inputMessage').value;
    // On prend la date 
    const date = new Date();
    // On récupère l'heure et la date  
    const hour = date.toLocaleDateString() + " | " + date.toLocaleTimeString();

    // On ajoute les infos dans un objet
    const data = {
        message: message,
        user: username,
        date: hour,
        like: 0,
        xp: xp,
        level: level,
    }

    // On ajoute le message dans la collection messages
    await addDoc(collection(db, room()), data);
    document.getElementById('inputMessage').value = "";

    await addXPToUser();
    await levelUp();
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