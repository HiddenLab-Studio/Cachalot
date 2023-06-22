import { collection, doc, getDoc, getDocs, setDoc,deleteDoc } from "firebase/firestore";

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
        if(dataClasse.admin.uid === user.uid){
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
                date : newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear(),
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
    }
