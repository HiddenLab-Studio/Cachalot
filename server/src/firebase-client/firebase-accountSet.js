// Import des fonctions dont on a besoin
import { signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { collection, doc, deleteDoc, addDoc, getDoc, onSnapshot, query, orderBy,limit} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
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
    getDoc(doc(db, "users", user.uid)).then((doc) => {
        username = doc.data().username;
    }).then(() => {
        //On recupere le message
        const message = document.getElementById('inputMessage').value;
        //On prend la date 
        const date = new Date();
        //On recupere l'heure et la date  
        const hour =  date.toLocaleDateString() + " | " + date.toLocaleTimeString();
        //On ajoute les info dans un objet
        const data = {
            message: message,
            user: username,
            date: hour
        }
        //On ajoute le message dans la collection messages
        addDoc(collection(db, room()), data).then(() => {
            document.getElementById('inputMessage').value = "";
        })

    }).catch((error) => {
        console.error("Error adding document: ", error);
    });

}

window.message = function (e) {
    sendMessage(e);
}


function getMessage() {
    const messagesCollection = collection(db, room());
    const message = query(messagesCollection, orderBy("date", 'asc'));
    onSnapshot(message, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
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
    });
}


getMessage();
clickSignOut();
clickDeleteAccount();