import { createContext, useContext, useEffect, useState } from "react";
import firebaseConfigClient from "../services/firebase.config.js";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
const AuthContext = createContext(undefined);

const { auth, db } = firebaseConfigClient();

export const useAuth = () => {
    return useContext(AuthContext);
}

/* TODO: A REFAIRE */
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            console.log(isLoading);

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
                setCurrentUser(null);
                console.log("Utilisateur non connecté");
            }
        })

        return unsubscribe;
    }, [isLoading]);

    function disconnectUser(){
        if(currentUser !== null){
            signOut(auth).then(r => {
                console.log('Sign-out successful.');
                setUserData(null);
            });
        }
    }

    const value = {
        currentUser,
        userData,
        disconnectUser,
        setIsLoading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


