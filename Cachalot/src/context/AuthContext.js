import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";

// Firebase config
import firebaseConfigClient from "../services/firebase.config.js";
const { auth, db } = firebaseConfigClient();

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

    async function disconnectUser(){
        if(currentUser !== null){
            await signOut(auth).then(r => {
                console.log('Sign-out successful.');
                setUserData(null);
            });
        }
    }

    async function getUserByUsername(username){
        let result = undefined;
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => doc.data());
        const isUserExist = usersList.find(user => user.username === username);
        if(isUserExist){
            result = isUserExist;
        } else {
            console.log("Utilisateur non trouvé");
        }
        return result;
    }

    const value = {
        currentUser,
        userData,
        // Functions
        disconnectUser,
        getUserByUsername,
        // State
        setIsLoading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


