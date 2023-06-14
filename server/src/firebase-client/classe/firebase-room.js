import { collection, doc, addDoc, getDoc,getDocs, onSnapshot, query, orderBy, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../../composable/firebaseConfigClient.js";

const { auth, db } = firebaseConfigClient();


/*** CREATE ROOM */

//max classe Admin 
async function maxClasseAdmin() {
    let result = false;
    const user = auth.currentUser;
    const docRef = collection(db, "users/" +user.uid+ "/classesAdmin");
    await getDocs(docRef).then((querySnapshot) => {
        if (querySnapshot.size < 5) {
            result = true;
        }
        else {
            result = false;
        }
    })
    return result;
}

async function createClasse(name) {
    let result = false;
    //On recupere l'utilisateur connecté pour le mettre en admin de la room
    const user = auth.currentUser;
    //On crée une chaine de caractères aléatoire de 5 caractères
    const classeCode = Math.random().toString(36).substring(2, 7).toUpperCase();
    
    //On ajoute la room dans la collection rooms
    console.log(classeCode);
    const maxClasse = await maxClasseAdmin();

    //preparation du doc
    const docRef = doc(db, "classes", classeCode);
    const userDocRef = doc(db, 'users', user.uid);
    const userRef = doc(db, "users", user.uid, "classesAdmin", classeCode);

    await getDoc(docRef).then((doc) => {
        if (maxClasse == true) {
            if (!doc.exists()) {
                getDoc(userDocRef).then((doc) => {

                    const data = {
                        name: name,
                        adminUsername: doc.data().username,
                        adminPhoto: doc.data().photo,
                        dateCreation: new Date(),
                    }
                    //on ajoute le doc

                    setDoc(docRef, {
                        name: data.name,
                        admin: {
                            username: data.adminUsername,
                            photo: data.adminPhoto,
                            id: user.uid,
                        },
                        dateCreation: data.dateCreation,

                    }).then(() => {
                        setDoc(userRef, {
                            name: data.name,
                            dateCreation: data.dateCreation,
                        }).then(() => {
                            result = true;
                        })
                    })
                })
            }
            else {
                createRoom(name);

            }
        }
        else {
            console.log("Vous avez atteint le nombre maximum de classe");
            return result;
        }
    })
    return result;
}

//Event listener pour le bouton createRoom
function clickCreateRoom() {
    const createRoomButton = document.getElementById('createClasse');
    createRoomButton.addEventListener('click', () => {
        const nameClasse = document.getElementById('nameClasse').value;
        createClasse(nameClasse);
    })
}


async function joinClasse(code) {
    let result = false;
    //On recupere l'utilisateur connecté pour le mettre en admin de la room
    const user = auth.currentUser;
    //On ajoute la room dans la collection rooms
    console.log(code);

    //preparation du doc
    const docRef = doc(db, "classes", code);
    const userRefClasses = doc(db, "users", user.uid, "classes", code);
    const userClassesRef = doc(db, "classes", code, "users", user.uid);
    const userRef = doc(db, "users", user.uid);

    await getDoc(docRef).then((doc) => {
        if (doc.exists()) {
            console.log("bienvenue dans la classe : " + code);
            if (doc.data().admin == user.uid) {
                console.log("Vous êtes l'admin de la classe");
            }
            else {
                setDoc(userRefClasses, {
                    name: doc.data().name,
                    dateJoin: new Date(),

                }).then(() => {
                    getDoc(userRef)
                        .then((doc) => {
                            if (doc.exists()) {
                                setDoc(userClassesRef, {
                                    username: doc.data().username,
                                    dateJoin: new Date(),
                                    exercises: {
                                        exoDone: 0,
                                        exoStarted: 0,

                                    },
                                    photo: doc.data().photo,
                                })
                            }
                        })
                })
            }
        }
        else {
            console.log("Pas de classe avec ce code");
            return result;
        }
    }).then(() => {
        result = true;
    })
    return result;
}

function clickJoinClasse() {
    const joinClasseButton = document.getElementById('joinClasse');
    joinClasseButton.addEventListener('click', () => {
        const codeClasse = document.getElementById('codeClasse').value;
        joinClasse(codeClasse);
    })
}

//Event listener pour le bouton createRoom




/*** JOIN ROOM */
/*
//Variable globale, elle dégage apres la fonction room() terminé -- C IGNOBLE MAIS J'AI LA FLEMME
let roomValue = 0;

//fonction pour rejoindre une room
function joinRoom(e) {
    //pour les frmulaire
    e.preventDefault();

    //On recupere la value de l'input
    roomValue = document.getElementById('inputRoom').value;
    //On recupere la room dans la collection de la room
    const docRef = doc(db, "rooms", roomValue);

    //On regarde si la room existe
    getDoc(docRef).then((doc) => {
        if (doc.exists()) {
            //Si elle existe on affiche la room
            console.log("bienvenue dans la room : " + roomValue);
            affichageRoom(roomValue);
            //On recupere les messages de la room
            getMessage();

        } else {
            // doc.data() will be undefined in this case
            console.log("Pas de room avec ce nom");
            return;
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}


//AFFICHAGE ROOM EN HTML DU COUP AVEC REACT CA DEGAGE
function affichageRoom(room) {
    //NUL EN REACT
    const roomSetup = document.getElementById('roomSetup');
    const roomJoin = document.getElementById('room');
    const roomName = document.getElementById('roomName');

    roomSetup.classList.add('hidden');
    roomJoin.classList.remove('hidden');
    roomName.innerHTML = "Bienvenue dans la room : " + room + " !";
}


//"Event listener" pour le bouton joinRoom
window.clickJoinRoom = function (e) {
    joinRoom(e);
}



//Je reprend le truc de accountSet.js, je sais c'est dégueulasse mais je suis fatigué
//On recupere la value de la room :: C'est à faire actuellement variable globale

/**A FAIRE CLEAN POUR RECUPERER LA VALUE DE LA ROOM SANS VARIABLE GLOBALE */
/*
function room() {
    return roomValue;
}



/***** SEND MESSAGE */
/*
function sendMessage(e) {
    e.preventDefault();
    //On recupere l'utilisateur connecté
    const user = auth.currentUser;
    //On recupere le username de l'utilisateur
    const docRef = doc(db, "users", user.uid);
    getDoc(docRef).then((doc) => {
        //On recupere le message
        const message = document.getElementById('inputMessage').value;
        //On prend la date 
        const date = new Date();
        //On recupere l'heure et la date  
        const hour = date.toLocaleDateString() + " | " + date.toLocaleTimeString();
        //On ajoute les info dans un objet
        const data = {
            message: message,
            user: doc.data().username,
            date: hour,
        }
        //On ajoute le message dans la collection messages
        addDoc(collection(db, "rooms/" + room() + "/messages"), data).then(() => {
            //On vide le champ de message
            document.getElementById('inputMessage').value = "";
        })

    }).catch((error) => {
        console.error("Error adding document: ", error);
    });

}

window.message = function (e) {
    sendMessage(e);
}


/**GETROOM AND CHANGE ON ROOM */
//on recupere les messages envoyé 
/*
function getMessage() {
    //On recupere la collection messages en fonction de le room
    const messagesCollection = collection(db, "rooms/" + room() + "/messages");
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

                const messageList = document.getElementById('messageList');
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="message">
                        <p class="message__user">${user}</p>
                        <p class="message__content">${message}</p>
                        <p class="message__date">${date}</p>
                    </div>`;
                messageList.appendChild(li);
            }
        });
    })
}

*/
clickCreateRoom();
clickJoinClasse();