import React, { useEffect, useState } from "react";

// Context
import { useAuth } from "../../context/AuthContext.js";

// Components
import ConnectionHomePage from "../connection/ConnectionHomePage.jsx";
import Profile from "./components/Profile.jsx";
import Loading from "../../components/utils/loading/Loading.jsx";
import loadXpCache from "../../utils/onLoading.js";

const ProfileHomePage = (props) => {
    // State
    const [isLoading, setIsLoading] = useState(true);

    // Context from AuthContext useful for getting user data
    const auth = useAuth();

    // Executed every time the component is rendered or when the state of userData changes
    useEffect(() => {
        if(auth.currentUser instanceof Object || typeof auth.currentUser === "number") {
            if(auth.currentUser instanceof Object) {
                loadXpCache(auth.currentUser, setIsLoading)
            } else {
                setIsLoading(false)
            }
        }
    }, [auth.currentUser, window.location.pathname])

    if(isLoading) {
        return <Loading />
    } else if(auth.currentUser instanceof Object || props.isSearching) {
        return <Profile auth={auth} />
    } else if(typeof auth.currentUser === "number") {
        return <ConnectionHomePage/>
    }
}

export default ProfileHomePage;