import { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";

// Firebase config
import firebaseConfigClient from "../services/firebase.config.js";

const { auth, db, storage } = firebaseConfigClient();

// Context
const AuthContext = createContext(undefined);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            //console.log(isLoading);

            if (!isLoading && user) {
                const userDocRef = doc(db, "users", user.uid);
                await getDoc(userDocRef).then((docSnap) => {
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });

                setCurrentUser(user);
                setIsLoading(false);

            } else {
                setCurrentUser(-1);
                console.log("Utilisateur non connecté");
            }
        })

        return unsubscribe;
    }, [isLoading]);

    async function disconnectUser() {
        if (currentUser !== null) {
            await signOut(auth).then(r => {
                console.log('Sign-out successful.');
                setUserData(null);
            });
        }
    }
    async function getUsersListByUsername(username) {
        let result = [];
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => {
            const data = doc.data()
            data.id = doc.id
            return data
        });

        usersList.forEach(user => {
            if (user.username.toLowerCase() === username) {
                result.push(user);
            }
        });

        if (result.length === 0) {
            console.info("Aucun utilisateur trouvé");
        }

        return result;

    }
    async function getUserByUsername(username) {
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
    }
    async function getUserFriends(id) {
        const userFollowing = collection(db, "users/" + id + "/following");
        const userFollowingSnapshot = await getDocs(userFollowing);

        const userFollower = collection(db, "users/" + id + "/follower");
        const userFollowerSnapshot = await getDocs(userFollower);

        return {
            following: userFollowingSnapshot.docs.map(doc => doc.data()),
            follower: userFollowerSnapshot.docs.map(doc => doc.data())
        };
    }
    async function followUser(searchedUser) {
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
    async function unfollowUser(searchedUser) {
        let result = false;
        const user = auth.currentUser;
        const userFollower = doc(db, "users", user.uid + '/following/' + searchedUser.id);
        await deleteDoc(userFollower)
        const userFollowing = doc(db, "users", searchedUser.id + '/follower/' + user.uid);
        await deleteDoc(userFollowing).then(() => {
            result = true;
        })
        return result;
    }

    async function createClass(name) {
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
                await createClass(name);
            }
        })
        return result;
    }


    //Fonction pour upload une image
    async function uploadImage(name, image , dossier) {
        // Obtenir l'objet blob à partir de l'URL blob
        const response = await fetch(image);
        const blob = await response.blob();

        //On créé le lien dans storage
        const storageRef = ref(storage, dossier + "/" + name);
        //On upload le blob dans le lien
        await uploadBytes(storageRef, blob);

        //On récupére l'URL de l'image
        const urlImage = await getDownloadURL(storageRef);
        return urlImage;
    }

    async function updateUserData(data) {
        let result = false;
        const user = auth.currentUser;
        const userDocRef = doc(db, "users", user.uid);
        const newUserData = {};

        console.log(data);
        if (data.photo !== "") {
            const urlImage = await uploadImage(user.uid, data.photo, "users");
            newUserData.photo = urlImage;
        }
        if (data.displayName !== "") {
            newUserData.displayName = data.displayName;
        }
        if (data.age !== "") {
            newUserData.age = data.age;
        }

        updateDoc(userDocRef, newUserData).then(() => {
            result = true;
        }
        ).catch((error) => {
            console.log(error);
        });

        return result;
    }


    const value = {
        currentUser,
        userData,
        // Functions
        disconnectUser,
        getUsersListByUsername,
        getUserByUsername,
        getUserFriends,
        followUser,
        unfollowUser,
        createClass,
        updateUserData,
        // State
        setIsLoading,

    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


