import { collection, doc, addDoc, getDocs, getDoc, onSnapshot, query, orderBy, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../../composable/firebaseConfigClient.js";

const { auth, db } = firebaseConfigClient();

//console.log(window.location.pathname);


//Get les infos de la classe et des éléves
async function getAllinfo(room) {
    //On get les bonnes collections et documents
    const docRef = doc(db, "classes", room);
    const docRefUsers = collection(db, "classes/" + room + "/users");

    //On prend les infos de la classe
    const docSnap = await getDoc(docRef);
    const dataClasse = docSnap.data();

    //On prend les infos des éléves
    const docRefUsersSort = query(docRefUsers, orderBy("exercises.exoDone", 'desc'));
    const docSnapUsers = await getDocs(docRefUsersSort);
    const dataUsers = docSnapUsers.docs.map(doc => doc.data());
    
    return { dataClasse, dataUsers };
};

//Utile que en html pour afficher les infos
function printInfo(info) {
    console.log(info);
    const nameClasse = document.getElementById('nameClasse');
    nameClasse.innerHTML = info.dataClasse.name;

    const adminList = document.getElementById('adminList');
    adminList.innerHTML = '';
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="flex items-center space-x-2 py-1">
            <img src="`+ info.dataClasse.admin.photo + `" alt="Personne 1" class="w-8 h-8 rounded-full">
            <span class="text-gray-800">`+ info.dataClasse.admin.username + `</span>
        </div>
    `;
    adminList.appendChild(li);

    const eleveList = document.getElementById('eleveList');
    eleveList.innerHTML = '';
    info.dataUsers.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="flex items-center space-x-2 py-1">
            <img src="`+ user.photo + `" alt="Personne 1" class="w-8 h-8 rounded-full">
            <span class="text-gray-800">`+ user.username + `</span>
        </div>
    `;
        eleveList.appendChild(li);
    });


    const userRanking = document.getElementById('userRanking');
    userRanking.innerHTML = '';
    let i = 1;
    info.dataUsers.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="flex items-center space-x-2">
            <span class="font-semibold">`+i+`.</span>
            <img src="`+ user.photo + `" alt="Personne 1" class="w-8 h-8 rounded-full">
            <span class="text-gray-800">`+ user.username + `</span>
        </div>
        <span class="text-gray-600">`+ user.exercises.exoDone +` exercices faits / </span> 
        <span class="text-gray-600">`+ Math.round((user.exercises.exoDone / user.exercises.exoStarted)*100) +`% de réussite</span>`
        userRanking.appendChild(li);
        i++;
    });
}


printInfo(await getAllinfo(window.location.pathname.split('/')[1]));



/*** MESSAGE ON CLASSE */
/***** SEND MESSAGE */
// On envoie le message IMPORTANT 
async function sendMessage(room, message) {
    let result = false;
    //On recupere l'utilisateur connecté
    const user = auth.currentUser;
    //On recupere le username de l'utilisateur
    const docRef = doc(db, "users", user.uid);
    getDoc(docRef).then((doc) => {
        //On prend la date 
        const date = new Date();
        const hour = date.toLocaleDateString() + " | " + date.toLocaleTimeString();
        //On ajoute les info dans un objet
        const data = {
            message: message,
            username: doc.data().username,
            photo: doc.data().photo,
            date: hour,
        }
        //On ajoute le message dans la collection messages
        addDoc(collection(db, "classes/" + room + "/messages"), data).then(() => {
            //On vide le champ de message
            result = true;
        })

    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
    return result;
}


/**GETROOM AND CHANGE ON ROOM */
//on recupere les messages envoyé 

//On recupere les messages de la room et on detecte les changements IMPORTANT 
function getMessage(room) {
    //On recupere la collection messages en fonction de le room
    const messagesCollection = collection(db, "classes/" + room + "/messages");
    //On recupere les messages par date croissante
    const message = query(messagesCollection, orderBy("date", 'asc'));

    //On regarde le changement dans la collection
    onSnapshot(message, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            //Si le changement est un ajout
            if (change.type === "added") {
                //On recupere les données du message
                const data = change.doc.data();
                printMessage(data);
            }
        });
    })
}

//On affiche le message en HTML
function printMessage(data) {
    //console.log(data);
    const messageList = document.getElementById('messageList');
    const li = document.createElement('li');
    li.innerHTML = `
                <div class="flex items-center space-x-2 flex-col-reverse md:flex-row">
                    <img src="`+ data.photo + `" alt="Utilisateur 1" class="w-8 h-8 rounded-full">
                    <div class="text-gray-800">
                        <span class="font-bold">`+ data.username + `</span>
                        <span class="text-gray-400 text-xs">`+ data.date + `</span>
                        <span class="block">`+ data.message + `</span>        
                    </div>
                </div>`;
    messageList.appendChild(li);
    scrollToBottom();
}

//Event click bouton ou on appel la fonction sendMessage
function clickOnSendMessage() {
    const sendMessageButton = document.getElementById('sendMessageButton');
    sendMessageButton.addEventListener('click', () => {
        const inputMessage = document.getElementById('inputMessage');
        sendMessage(window.location.pathname.split('/')[1], inputMessage.value);
        inputMessage.value = '';
    })
}


// Fonction pour effectuer un auto-scroll vers le bas de la liste de messages
function scrollToBottom() {
    const messageList = document.getElementById('messageList');
    messageList.scrollTop = messageList.scrollHeight;
}


getMessage(window.location.pathname.split('/')[1]);
clickOnSendMessage();



