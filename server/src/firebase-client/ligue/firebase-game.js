import { collection, doc, addDoc, getDocs, getDoc, updateDoc, onSnapshot, query, orderBy, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../../composable/firebaseConfigClient.js";

const { auth, db } = firebaseConfigClient();


//FONCTION IMPORTANTES

//Regarde le statement de la partie 
function onStateGame(discipline, gameId) {
    const docRef = doc(db, "ligue", discipline, "games", gameId);
    onSnapshot(docRef, async (docSnapshot) => {
        if (docSnapshot.exists()) {
            let state = docSnapshot.data().state;
            if (state === "waiting") {
                //Affichage HTML
                printWaiting();
                await clickeOnLeaveGameByQueue(discipline, gameId);
            }
            if (state === "starting") {
                //Affichage HTML
                //Recupere les infos des joueurs et verifie si le user est bien dans la partie
                const usersInfo = await getUsersInfo(discipline, gameId);
                printUser(usersInfo);

                removeWaiting();
                printStarting();

                clickeOnPlayerReady(discipline, gameId);
                await onStatePlayer(discipline, gameId);
            }

            if (state === "playing") {
                //Affichage HTML
                //Recupere les infos des joueurs et verifie si le user est bien dans la partie
                console.log("arrive playing");
                const usersInfo = await getUsersInfo(discipline, gameId);
                printUserPlaying(usersInfo);

                removeStarting();
                printPlaying();

                await clickOnButtonResponse(discipline, gameId, 1);
                await onStatePlayer(discipline, gameId);

            }
            if (state === "finished") {
                //Affichage HTML
                const usersInfo = await getUsersInfo(discipline, gameId);
                //const winnerInfo = await getUserWinner(userInfo);
                printFinalScore(usersInfo);

                removePlaying();
                printFinished();
                clickOnButtonLeaveGame(discipline, gameId);


                

            }
        }
    });
}


//GLOBAL
async function getUsersInfo(discipline, gameId) {
    const userId = auth.currentUser.uid;

    const docRef = collection(db, "ligue", discipline, "games", gameId, "players");
    const docSnapshot = await getDocs(docRef);
    const usersInfo = docSnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
    });
    //Verifier si le user est bien dans la partie
    if (usersInfo[0].id != userId && usersInfo[1].id != userId) {
        window.location.href = "/ligue";
    }

    return usersInfo;
}

//Regarde le statement des joueurs 
async function onStatePlayer(discipline, gameId) {
    const docRef = collection(db, "ligue", discipline, "games", gameId, "players");
    const docGame = doc(db, "ligue", discipline, "games", gameId);
    const docGameData = await getDoc(docGame);
    console.log(docGameData.data().state);

    onSnapshot(docRef, (docSnapshot) => {
        docSnapshot.docChanges().forEach(async (change) => {
            if (change.type === "modified") {
                if (docGameData.data().state === "starting") {
                    if (change.doc.data().ready == true) {
                        printUserReady(change.doc.id);
                        const readyData = docSnapshot.docs.map(doc => doc.data().ready);
                        if (readyData.every(ready => ready == true)) {
                            console.log("Tout le monde est prêt");

                            await updateDoc(docGame, {
                                state: "playing"
                            })
                        }
                    }
                    else {
                        printUserNotReady(change.doc.id);
                    }
                }else if (docGameData.data().state === "playing") {
                    if (change.doc.data().score == 10) {
                        const docGame = doc(db, "ligue", discipline, "games", gameId);
                        await updateDoc(docGame, {
                            state: "finished"
                        })
    
                    }
                    else {
                        await printUserScore(change.doc.id, change.doc.data().score);
                    }
                }
            }
        });
    });

}

//WAINTING 
async function leaveGame(discipline, gameId) {
    const user = auth.currentUser;

    const docGame = doc(db, "ligue", discipline, "games", gameId)
    const docGameData = await getDoc(docGame);

    const docPlayer = doc(db, "ligue", discipline, "games", gameId, "players", user.uid);
    const docPlayerData = await getDoc(docPlayer);

    if (docPlayerData.exists()) {
        await deleteDoc(docPlayer);
        if (docGameData.data().state == "waiting") {
            await deleteDoc(docGame);
        }
        else if(docGameData.data().state == "finished"){
            await deleteDoc(docPlayer);
            const docRef = collection(db, "ligue", discipline, "games", gameId, "players");
            const docSnapshot = await getDocs(docRef);
            if (docSnapshot.docs.length == 0) {
                await deleteDoc(docGame);
            }
        }
    }

}

//STARTING
async function playerReady(discipline, gameId) {
    let result = false;
    const user = auth.currentUser;
    const docPlayer = doc(db, "ligue", discipline, "games", gameId, "players", user.uid);
    const docPlayerData = await getDoc(docPlayer);
    if (docPlayerData.exists()) {
        if (docPlayerData.data().ready == false) {
            await updateDoc(docPlayer, {
                ready: true
            })
            result = true;
        }
        if (docPlayerData.data().ready == true) {
            await updateDoc(docPlayer, {
                ready: false
            })
            result = false;
        }
    }
    return result;
}

//PLAYING

async function addScore(discipline, gameId, score) {
    const user = auth.currentUser;
    const docPlayer = doc(db, "ligue", discipline, "games", gameId, "players", user.uid);
    const docPlayerData = await getDoc(docPlayer);
    if (docPlayerData.exists()) {
        await updateDoc(docPlayer, {
            score: docPlayerData.data().score + score
        })
    }
}

//FINISHED
async function getUserWinner(usersInfo) {
    if (usersInfo[0].score > usersInfo[1].score) {
        return usersInfo[0];
    }
    else {
        return usersInfo[1];
    }
}
        

/*** FONCTION HTML */
/** WOOOOOOOOOOOOOW */


/*WAITING*/
function printWaiting() {
    const waiting = document.getElementById("waitingGame");
    waiting.classList.remove("hidden");
}

function removeWaiting() {
    const waiting = document.getElementById("waitingGame");
    waiting.classList.add("hidden");
}

async function clickeOnLeaveGameByQueue(discipline, gameId) {
    const leaveGameByQueue = document.getElementById("leaveGameByQueue");
    leaveGameByQueue.addEventListener("click", async () => {
        await leaveGame(discipline, gameId);
        window.location.href = "/ligue";
    });
}


/*STARTING*/


function printStarting() {
    const starting = document.getElementById("startingGame");
    starting.classList.remove("hidden");
}

function removeStarting() {
    const starting = document.getElementById("startingGame");
    starting.classList.add("hidden");
}

function printUser(usersInfo) {
    console.log(usersInfo);
    const yourPhotoStarting = document.getElementById("yourPhotoStarting");
    const yourNameStarting = document.getElementById("yourNameStarting");
    const otherPhotoStarting = document.getElementById("otherPhotoStarting");
    const otherNameStarting = document.getElementById("otherNameStarting");

    const user = auth.currentUser;
    if (user.uid == usersInfo[0].id) {
        yourPhotoStarting.src = usersInfo[0].photo;
        yourNameStarting.innerHTML = usersInfo[0].name;

        otherPhotoStarting.src = usersInfo[1].photo;
        otherNameStarting.innerHTML = usersInfo[1].name;
    }
    else {
        yourPhotoStarting.src = usersInfo[1].photo;
        yourNameStarting.innerHTML = usersInfo[1].name;

        otherPhotoStarting.src = usersInfo[0].photo;
        otherNameStarting.innerHTML = usersInfo[0].name;
    }
}

async function clickeOnPlayerReady(discipline, gameId) {
    const playerReadyDoc = document.getElementById("playerReady");
    playerReadyDoc.addEventListener("click", async () => {
        await playerReady(discipline, gameId);
    });
}

function printUserReady(userId) {
    const user = auth.currentUser;
    if (user.uid == userId) {
        const yourPhotoStarting = document.getElementById("yourPhotoStarting");
        yourPhotoStarting.classList.add("border-green-500")
    }
    else {
        const otherPhotoStarting = document.getElementById("otherPhotoStarting");
        otherPhotoStarting.classList.add("border-green-500")
    }
}

function printUserNotReady(userId) {
    const user = auth.currentUser;
    if (user.uid == userId) {
        const yourPhotoStarting = document.getElementById("yourPhotoStarting");
        yourPhotoStarting.classList.remove("border-green-500")
    }
    else {
        const otherPhotoStarting = document.getElementById("otherPhotoStarting");
        otherPhotoStarting.classList.remove("border-green-500")
    }
}





/*PLAYING*/
function printPlaying() {
    const game = document.getElementById("playingGame");
    game.classList.remove("hidden");
}

function removePlaying() {
    const game = document.getElementById("playingGame");
    game.classList.add("hidden");
}


function printUserPlaying(usersInfo) {
    console.log(usersInfo);
    const yourPhotoPlaying = document.getElementById("yourPhotoPlaying");
    const yourNamePlaying = document.getElementById("yourNamePlaying");
    const yourScorePlaying = document.getElementById("yourScorePlaying");

    const otherPhotoPlaying = document.getElementById("otherPhotoPlaying");
    const otherNamePlaying = document.getElementById("otherNamePlaying");
    const otherScorePlaying = document.getElementById("otherScorePlaying");

    const user = auth.currentUser;
    if (user.uid == usersInfo[0].id) {
        yourPhotoPlaying.src = usersInfo[0].photo;
        yourNamePlaying.innerHTML = usersInfo[0].name;
        yourScorePlaying.innerHTML = usersInfo[0].score;

        otherPhotoPlaying.src = usersInfo[1].photo;
        otherNamePlaying.innerHTML = usersInfo[1].name;
        otherScorePlaying.innerHTML = usersInfo[1].score;

    }
    else {
        yourPhotoPlaying.src = usersInfo[1].photo;
        yourNamePlaying.innerHTML = usersInfo[1].name;
        yourScorePlaying.innerHTML = usersInfo[1].score;

        otherPhotoPlaying.src = usersInfo[0].photo;
        otherNamePlaying.innerHTML = usersInfo[0].name;
        otherScorePlaying.innerHTML = usersInfo[0].score;
    }
}


function clickOnButtonResponse(discipline, gameId, score) {
    const buttonResponse = document.getElementById("buttonResponse");
    buttonResponse.addEventListener("click", async () => {
        const valueResponse = document.getElementById("valueResponse").value;
        const response = await checkResponse(valueResponse);
        if (response) {
            await addScore(discipline, gameId, score);
        }
        else {
            console.log("Mauvaise réponse");
        }
    });
}

async function checkResponse(responseValue) {
    let response = false;
    if (responseValue == "1") {
        response = true;
    }
    else {
        response = false;
    }
    return response;
}

async function printUserScore(userId, score) {
    const user = auth.currentUser;
    if (user.uid == userId) {
        const yourScorePlaying = document.getElementById("yourScorePlaying");
        yourScorePlaying.innerHTML = score;
    }
    else {
        const otherScorePlaying = document.getElementById("otherScorePlaying");
        otherScorePlaying.innerHTML = score;
    }
}

/*FINISHED*/

function printFinished() {
    const game = document.getElementById("finishedGame");
    game.classList.remove("hidden");
}


function printFinalScore(usersInfo) {
    console.log(usersInfo);
    const winnerPhoto = document.getElementById("winnerPhoto");
    const winnerName = document.getElementById("winnerName");
    const winnerScore = document.getElementById("winnerScore");

    const looserPhoto = document.getElementById("looserPhoto");
    const looserName = document.getElementById("looserName");
    const looserScore = document.getElementById("looserScore");

    if (usersInfo[0].score > usersInfo[1].score) {
        winnerPhoto.src = usersInfo[0].photo;
        winnerName.innerHTML = usersInfo[0].name;
        winnerScore.innerHTML = usersInfo[0].score;
        
        looserPhoto.src = usersInfo[1].photo;
        looserName.innerHTML = usersInfo[1].name;
        looserScore.innerHTML = usersInfo[1].score;
    }
    else {
        winnerPhoto.src = usersInfo[1].photo;
        winnerName.innerHTML = usersInfo[1].name;
        winnerScore.innerHTML = usersInfo[1].score;
        
        looserPhoto.src = usersInfo[0].photo;
        looserName.innerHTML = usersInfo[0].name;
        looserScore.innerHTML = usersInfo[0].score;
    }
}

function clickOnButtonLeaveGame(discipline, gameId) {
    const leaveGameByFinished = document.getElementById("leaveGameByFinished");
    leaveGameByFinished.addEventListener("click", async () => {
        await leaveGame(discipline, gameId);
        window.location.href = "/ligue";
    });
}
  








onStateGame("francais", "game1");