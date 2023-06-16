import {collection, getDocs} from "firebase/firestore";
import {signOut} from "firebase/auth";

import firebaseConfigClient from "../../services/firebase.config.js";
const { auth, db, storage } = firebaseConfigClient();


export const user = {
    logout: async (currentUser) => {
        let result = false;
        if (currentUser !== null) {
            await signOut(auth).then(r => {
                console.log('Sign-out successful.');
                result = true;
            }).catch((error) => {
                console.error(error);
            });
        }
        return result;
    },

    getUserClasses: async (currentUser) => {
        let result = [];
        if (currentUser !== null) {
            let userRef = collection(db, "users", currentUser.uid, "classesJoined");
            await getDocs(userRef).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    result.push({code: doc.id, data: doc.data()});
                });
            });

            userRef = collection(db, "users", currentUser.uid, "classesAdmin");
            await getDocs(userRef).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    result.push({code: doc.id, data: doc.data()});
                });
            });
        }
        return result;
    }



}