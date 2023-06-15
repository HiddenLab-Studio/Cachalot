import { collection, doc, addDoc, getDocs, getDoc, updateDoc, onSnapshot, query, orderBy, setDoc , deleteDoc} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../../composable/firebaseConfigClient.js";

const { auth, db } = firebaseConfigClient();


//FONCTION IMPORTANTES
//LISTENER STATE GAME
function stateGame(discipline, gameId) {

    const docRef = doc(db, "ligue", discipline, "games", gameId);

    onSnapshot(docRef, async (docSnapshot) => {
        if (docSnapshot.exists()) {
            const docGame = docSnapshot.data();
            if (docGame.state == "waiting") {
                console.log("On cherche un joueur");
            }

            else if (docGame.state == "playing") {
                console.log("La partie va commencer");
                //Verifier si l'utilisateur est bien de la partie
                const userGood = await goodUser(discipline, gameId);
                if (userGood == true) {
                    await decompte(10);
                    console.log("On joue");
                    const end = await printGame(discipline, gameId);
                    if (end == true) {
                        await updateDoc(docRef, {
                            state: "end"
                        })
                    }
                    
                } else {
                    window.location.href = "/ligue";
                }
            } else if (docGame.state == "end") {
                console.log("On a fini");
                printScore(discipline, gameId);
            }
        }
    })
}


//LISTENER SCORE CHANGE
function onScoreChange(discipline, gameId) {
    const docRef = collection(db, "ligue", discipline, "games", gameId, "players");

    onSnapshot(docRef, async (docSnapshot) => {
        docSnapshot.docChanges().forEach(async (change) => {
            if(change.type === "modified"){
                console.log("Score modifié");
                printNewScore(change.doc.data().score, change.doc.id);
            }
            })
        })
}


//UPDATE MY SCORE
async function updateScore(discipline, gameId, score) {
    const user = auth.currentUser;
    const docRef = doc(db, "ligue", discipline, "games", gameId, "players", user.uid);
    const docSnap = await getDoc(docRef);
    
    await updateDoc(docRef, {
        score: docSnap.data().score + score
    })

}


//VERIFIE SI L'UTILISATEUR EST BIEN DANS LA PARTIE 
async function goodUser(discipline, gameId) {
    const user = auth.currentUser;
    const docRefUser = doc(db, "ligue", discipline, "games", gameId, "players", user.uid);
    const docSnapUser = await getDoc(docRefUser);
    if (docSnapUser.exists()) {
        return true;
    } else {
        return false;
    }
}

async function getInfoUsers(discipline, gameId) {
    const docRef = collection(db, "ligue", discipline, "games", gameId, "players");
    const docSnap = await getDocs(docRef);
    const users = docSnap.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
    });
    console.log(users);
    return users;
}


async function leaveQueue(discipline, gameId) {
    const user = auth.currentUser;
    const docRefUser = doc(db, "ligue", discipline, "games", gameId, "players", user.uid);
    const docRefGame = doc(db, "ligue", discipline, "games", gameId);
    const docSnapUser = await getDoc(docRefUser);
    if (docSnapUser.exists()) {
        await deleteDoc(docRefUser);
        //delete game si plus de joueur
        await deleteDoc(docRefGame);
    }
}

//FONCTION NUL A CHIER 
async function printGame(discipline, gameId) {
    return new Promise(async (resol) => {
        const playingGame = document.getElementById('playingGame');
        await playingGame.classList.remove('hidden');
        const waitingGame = document.getElementById('waitingGame');
        await waitingGame.classList.add('hidden');
        const decompte = document.getElementById('timerGame');

        onScoreChange(discipline, gameId);
        await printUsers(discipline, gameId);

        let  seconde = 10;
        let countdown = setInterval(async () => {
            seconde--;
            decompte.innerHTML = "il reste " + seconde + "s";
            if (seconde == 0) {
                await clearInterval(countdown);
                resol(true);
            }
        }
            , 1000);
    })

    
}

async function printScore() {
    const playingGame = document.getElementById('playingGame');
    await playingGame.classList.add('hidden');
    const score = document.getElementById('score');
    score.innerHTML = "PARTIE TERMINÉE";
    score.classList.remove('hidden');
}



async function decompte(seconde) {
    return new Promise(async (resol) => {
        const waitingGame = document.getElementById('waitingGame');
        await waitingGame.classList.add('hidden');
        const decompte = document.getElementById('countdown');
        decompte.classList.remove('hidden');


        const countdown = setInterval(async () => {
            seconde--;
            decompte.innerHTML = seconde;
            if (seconde == 0) {
                await clearInterval(countdown);
                decompte.classList.add('hidden');
                resol(true);
            }
        }, 1000);
    })
}


async function printNewScore(score, id) {
    const yourScore = document.getElementById('yourScore');
    const otherScore = document.getElementById('otherScore');
    const user = auth.currentUser;
    if (id == user.uid) {
        yourScore.innerHTML = score;
    } else {
        otherScore.innerHTML = score;
    }
}


async function printUsers(discipline, gameId) {
    console.log("printUsers");
    const users = await getInfoUsers(discipline, gameId);
    console.log(users);
    const yourName = document.getElementById('yourName');
    const yourPhoto = document.getElementById('yourPhoto');
    const yourScore = document.getElementById('yourScore');

    const otherName = document.getElementById('otherName');
    const otherPhoto = document.getElementById('otherPhoto');
    const otherScore = document.getElementById('otherScore');

    const user = auth.currentUser;
    if (users[0].id == user.uid) {
        yourName.innerHTML = users[0].name;
        yourPhoto.src = users[0].photo;
        yourScore.innerHTML = users[0].score;

        otherName.innerHTML = users[1].name;
        otherPhoto.src = users[1].photo;
        otherScore.innerHTML = users[1].score;

    } else {
        yourName.innerHTML = users[1].name;
        yourPhoto.src = users[1].photo;
        yourScore.innerHTML = users[1].score;

        otherName.innerHTML = users[0].name;
        otherPhoto.src = users[0].photo;
        otherScore.innerHTML = users[0].score;
    }
}
    

function clickOnResponse() {
    const response = document.getElementById('response');
    response.addEventListener('click', async () => {
        await updateScore(window.location.pathname.split('/')[1], window.location.pathname.split('/')[2], 1);
    })
}

function clickOnLeaveGame(){
    const cancelGame = document.getElementById('cancelButton');
    cancelGame.addEventListener('click', async () => {
        const discipline = window.location.pathname.split('/')[1];
        const gameId = window.location.pathname.split('/')[2];
        await leaveQueue(discipline, gameId);
        window.location.href = "/ligue";
    })
}





stateGame(window.location.pathname.split('/')[1], window.location.pathname.split('/')[2]);
clickOnLeaveGame();
clickOnResponse();

