import { collection, doc, addDoc, getDocs, getDoc, updateDoc, onSnapshot, query, orderBy, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../../composable/firebaseConfigClient.js";

const { auth, db } = firebaseConfigClient();

//FONCTION IMPORTANTES
//Rejoindre la queue
function joinGame(discipline) {
    const user = auth.currentUser;
    const userRef = doc(db, "users", user.uid);

    getDoc(userRef).then(async (docUser) => {
        if (docUser.exists()) {
            const ligueRef = collection(db, "ligue/" + discipline + "/games");
            const ligueDoc = await getDocs(ligueRef);
            const newGame = ligueDoc.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            });
            if (newGame.length == 0 ) {
                await createGame(discipline, docUser.data().username, docUser.data().photo, user.uid ,"game1");
            }
            else {
                newGame.forEach(async game => {
                    if (game.state == "waiting") {
                        const docRef = doc(db, "ligue", discipline, "games", game.id, "players", user.uid);
                        const docGame = doc(db, "ligue", discipline, "games", game.id);
                        await setDoc(docRef, {
                            name: docUser.data().username,
                            photo: docUser.data().photo,
                            score : 0
                        })
                        await updateDoc(docGame, {
                            state: "playing"
                        }).then(() => {
                            window.location.href = discipline + "/"+game.id;
                        })

                    }
                    else {
                        await createGame(discipline, docUser.data().username, docUser.data().photo, user.uid, "game2");
                    }
                })
            }
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

}


async function createGame(discipline, username, photo, id, gameId) {
    const docRef = doc(db, "ligue", discipline, "games", gameId, "players", id);
    const docGame = doc(db, "ligue", discipline, "games", gameId);
    await setDoc(docRef, {
        name: username,
        photo: photo,
        score : 0,
    })
    await setDoc(docGame, {
        state: "waiting"
    })
    window.location.href = discipline+ "/"+ gameId;
}


//AFFICHAGE HTML INUTILE REACT 
function clickOnJoinGame() {
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", async () => {
        const discipline = document.getElementById("discipline").value;
        await joinGame(discipline);
    });
}

clickOnJoinGame();

/*
function clickOnLeaveGame() {
    const cancelButton = document.getElementById("cancelButton");
    cancelButton.addEventListener("click", async () => {
        const discipline = document.getElementById("waitingGameDiscipline").innerHTML;
        await leaveQueue(discipline);
        affichageRecherche();
    });
}

function affichageRecherche() {
    const searchGame = document.getElementById("searchGame");
    searchGame.classList.remove("hidden");
    const waitingGame = document.getElementById("waitingGame");
    waitingGame.classList.add("hidden");
}

function affichageQueue(discipline) {
    const searchGame = document.getElementById("searchGame");
    searchGame.classList.add("hidden");
    const waitingGame = document.getElementById("waitingGame");
    waitingGame.classList.remove("hidden");
    const waitingGameDiscipline = document.getElementById("waitingGameDiscipline");
    waitingGameDiscipline.innerHTML = discipline;
}


clickOnJoinGame();
clickOnLeaveGame();
/*




/* FONCTION OBSOLETE ELLES PRENNES TROP DE LECTURE DE DONNEES
async function joinQueue(discipline) {
    const user = auth.currentUser;
    const userRef = doc(db, "users", user.uid);

    await getDoc(userRef).then(async (docUser) => {
        if (docUser.exists()) {
            const ligueRef = doc(db, "ligue", discipline);
            const ligueDoc = await getDoc(ligueRef);

            if (ligueDoc.exists()) {
                const newQueue = ligueDoc.data().queue || {};

                newQueue[user.uid] = {
                    "name": docUser.data().username,
                    "photo": docUser.data().photo,
                    "id": user.uid
                };

                await updateDoc(ligueRef, {
                    queue: newQueue
                }).then(async () => {
                    const gameId = await stateQueue(discipline)

                    if (gameId == "En attente d'un autre joueur") {
                        console.log(gameId)
                    }
                    else {
                        
                    }
                })
            }
        };
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

//Quitter la queue
async function leaveQueue(discipline) {
    const user = auth.currentUser;
    const userRef = doc(db, "users", user.uid);

    await getDoc(userRef).then(async (docUser) => {
        if (docUser.exists()) {
            const ligueRef = doc(db, "ligue", discipline);
            const ligueDoc = await getDoc(ligueRef);

            if (ligueDoc.exists()) {
                const newQueue = ligueDoc.data().queue || {};

                delete newQueue[user.uid];

                await updateDoc(ligueRef, {
                    queue: newQueue
                })
            }
        };
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

async function stateQueue(discipline) {
    const ligueRef = doc(db, "ligue", discipline);
    const ligueDoc = await getDoc(ligueRef);

    if (ligueDoc.exists()) {
        const queue = ligueDoc.data().queue || {};
        if (Object.keys(queue).length >= 2) {
            const idGame = "Game1" //Math.floor(Math.random() * 1000000000);
            const newGame = doc(db, "ligue/", discipline, "/games", idGame);
            await setDoc(newGame, {
                "players": queue,
                "state": "waiting"
            });
            await updateDoc(ligueRef, {
                queue: {}
            })
            return idGame
        }
        else {
            return "En attente d'un autre joueur"
        }
    }
}

async function redirectGame(discipline) {
    const ligueRef = collection(db, "ligue/" + discipline + "/games");

    onSnapshot(ligueRef, (docSnapshot) => {
        docSnapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
                const user = auth.currentUser;
                const idUser = user.uid;

                const userLigueGame = doc(db, "ligue", discipline, "games", change.doc.id);
                const userLigueGameDoc = await getDoc(userLigueGame);
                const players = Object.values(userLigueGameDoc.data().players);

                players.forEach(async player => {
                    if (player.id == idUser) {
                        console.log("redirect") 
                        await updateDoc(userLigueGame, {
                            state: "playing"
                        })
                    }
                })
                
            }
        });
    });
}

*/