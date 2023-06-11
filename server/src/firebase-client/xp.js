import { signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { collection, doc, deleteDoc, addDoc, getDoc, onSnapshot, query, orderBy, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { ref, onChildAdded } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import firebaseConfigClient from "../composable/firebaseConfigClient.js";

// Firebase configuration
const { auth, db } = firebaseConfigClient();

async function addXPToUser() {
    const user = auth.currentUser;
    const docRef = doc(db, 'users', user.uid);

    try {
        const docSnap = await getDoc(docRef);
        let xp = docSnap.data().xp;

        if (typeof xp === 'number' && !isNaN(xp)) {
            xp = Math.max(0, xp);
            console.log(xp);
        } else {
            xp = 1;
        }

        await updateDoc(docRef, { xp: xp + 1 });
        return xp; 
    } catch (error) {
        console.error("Error updating XP:", error);
        throw error;
    }
}



async function levelUp() {
    const user = auth.currentUser;
    const docRef = doc(db, 'users', user.uid);

    try {
        const docSnap = await getDoc(docRef);
        const xp = docSnap.data().xp;

        let level = docSnap.data()?.level || 0;
        const levelData = await loadLevelData();
        const xpRequired = levelData[level + 1] || -1;

        if (xp >= xpRequired) {
            level++;
            console.log('Level up');
            console.log(level);
            await updateDoc(docRef, { xp: 0, level: level });
        }
    } catch (error) {
        console.error("Error updating XP and level:", error);
    }
}

const xpButton = document.getElementById('xpButton');

xpButton.addEventListener('click', async () => {
    console.log('click boutton xp');
    await addXPToUser();
    await levelUp();
});



async function loadLevelData() {
    try {
        const response = await fetch('http://localhost:4000/xp-data');
        const levelData = await response.json();
        return levelData;
    } catch (error) {
        console.error("Error loading level data:", error);
        throw error;
    }
}

async function resetLevel() {
    const user = auth.currentUser;
    const docRef = doc(db, 'users', user.uid);

    try {
        await updateDoc(docRef, { level: 0 });
        console.log('Level reset');
    } catch (error) {
        console.error("Error resetting level:", error);
    }
}

