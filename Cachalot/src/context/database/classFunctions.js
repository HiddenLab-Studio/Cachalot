import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, updateDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { mathFunctions } from "../../pages/exercise/functions/MathExerciseGenerator.js";

import firebaseConfigClient from "../../services/firebase.config.js";
const { auth, db, storage } = firebaseConfigClient();


export const classes = {

    /** GESTION DE CREATION ET ACCES AUX CLASSES */
    createClass: async (className) => {
        let result = {
            classCode: undefined,
            maxClassReached: undefined
        };

        const user = auth.currentUser;
        // Generate a random code
        const classeCode = await classes.createCode();
        // Check if user can create a class
        const canCreateClass = await classes.maxClasseAdmin();

        const docRef = doc(db, "classes", classeCode);
        const userDocRef = doc(db, 'users', user.uid);
        const userRef = doc(db, "users", user.uid, "classesAdmin", classeCode);

        await getDoc(docRef).then(async (doc) => {
            if (canCreateClass === true) {
                if (!doc.exists()) {
                    await getDoc(userDocRef).then(async (doc) => {
                        //console.log(doc.data());
                        const data = {
                            name: className,
                            adminUid: user.uid,
                            adminUsername: doc.data().username,
                            dateCreation: new Date(),
                        }

                        await setDoc(docRef, {
                            name: data.name,
                            admin: {
                                uid: data.adminUid,
                                username: data.adminUsername,
                            },
                            dateCreation: data.dateCreation,
                        }).then(async () => {
                            await setDoc(userRef, {
                                name: data.name,
                                dateCreation: data.dateCreation,
                            }).then(() => {
                                result.classCode = classeCode;
                            })
                        })
                    })
                } else {
                    console.log("Code déjà existante");
                    await classes.createClass(name);
                }
            } else {
                console.info("Vous avez atteint le nombre maximum de classe");
                result.maxClassReached = true;
            }
        })

        return result;
    },

    joinClass: async (code) => {
        let result = {
            isAdmin: false,
            isJoined: false,
            isAlreadyJoined: false
        };

        if (code.length !== 5) return result;

        const user = auth.currentUser;
        const docRef = doc(db, "classes", code);
        const userRefClasses = doc(db, "users", user.uid, "classesJoined", code);
        const userClassesRef = doc(db, "classes", code, "users", user.uid);
        const userRef = doc(db, "users", user.uid);

        await getDoc(docRef).then(async (doc) => {
            if (doc.exists()) {
                if (doc.data().admin.uid === user.uid) {
                    console.info("Vous êtes l'admin de la classe : " + code);
                    result.isAdmin = true;
                } else {
                    await getDoc(userRefClasses).then(async (classes) => {
                        if (classes.exists()) {
                            console.info("Vous êtes déjà dans la classe : " + code);
                            result.isAlreadyJoined = true;
                        } else {
                            await setDoc(userRefClasses, {
                                name: doc.data().name,
                                dateJoin: new Date(),
                            }).then(async () => {
                                await getDoc(userRef)
                                    .then(async (doc) => {
                                        if (doc.exists()) {
                                            const date = new Date();
                                            const dateJoin = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                                            await setDoc(userClassesRef, {
                                                username: doc.data().username,
                                                dateJoin: dateJoin,
                                                exercises: {
                                                    exoDone: 0,
                                                    exoStarted: 0,
                                                },
                                            }).then(() => {
                                                result.isJoined = true;
                                            });
                                        }
                                    })
                            })
                        }
                    });
                }
            } else {
                console.info("Aucune classe ne correspond à ce code");
                return result;
            }
        })
        return result;
    },

    maxClasseAdmin: async () => {
        let result = false;
        const user = auth.currentUser;
        const docRef = collection(db, "users/" + user.uid + "/classesAdmin");
        await getDocs(docRef).then((querySnapshot) => {
            if (querySnapshot.size < 5) {
                result = true;
            }
            else {
                result = false;
            }
        })
        return result;
    },

    createCode: async () => {
        const classeCode = Math.random().toString(36).substring(2, 7).toUpperCase();
        const docRef = doc(db, "classes", classeCode);
        await getDoc(docRef).then(async (doc) => {
            if (doc.exists()) {
                console.log("Code déjà existante");
                await classes.createCode();
            }
        })
        return classeCode;
    },


    /** GESTION DES UTILISATEURS */

    //Get les infos de la classe et des éléves
    getClassInfo: async (room) => {
        const user = auth.currentUser;
        let userInClass = false;
        //On get les bonnes collections et documents
        const docRef = doc(db, "classes", room);
        const docRefUsers = collection(db, "classes/" + room + "/users");

        //On prend les infos de la classe
        const docSnap = await getDoc(docRef);
        const dataClasse = docSnap.data();


        const docRefAdmin = doc(db, "users", dataClasse.admin.uid);
        const docSnapAdmin = await getDoc(docRefAdmin);
        const dataAdmin = {
            displayName: docSnapAdmin.data().displayName,
            photo: docSnapAdmin.data().photo,
            ...dataClasse.admin
        }
        if (dataClasse.admin.uid === user.uid) {
            userInClass = true;
        }

        //On prend les infos des éléves
        const docSnapUsers = await getDocs(docRefUsers);
        const dataUsers = await Promise.all(
            docSnapUsers.docs.map(async (docUser) => {
                if (docUser.id === user.uid) {
                    userInClass = true;
                }
                const docRefDataUser = doc(db, "users", docUser.id);
                const docSnapDataUser = await getDoc(docRefDataUser);
                const dataUser = {
                    id: docUser.id,
                    displayName: docSnapDataUser.data().displayName,
                    photo: docSnapDataUser.data().photo,
                    ...docUser.data(),
                }
                return dataUser;
            })
        );

        return { dataUsers, dataAdmin, userInClass };
    },

    getUserInfo: async (uid, classId) => {
        const docRef = doc(db, "users", uid);
        const docRefClass = doc(db, "classes", classId, "users", uid);
        const docClass = doc(db, "classes", classId);

        const docAdminSnap = await getDoc(docClass);
        const docSnap = await getDoc(docRef);
        if (docAdminSnap.data().admin.uid === uid) {
            const newDate = docAdminSnap.data().dateCreation.toDate();
            const dataUser = {
                displayName: docSnap.data().displayName,
                photo: docSnap.data().photo,
                date: newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear(),
                username: docAdminSnap.data().admin.username
            }
            return dataUser;
        }
        else {
            const docSnapClass = await getDoc(docRefClass);
            const dataUser = {
                displayName: docSnap.data().displayName,
                photo: docSnap.data().photo,
                ...docSnapClass.data()
            }
            return dataUser;
        }

    },

    myAdmin: async (adminId) => {
        const user = auth.currentUser;
        if (adminId === user.uid) {
            return true;
        }
        else {
            return false;
        }
    },

    myAdminWithClassId: async (classId) => {
        const user = auth.currentUser;
        const docRef = doc(db, "classes", classId);
        const docSnap = await getDoc(docRef);
        if (docSnap.data().admin.uid === user.uid) {
            return true;
        }
        else {
            return false;
        }
    },

    //exclure un eleve 
    deleteUser: async (classId, userId) => {
        console.log(classId, userId);
        const docRef = doc(db, "classes", classId, "users", userId);
        await deleteDoc(docRef);
        const docRefUser = doc(db, "users", userId, "classesJoined", classId);
        await deleteDoc(docRefUser);
    },

    //Charger le nom de la classe
    getClassName: async (classId) => {
        const docRef = doc(db, "classes", classId);
        const docSnap = await getDoc(docRef);
        return docSnap.data().name;
    },

    //Change le nom de la classe A RETRAVAILLER
    updateClassName: async (classId, newName) => {
        const docRef = doc(db, "classes", classId);
        await updateDoc(docRef, {
            name: newName
        });
    },


    //CREATION D'UNE PARTIE
    createGame: async (classId, nbrPlayers, nbrManches, level, discipline) => {
        let result = false;
        const docRefGames = collection(db, "classes", classId, "games");
        const docRefGamesData = await getDocs(docRefGames);

        const docRefNewGame = doc(db, "classes/" + classId + "/games", "game" + (docRefGamesData.docs.length + 1));

        if (docRefGamesData.docs.length < 5) {
            await setDoc(docRefNewGame, {
                nbrPlayers: nbrPlayers,
                nbrManches: nbrManches,
                level: level,
                discipline: discipline,
                state: "waiting",
                dateCreation: new Date(),
            }).then(() => {
                result = true;
            })
        }
        return result;

    },

    getAllGames: (classId, callback) => {
        const docRefGames = collection(db, "classes", classId, "games");

        const unsubscribe = onSnapshot(docRefGames, (docSnapshot) => {

            docSnapshot.docChanges().forEach(async (change) => {
                const docRefGameUsers = collection(db, "classes", classId, "games", change.doc.id, "users");
                const docRefGameUsersData = await getDocs(docRefGameUsers);
                if (change.type === "added") {
                    const data = {
                        id: change.doc.id,
                        nbrPlayersInGame: docRefGameUsersData.docs.length,
                        ...change.doc.data(),
                    }

                    callback(data);

                }
            })
        })

        return unsubscribe;

    },

    joinGame: async (classId, gameId) => {
        let result = false;
        const user = auth.currentUser;
        const docRefUser = doc(db, "users", user.uid);
        const UserData = await getDoc(docRefUser);

        const docRefGame = doc(db, "classes", classId, "games", gameId);
        const docRefGameData = await getDoc(docRefGame);

        const discipline = docRefGameData.data().discipline;

        if (docRefGameData.data().state === "waiting") {

            const docRefGameUsers = collection(db, "classes", classId, "games", gameId, "users");
            const docRefGameUsersData = await getDocs(docRefGameUsers);

            if (docRefGameUsersData.docs.length < docRefGameData.data().nbrPlayers) {

                const docRefGameUser = doc(db, "classes", classId, "games", gameId, "users", user.uid);
                const docRefGameUserData = await getDoc(docRefGameUser);

                if (!docRefGameUserData.exists()) {
                    if (docRefGameUsersData.docs.length + 1 === docRefGameData.data().nbrPlayers) {
                        
                            await setDoc(docRefGameUser, {
                                displayName: UserData.data().displayName,
                                photo: UserData.data().photo,
                                score: 0,
                                ready: false,
                            }).then(async () => {
                                updateDoc(docRefGame, {
                                state: "starting",
                            }).then(() => {
                                result = true;
                            })
                        })

                    } else {
                        await setDoc(docRefGameUser, {
                            displayName: UserData.data().displayName,
                            photo: UserData.data().photo,
                            score: 0,
                            ready: false,
                        }).then(() => {
                            result = true;
                        })
                    }
                }

            }
        }
        return { result, discipline };
    },



    //On récupère les infos de la partie et on les envoies à la page
    onStateGame: (discipline, gameId, classId, callback) => {
        console.log(discipline, gameId, classId);
        const docRef = doc(db, "classes/" + classId + "/games/" + gameId);
        const unsubscribe = onSnapshot(docRef, async (docSnapshot) => {
            if (docSnapshot.exists()) {
                let state = docSnapshot.data().state;
                if (state === "waiting") {
                    callback("waiting");
                }
                if (state === "starting") {
                    if (docSnapshot.data().exercices == undefined) {
                        const exercices = await mathFunctions.getExercises(docSnapshot.data().nbrManches, discipline, docSnapshot.data().level);
                        await updateDoc(docRef, {
                            exercices: exercices
                        })
                    }
                   
                    callback("starting", docSnapshot.data().nbrManches);
                }
 
                if (state === "playing") {
                    callback("playing", docSnapshot.data().nbrManches);
                }
                if (state === "finished") {
                    callback("finished",docSnapshot.data().nbrManches);
                }
            }
        });
        return unsubscribe;
    },

    onStatePlayer: async (discipline, classId, gameId, callback) => {
        const docRef = collection(db, "classes", classId, "games", gameId, "users");
        const docGame = doc(db, "classes", classId, "games", gameId);

        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
            docSnapshot.docChanges().forEach(async (change) => {

                if (change.type === "modified") {
                    const docGameData = await getDoc(docGame);

                    if (docGameData.data().state === "starting") {
                        if (change.doc.data().ready == true) {
                            const exercise = await classes.getExercise(classId, gameId, 0);
                                await updateDoc(change.doc.ref, {
                                exercise: exercise,
                            })
                            const readyData = docSnapshot.docs.map(doc => doc.data().ready);
                            if (readyData.every(ready => ready == true)) {
                                await updateDoc(docGame, {
                                    state: "playing",
                                })
                            } else {
                                callback(change.doc.id, change.doc.data().ready, docGameData.data().state, change.doc.data().exercise);
                            }
                        }
                        else {

                            callback(change.doc.id, change.doc.data().ready, docGameData.data().state);
                        }

                    } else if (docGameData.data().state === "playing") {
                        if (change.doc.data().score >= docGameData.data().nbrManches) {
                            console.log("FINISHED");
                            const docGame = doc(db, "classes", classId, "games", gameId);
                            await updateDoc(docGame, {
                                state: "finished"
                            })

                        }
                        else {
                            const user = auth.currentUser;
                            await callback(change.doc.id, change.doc.data().score,docGameData.data().state, change.doc.data().exercise, change.doc.id === user.uid);
                        }
                    }
                }
            });
        });
        return unsubscribe;

    },

    leaveGame: async (classId, gameId) => {
        let result = false;
        const user = auth.currentUser;

        const docGame = doc(db, "classes", classId, "games", gameId)
        const docGameData = await getDoc(docGame);

        const docPlayer = doc(db, "classes", classId, "games", gameId, "users", user.uid);
        const docPlayerData = await getDoc(docPlayer);
        console.log(docGameData.data().state);

        if (docPlayerData.exists()) {
            await deleteDoc(docPlayer);
            if (docGameData.data().state == "waiting") {
                console.log("waiting");
                await deleteDoc(docPlayer);
                result = true;
            }
            if (docGameData.data().state == "starting") {
                await deleteDoc(docPlayer);
                await updateDoc(docGame, {
                    state: "waiting"
                }).then(() => {
                    result = true;
                })
            }
            if (docGameData.data().state == "finished") {
                await deleteDoc(docPlayer);
                const docRef = collection(db, "classes", classId, "games", gameId, "users");
                const docSnapshot = await getDocs(docRef);
                if (docSnapshot.docs.length == 0) {
                    await deleteDoc(docGame);
                }
                result = true;
            }
        }
        return result;

    },

    getAllUsersInGame: async (classId, gameId) => {
        const userId = auth.currentUser.uid;
        let userWatching = false;
        let myUserInfo = {};

        const docRef = collection(db, "classes", classId, "games", gameId, "users");
        const docSnapshot = await getDocs(docRef);
        const usersInfo = docSnapshot.docs.map(doc => {
            if (doc.id == userId) {
                myUserInfo = { id: doc.id, ...doc.data() }
                return
            } else {
                return { id: doc.id, ...doc.data() }
            }
        });
        // Vérifier si le user est bien dans la partie
        // Pour tous les users, vérifier si le user est dans la partie
        if (usersInfo.find(user => user && user.id == userId) || myUserInfo.id == userId) {
            userWatching = false;
        } else {
            userWatching = true;
        }

        return { usersInfo, myUserInfo, userWatching };
    },

    setPlayerReady : async (classId, gameId, userId, NewUserState) => {
        let result = false;
        console.log(classId, gameId, userId, NewUserState);
        const docRef = doc(db, "classes", classId, "games", gameId, "users", userId);
        await updateDoc(docRef, {
            ready: NewUserState,
        }).then(() => {
            result = true;
        })
        return result;
    },

    getExercise: async (classId, gameId, score) => {
        const docGame = doc(db, "classes", classId, "games", gameId);
        const docGameData = await getDoc(docGame);
        const exercise = docGameData.data().exercices[score];
        return exercise;
    },

    checkResponse: async (exercice, value) => {
        console.log(exercice, value);
        let result = false;
        const solution = await mathFunctions.getSolution(exercice, value);
        console.log(solution);
        if (solution) {
            result = true;
        }
        return result;

    },

    sendResponse: async (classId, gameId, exercise, response, score) => {
        let result = false;

        const responseCheck = await classes.checkResponse(exercise, response);
        if (responseCheck) {
            const user = auth.currentUser;
            const docPlayer = doc(db, "classes", classId, "games", gameId, "users", user.uid);
            const docPlayerData = await getDoc(docPlayer);
            if (docPlayerData.exists()) {
                const exercise = await classes.getExercise(classId, gameId, (docPlayerData.data().score + score));
                if (exercise == undefined) {
                    await updateDoc(docPlayer, {
                        score: docPlayerData.data().score + score,
                    }).then(() => {
                        result = true;
                    })
                } else {
                    await updateDoc(docPlayer, {
                        score: docPlayerData.data().score + score,
                        exercise: exercise,
                    }).then(() => {
                        result = true;
                    })
                }
            }
        } else {
            result = false;
        }
        return result;
    },

    //getClassement
    getClassement: async (classId, gameId) => {
        const docRef = collection(db, "classes", classId, "games", gameId, "users");
        const classementUsers = query(docRef, orderBy("score", "desc"));
        const docSnapshot = await getDocs(classementUsers);
        const classement = docSnapshot.docs.map(doc => {
            const data = {
                id: doc.id,
               ...doc.data()
            }
            return data;
        });
        return classement;
    }






}
