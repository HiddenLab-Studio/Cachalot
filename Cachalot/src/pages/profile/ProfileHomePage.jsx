import React, { useEffect, useState } from "react";

// Context
import { useAuth } from "../../context/AuthContext.js";

// Components
import ConnectionHomePage from "../connection/ConnectionHomePage.jsx";
import Profile from "./components/Profile.jsx";
import Loading from "../../components/utils/loading/Loading.jsx";
import loadXpCache from "../../utils/onLoading.js";
import {MainContainer} from "../../components/utils/ui/GlobalStyle.js";
import Navbar from "../../components/navbar/Navbar.jsx";
import {AsideContainer, ContentContainer, MainSection} from "../home/HomeStyle.js";
import TrendingExercise from "../../components/cards/TrendingExercise.jsx";
import {Link} from "react-router-dom";
import FullLoading from "../../components/utils/loading/FullLoading.jsx";
import {useCache} from "../../context/manager/cache/CacheProvider.js";

const ProfileHomePage = ({isSearching}) => {
    // Context
    const auth = useAuth();
    const cache = useCache();

    // State
    const [isLoading, setIsLoading] = useState(!cache.isUserCached);

    // Executed every time the component is rendered or when the state of userData changes
    /*useEffect(() => {
        if(auth.currentUser instanceof Object || typeof auth.currentUser === "number") {
            if(auth.currentUser instanceof Object) {
                loadXpCache(auth.currentUser, setIsLoading)
            } else {
                setIsLoading(false)
            }
        }
    }, [auth.currentUser, window.location.pathname])*/



    /*if(isLoading) {
        return <Loading />
    } else if(auth.currentUser instanceof Object || props.isSearching) {
        return <Profile auth={auth} />
    } else if(typeof auth.currentUser === "number") {
        return <ConnectionHomePage/>
    }*/

    if(typeof auth.currentUser === "number" && !isSearching) {
        return <ConnectionHomePage/>
    } else {
        if(isLoading) {
            return <FullLoading setIsLoading={setIsLoading} />
        } else {
            return <Profile auth={auth} cache={cache} />
        }
    }

}

export default ProfileHomePage;