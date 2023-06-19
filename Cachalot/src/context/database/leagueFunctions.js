import { collection, doc, addDoc, getDocs, getDoc, updateDoc, onSnapshot, query, orderBy, setDoc, deleteDoc } from "firebase/firestore";

import firebaseConfigClient from "../../services/firebase.config.js";
const { auth, db, storage } = firebaseConfigClient();

//FONCTION IMPORTANTES

export const league = {


    /**** TROUVER LA PARTIE  */
    /*IL MANQUE JUSTE DE CREER UN ID UNIQUE POUR LES GAMES*/
    //Rejoindre la queue
    joinGame: async (discipline) => {
        let result = false;
        const user = auth.currentUser;
        const userRef = doc(db, "users", user.uid);

        await getDoc(userRef).then(async (docUser) => {
            if (docUser.exists()) {
                const ligueRef = collection(db, "league/" + discipline + "/games");
                const ligueDoc = await getDocs(ligueRef);
                const newGame = ligueDoc.docs.map(doc => {
                    return { id: doc.id, ...doc.data() }
                });

                //Si il n'y a pas de partie en attente on en crée une game
                if (newGame.length == 0) {
                    console.log("Pas de partie en attente");
                    const codeGame = await league.createCodeGame(discipline);
                    await league.createGame(discipline, docUser.data().displayName, docUser.data().photo, user.uid, codeGame);
                    result = true;
                }
                else {
                    //Sinon on regarde s'il y a une partie en atente pour le faire rentrer dedans
                    newGame.forEach(async game => {
                        if (game.state == "waiting") {
                            const docRef = doc(db, "league", discipline, "games", game.id, "players", user.uid);
                            const docRefData = await getDoc(docRef);
                            const docGame = doc(db, "league", discipline, "games", game.id);
                            if (!docRefData.exists()) {
                                await setDoc(docRef, {
                                    name: docUser.data().displayName,
                                    photo: docUser.data().photo,
                                    score: 0,
                                    ready: false
                                })

                                await updateDoc(docGame, {
                                    state: "starting"
                                }).then(() => {
                                    //Redirection vers la partie
                                    window.location.href = "ranked/" + discipline + "/" + game.id;
                                    result = true;
                                })

                            }
                            else {
                                window.location.href = "ranked/" + discipline + "/" + game.id;
                                result = true;
                            }
                        }

                        //Si pas de partie en attendant on en crée une
                        else {
                            const codeGame = await league.createCodeGame(discipline);
                            await league.createGame(discipline, docUser.data().displayName, docUser.data().photo, user.uid, codeGame);
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
    },

    //ON SETUP UNE PARTIE
    createGame: async (discipline, displayName, photo, id, gameId) => {
        const docRef = doc(db, "league", discipline, "games", gameId, "players", id);
        const docGame = doc(db, "league", discipline, "games", gameId);
        await setDoc(docRef, {
            name: displayName,
            photo: photo,
            score: 0,
            ready: false
        })
        await setDoc(docGame, {
            state: "waiting"
        });

        window.location.href = "ranked/" + discipline + "/" + gameId;
    },

    //On crée un code pour la partie qui n'est pas déjà utilisé
    createCodeGame: async (discipline) => {
        const classeCode = Math.random().toString(36).substring(2, 7).toUpperCase();
        const doicRef = doc(db, "league", discipline, "games", classeCode);
        await getDoc(doicRef).then(async (doc) => {
            if (doc.exists()) {
                console.log("Code déjà existante");
                await classes.createCode();
            }
        })
        return classeCode;
    },


    /**** GESTION DE LA PARTIE */

    /*** GLOBAL */
    //On récupère les infos de la partie et on les envoies à la page
    onStateGame: (discipline, gameId, callback) => {
        const docRef = doc(db, "league", discipline, "games", gameId);
        const unsubscribe = onSnapshot(docRef, async (docSnapshot) => {
            console.log(docSnapshot.data());
            if (docSnapshot.exists()) {
                let state = docSnapshot.data().state;
                if (state === "waiting") {
                    callback("waiting");
                }
                if (state === "starting") {
                    callback("starting");
                }
                if (state === "playing") {
                    callback("playing");
                }
                if (state === "finished") {
                    callback("finished");
                }
            }
        });
        return unsubscribe;
    },

    //On récupère les infos des USERS prendant la partie et on les envoies à la page
    onStatePlayer: async (discipline, gameId, callback) => {
        const docRef = collection(db, "league", discipline, "games", gameId, "players");
        const docGame = doc(db, "league", discipline, "games", gameId);

        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
            docSnapshot.docChanges().forEach(async (change) => {

                if (change.type === "modified") {
                    const docGameData = await getDoc(docGame);

                    if (docGameData.data().state === "starting") {
                        if (change.doc.data().ready == true) {
                            const readyData = docSnapshot.docs.map(doc => doc.data().ready);
                            if (readyData.every(ready => ready == true)) {
                                await updateDoc(docGame, {
                                    state: "playing"
                                })
                            } else {
                                const user = auth.currentUser;
                                callback(change.doc.id === user.uid, change.doc.data().ready, docGameData.data().state);
                            }
                        }
                        else {
                            const user = auth.currentUser;
                            callback(change.doc.id === user.uid, change.doc.data().ready, docGameData.data().state);
                        }

                    } else if (docGameData.data().state === "playing") {
                        if (change.doc.data().score >= 10) {
                            const docGame = doc(db, "league", discipline, "games", gameId);
                            await updateDoc(docGame, {
                                state: "finished"
                            })

                        }
                        else {
                            const user = auth.currentUser;
                            await callback(change.doc.id === user.uid, change.doc.data().score, docGameData.data().state);
                        }
                    }
                }
            });
        });
        return unsubscribe;

    },

    //Get les infos des users
    getUsersInfo: async (discipline, gameId) => {
        const userId = auth.currentUser.uid;

        const docRef = collection(db, "league", discipline, "games", gameId, "players");
        const docSnapshot = await getDocs(docRef);
        const usersInfo = docSnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        });
        //Verifier si le user est bien dans la partie
        if (usersInfo[0].id != userId && usersInfo[1].id != userId) {
            window.location.href = "/ranked";
        }

        return usersInfo;
    },

    //On regarde quel user est le mien et lequel est l'autre
    infoSort: async (usersInfo) => {
        console.log(usersInfo);
        const userId = auth.currentUser.uid;
        let myInfo = {};
        let otherInfo = {};
        if (usersInfo[0].id == userId) {
            myInfo = usersInfo[0];
            otherInfo = usersInfo[1];
        }
        else {
            myInfo = usersInfo[1];
            otherInfo = usersInfo[0];
        }

        return { myInfo, otherInfo };
    },

    //Quitter la partie en cours
    leaveGame: async (discipline, gameId) => {
        const user = auth.currentUser;

        const docGame = doc(db, "league", discipline, "games", gameId)
        const docGameData = await getDoc(docGame);

        const docPlayer = doc(db, "league", discipline, "games", gameId, "players", user.uid);
        const docPlayerData = await getDoc(docPlayer);

        if (docPlayerData.exists()) {
            await deleteDoc(docPlayer);
            if (docGameData.data().state == "waiting") {
                await deleteDoc(docGame);
            }
            else if (docGameData.data().state == "finished") {
                await deleteDoc(docPlayer);
                const docRef = collection(db, "league", discipline, "games", gameId, "players");
                const docSnapshot = await getDocs(docRef);
                if (docSnapshot.docs.length == 0) {
                    await deleteDoc(docGame);
                }
            }
        }

    },

    //STARTING
    playerReady: async (discipline, gameId) => {
        let result = false;
        const user = auth.currentUser;
        const docPlayer = doc(db, "league", discipline, "games", gameId, "players", user.uid);
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
    },

    //PLAYING
    //On regarde si la réponse est bonne ( A MODIFIER)
    checkResponse: async (responseValue) => {
        let response = false;
        if (responseValue == "1") {
            response = true;
        }
        else {
            response = false;
        }
        return response;

    },

    sendResponse: async (discipline, gameId, response, score) => {
        let result = false;
        const responseCheck = await league.checkResponse(response);
        if (responseCheck) {
            const user = auth.currentUser;
            const docPlayer = doc(db, "league", discipline, "games", gameId, "players", user.uid);
            const docPlayerData = await getDoc(docPlayer);
            if (docPlayerData.exists()) {
                await updateDoc(docPlayer, {
                    score: docPlayerData.data().score + score
                }).then(() => {
                    result = true;
                })
            }
        } else {
            result = false;
        }
        return result;
    },


    //FINISHED
    getWinner: async (usersInfo) => {
        if (usersInfo[0].score > usersInfo[1].score) {
            return { winner: usersInfo[0], looser: usersInfo[1] };
        }
        else {
            return { winner: usersInfo[1], looser: usersInfo[0] };
        }

    }

}
