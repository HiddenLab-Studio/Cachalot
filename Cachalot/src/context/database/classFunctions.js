import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

import firebaseConfigClient from "../../services/firebase.config.js";
const { auth, db, storage } = firebaseConfigClient();


export const classes = {
    createClass: async (name) => {
        let result = undefined;
        const user = auth.currentUser;
        const classeCode = Math.random().toString(36).substring(2, 7).toUpperCase();
        const maxClasse = await maxClasseAdmin();

        const docRef = doc(db, "classes", classeCode);
        const userDocRef = doc(db, 'users', user.uid);
        const userRef = doc(db, "users", user.uid, "classesAdmin", classeCode);


        await getDoc(docRef).then(async (doc) => {
            if (maxClasse == true) {
                if (!doc.exists()) {
                    await getDoc(userDocRef).then(async (doc) => {
                        //console.log(doc.data());
                        const data = {
                            name: name,
                            adminUid: user.uid,
                            adminDisplayName: doc.data().displayName,
                            adminUsername: doc.data().username,
                            adminPhoto: doc.data().photo,
                            dateCreation: new Date(),
                        }
                        await setDoc(docRef, {
                            name: data.name,
                            admin: {
                                uid: data.adminUid,
                                displayName: data.adminDisplayName,
                                username: data.adminUsername,
                                photo: data.adminPhoto,
                            },
                            dateCreation: data.dateCreation,
                        }).then(async () => {
                            await setDoc(userRef, {
                                name: data.name,
                                dateCreation: data.dateCreation,
                            }).then(() => {
                                result = classeCode;
                            })
                        })
                    })
                } else {
                    console.log("Code déjà existante");
                    await classes.createClass(name);
                }
            } else {
                console.log("Vous avez atteint le nombre maximum de classe");
                return result;
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

        const user = auth.currentUser;
        const docRef = doc(db, "classes", code);
        const userRefClasses = doc(db, "users", user.uid, "classes", code);
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
                                            await setDoc(userClassesRef, {
                                                username: doc.data().username,
                                                dateJoin: new Date(),
                                                exercises: {
                                                    exoDone: 0,
                                                    exoStarted: 0,
                                                },
                                                photo: doc.data().photo,
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
    }

}

//max classe Admin 
async function maxClasseAdmin() {
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
}