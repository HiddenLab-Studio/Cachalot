// Import des fonctions dont on a besoin
import { signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { collection, doc, deleteDoc, addDoc, getDoc, onSnapshot, query, orderBy, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { ref, onChildAdded } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import firebaseConfigClient from "../composable/firebaseConfigClient.js";

//Firebase configuration
const { auth, db } = firebaseConfigClient();

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