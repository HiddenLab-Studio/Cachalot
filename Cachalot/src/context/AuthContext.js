import { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";

// Firebase config
import firebaseConfigClient from "../services/firebase.config.js";

// Database functions
import { user } from "./database/userFunctions.js";
import { utils } from "./database/utilsFunctions.js";
import {classes} from "./database/classFunctions.js";
import {update} from "./database/updateFunctions.js";

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

    const value = {
        // States values
        currentUser,
        userData,
        // States functions
        setIsLoading,
        setUserData,
        setCurrentUser,

        // Objects containing all useful functions
        user,
        utils,
        classes,
        update,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


