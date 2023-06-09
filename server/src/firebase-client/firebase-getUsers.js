// Import des fonctions dont on a besoin
import { signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { collection, doc, getDocs, getDoc, onSnapshot, query, orderBy, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../composable/firebaseConfigClient.js";
import { pushXp } from "../composable/firebaseConfigClient.js";


//Firebase configuration
const { auth, db } = firebaseConfigClient();

async function getUserByUsername(username) {
    //recuperer la liste des users
    const usersCol = collection(db, 'users');
    //recuperer la liste des documents
    const usersSnapshot = await getDocs(usersCol);
    //recuperer la liste des données
    const usersList = usersSnapshot.docs.map(doc => doc.data());
    //recuperer l'utilisateur
    const user = usersList.find(user => user.username === username);
    console.log(user);
    return user;

}

getUserByUsername('TONIO');