// Import des fonctions dont on a besoin
import { signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { collection, doc, deleteDoc, addDoc, getDoc, onSnapshot, query, orderBy, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../composable/firebaseConfigClient.js";

// Firebase configuration
const { auth, db } = firebaseConfigClient();

export async function handleQuestCompletion() {
    try {
        // Charger les données de quête depuis le fichier JSON via une requête HTTP
        const questData = await loadQuestData();

        if (Array.isArray(questData) && questData.length > 0) {
            // Trouver la quête avec l'id 0
            const quest = questData.find((q) => q.id === 0);

            if (quest) {
                // Vérifier si la quête a déjà été réalisée aujourd'hui
                const lastCompletionDate = localStorage.getItem('questLastCompletionDate');
                const today = new Date().toLocaleDateString();
                if (lastCompletionDate === today) {
                    console.log("Vous avez déjà réalisé cette quête aujourd'hui.");
                    return;
                }

                // Marquer la quête comme terminée dans les données chargées
                quest.completed = true;

                // Enregistrer les données mises à jour dans le stockage local du navigateur
                saveQuestData(questData);

                // Ajouter l'XP correspondant à l'utilisateur
                const user = auth.currentUser;
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                let xp = docSnap.data().xp;
                if (typeof xp !== 'number' || isNaN(xp)) {
                    xp = 1;
                }
                xp = Math.max(0, xp);
                await updateDoc(docRef, { xp: xp + quest.amount });

                // Enregistrer la date de réalisation de la quête
                localStorage.setItem('questLastCompletionDate', today);

                console.log("Quête terminée !");
                console.log("XP actuel :", xp + quest.amount);
            } else {
                console.log("Quête non trouvée.");
            }
        } else {
            console.log("Aucune donnée de quête disponible.");
        }
    } catch (error) {
        console.error("Erreur lors de la gestion de la quête:", error);
    }
}



// Fonction pour charger les données de quête depuis le fichier JSON via une requête HTTP
function loadQuestData() {
    return fetch('http://localhost:4000/quests')
        .then((response) => response.json())
        .catch((error) => {
            console.error('Erreur lors du chargement des données de quête:', error);
            throw error;
        });
}

// Fonction pour enregistrer les données de quête dans le stockage local du navigateur
function saveQuestData(questData) {
    const serializedData = JSON.stringify(questData);
    localStorage.setItem('questData', serializedData);
}
