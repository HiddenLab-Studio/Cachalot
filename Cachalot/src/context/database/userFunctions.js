import {collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import {signOut} from "firebase/auth";

import firebaseConfigClient from "../../services/firebase.config.js";
import axios from "axios";
import questCacheManager from "../manager/cache/questCacheManager.js";
import friendsCacheManager from "../manager/cache/FriendsCacheManager.js";
import xpCacheManager from "../manager/cache/xpCacheManager.js";
const { auth, db, storage } = firebaseConfigClient();

export const user = {
    logout: async (currentUser) => {
        let result = false;
        if (currentUser !== null) {
            await signOut(auth).then(r => {
                console.log('Sign-out successful.');
                questCacheManager.clearCache();
                friendsCacheManager.clearCache();
                xpCacheManager.clearCache();
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
    },

    likeExercise: async (currentUser, exerciseId) => {
        let result = false;
        console.log(exerciseId)
        if (currentUser !== null) {
            const userRef = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(userRef);
            const userExercise = userDoc.data().userExercise;
            const userLikes = userExercise.exerciseLikedList;
            // add the exerciseId to the field userExercise.exerciseLikedList inside userExercise object
            await updateDoc(userRef, {
                userExercise : {
                    ...userExercise,
                    exerciseLikedList : [...userLikes, exerciseId]
                }
            }).then(() => {
                // update exerciseData.like in the database
                const exerciseRef = doc(db, "exercises", exerciseId);
                getDoc(exerciseRef).then((doc) => {
                    updateDoc(exerciseRef, {
                        like: doc.data().like + 1
                    });
                });
                result = true;
            });
        }
        return result;
    },

    unlikeExercise: async (currentUser, exerciseId) => {
        let result = false;
        if (currentUser !== null) {
            const userRef = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(userRef);
            const userExercise = userDoc.data().userExercise;
            const userLikes = userExercise.exerciseLikedList;
            // remove the exerciseId to the field userExercise.exerciseLikedList inside userExercise object
            await updateDoc(userRef, {
                userExercise : {
                    ...userExercise,
                    exerciseLikedList : userLikes.filter((id) => id !== exerciseId)
                }
            }).then(() => {
                // update exerciseData.like in the database
                const exerciseRef = doc(db, "exercises", exerciseId);
                getDoc(exerciseRef).then((doc) => {
                    updateDoc(exerciseRef, {
                        like: doc.data().like - 1
                    });
                });
                result = true;
            });
        }
        return result;
    },

    addExerciseDone: async (currentUser, exerciseId) => {
        let result = false;
        if (currentUser !== null) {
            const userRef = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(userRef);
            const userExercise = userDoc.data().userExercise;
            const userDone = userExercise.exerciseDoneList;
            // add the exerciseId to the field userExercise.exerciseDoneList inside userExercise object
            await updateDoc(userRef, {
                userExercise : {
                    ...userExercise,
                    exerciseDoneList: [...userDone, exerciseId],
                    totalExerciseDone: userExercise.totalExerciseDone + 1
                }
            }).then(() => {
                result = true;
            });
        }
        return result;
    },

    addTrainingDone: async (currentUser) => {
        let result = false;
        if (currentUser !== null) {
            const userRef = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(userRef);
            const userExercise = userDoc.data().userExercise;
            // add the exerciseId to the field userExercise.exerciseDoneList inside userExercise object
            await updateDoc(userRef, {
                userExercise : {
                    ...userExercise,
                    totalTrainingDone: userExercise.totalTrainingDone + 1
                }
            }).then(() => {
                result = true;
            });
        }
        return result;
    }

}