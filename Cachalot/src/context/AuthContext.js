import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext(undefined);

export const useAuth = () => {
    return useContext(AuthContext);
}

/* TODO: A REFAIRE */
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setCurrentUser("Lucas");
        } else {
            setCurrentUser(null);
        }
    }, [isAuthenticated]);

    const value = {
        currentUser,
        isAuthenticated,
        setIsAuthenticated,
        object: {
            username: "Lucas",
            profilePicture: "profilePictureTest.png"
        }
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


