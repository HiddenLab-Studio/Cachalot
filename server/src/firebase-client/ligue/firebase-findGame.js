import { collection, doc, addDoc, getDocs, getDoc, updateDoc, onSnapshot, query, orderBy, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../../composable/firebaseConfigClient.js";

const { auth, db } = firebaseConfigClient();

//FONCTION IMPORTANTES

/*IL MANQUE JUSTE DE CREER UN ID UNIQUE POUR LES GAMES*/
//Rejoindre la queue
async function joinGame(discipline) {
    let result = false;
    const user = auth.currentUser;
    const userRef = doc(db, "users", user.uid);

    await getDoc(userRef).then(async (docUser) => {
        if (docUser.exists()) {
            const ligueRef = collection(db, "ligue/" + discipline + "/games");
            const ligueDoc = await getDocs(ligueRef);
            const newGame = ligueDoc.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            });

            //Si il n'y a pas de partie en attente on en crée une game
            if (newGame.length == 0 ) {
                await createGame(discipline, docUser.data().username, docUser.data().photo, user.uid ,"game1");
                result = true;
            }
            else {
                //Sinon on regarde s'il y a une partie en atente pour le faire rentrer dedans
                newGame.forEach(async game => {
                    if (game.state == "waiting") {
                        const docRef = doc(db, "ligue", discipline, "games", game.id, "players", user.uid);
                        const docGame = doc(db, "ligue", discipline, "games", game.id);
                        await setDoc(docRef, {
                            name: docUser.data().username,
                            photo: docUser.data().photo,
                            score : 0,
                            ready : false
                        })
                        await updateDoc(docGame, {
                            state: "starting"
                        }).then(() => {
                            //Redirection vers la partie
                            window.location.href = discipline + "/"+game.id;
                            result = true;
                        })

                    }
                    //Si pas de partie en attendant on en crée une
                    else {
                        await createGame(discipline, docUser.data().username, docUser.data().photo, user.uid, "game2");
                        result = true;
                    }
                })
            }
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
        result = false;
    });
    return result;
}

//ON SETUP UNE PARTIE
async function createGame(discipline, username, photo, id, gameId) {
    const docRef = doc(db, "ligue", discipline, "games", gameId, "players", id);
    const docGame = doc(db, "ligue", discipline, "games", gameId);
    await setDoc(docRef, {
        name: username,
        photo: photo,
        score : 0,
        ready : false
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

