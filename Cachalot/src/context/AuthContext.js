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

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                //doc à chercher dans la collection users
                const userDocRef = doc(db, "users", user.uid);
                //Recuperation des informations du document users de l'utilisateur connecté
                getDoc(userDocRef).then((docSnap) => {
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            } else {
                setCurrentUser(null);
                console.log("Utilisateur non connecté");
            }

            setCurrentUser(user);
            //console.log(currentUser);
            //console.log(userData);
        })

        return unsubscribe;
    }, []);

    function disconnectUser(){
        if(currentUser !== null){
            signOut(auth).then(r => {
                console.log('Sign-out successful.');
            });
        }
    }

    const value = {
        currentUser,
        userData,
        disconnectUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


