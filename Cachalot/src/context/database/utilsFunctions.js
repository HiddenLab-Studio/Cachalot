import {collection, deleteDoc, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import firebaseConfigClient from "../../services/firebase.config.js";
const { auth, db, storage } = firebaseConfigClient();

export const utils = {
    getUsersListByUsername: async (displayName) => {
        let result = [];
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => {
            const data = doc.data()
            data.id = doc.id
            return data
        });

        usersList.forEach(user => {
            if(user.displayName !== undefined && user.username !== undefined) {
                if (user.displayName.toLowerCase() === displayName || user.username.toLowerCase() === displayName) {
                    result.push(user);
                }
            }
        });

        if (result.length === 0) {
            console.info("Aucun utilisateur trouvé");
        }

        return result;
    },

    getUserByUsername: async (username) => {
        let result = undefined;
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => {
            const data = doc.data()
            data.id = doc.id
            return data
        });
        const isUserExist = usersList.find(user => user.username === username);
        if (isUserExist) {

            const userFollowerColl = collection(db, "users/" + isUserExist.id + "/follower");
            const userFollowerDoc = await getDocs(userFollowerColl);
            const userFollower = userFollowerDoc.docs.map(doc => doc.data());

            const userFollowingColl = collection(db, "users/" + isUserExist.id + "/following");
            const userFollowingDoc = await getDocs(userFollowingColl);
            const userFollowing = userFollowingDoc.docs.map(doc => doc.data());

            result = {
                userData: isUserExist,
                userFriends: {
                    follower: userFollower,
                    following: userFollowing
                }
            };
        } else {
            console.log("Utilisateur non trouvé");
        }
        return result;
    },

    getUserFriends: async (id) => {
        const userFollowing = collection(db, "users/" + id + "/following");
        const userFollowingSnapshot = await getDocs(userFollowing);
        const userFollower = collection(db, "users/" + id + "/follower");
        const userFollowerSnapshot = await getDocs(userFollower);
        return {
            following: userFollowingSnapshot.docs.map(doc => doc.data()),
            follower: userFollowerSnapshot.docs.map(doc => doc.data())
        };
    },

    unfollowUser: async (searchedUser) => {
        console.log(searchedUser)
        let result = false;
        const user = auth.currentUser;
        const userFollower = doc(db, "users", user.uid + '/following/' + searchedUser.id);
        await deleteDoc(userFollower)
        const userFollowing = doc(db, "users", searchedUser.id + '/follower/' + user.uid);
        await deleteDoc(userFollowing).then(() => {
            result = true;
        })
        return result;
    },

    followUser: async (searchedUser) => {
        console.log(searchedUser);
        let result = false;
        const user = auth.currentUser;
        const userFollowing = doc(db, "users", user.uid + '/following/' + searchedUser.id);
        await setDoc(userFollowing, {
            displayName: searchedUser.displayName,
            username: searchedUser.username,
            photo: searchedUser.photo,
        }).then(async () => {
            const userFollower = doc(db, "users", searchedUser.id + '/follower/' + user.uid);
            const docRef = doc(db, "users", user.uid);
            await getDoc(docRef).then(async (doc) => {
                if (doc.exists()) {
                    await setDoc(userFollower, {
                        displayName: doc.data().displayName,
                        username: doc.data().username,
                        photo: doc.data().photo,
                    }).then(() => {
                        result = true;
                    })
                }
            })
        }).catch((error) => {
            console.log(error);
        });
        return result;
    }


}