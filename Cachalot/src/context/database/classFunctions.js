import {collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";

import firebaseConfigClient from "../../services/firebase.config.js";
const { auth, db, storage } = firebaseConfigClient();


export const classes = {
    createClass: async (name) => {
        let result = false;
        const user = auth.currentUser;
        const classeCode = Math.random().toString(36).substring(2, 7).toUpperCase();

        const docRef = doc(db, "classes", classeCode);
        const userDocRef = doc(db, 'users', user.uid);
        const userRef = doc(db, "users", user.uid, "classesAdmin", classeCode);

        await getDoc(docRef).then(async (doc) => {
            if (!doc.exists()) {
                await getDoc(userDocRef).then(async (doc) => {
                    const data = {
                        name: name,
                        adminUsername: doc.data().username,
                        adminPhoto: doc.data().photo,
                        dateCreation: new Date(),
                    }
                    await setDoc(docRef, {
                        name: data.name,
                        admin: {
                            username: data.adminUsername,
                            photo: data.adminPhoto,
                        },
                        dateCreation: data.dateCreation,

                    }).then(async () => {
                        await setDoc(userRef, {
                            name: data.name,
                            dateCreation: data.dateCreation,
                        }).then(() => {
                            result = true;
                        })
                    })
                })
            } else {
                console.log("Code déjà existante");
                // on relance la fonction
                await classes.createClass(name);
            }
        })
        return result;
    }

}