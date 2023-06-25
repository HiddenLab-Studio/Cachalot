import React, { useEffect, useState } from "react";

// Context
import { useAuth } from "../../context/AuthContext.js";
import {useCache} from "../../context/manager/cache/CacheProvider.js";

// Components
import FullLoading from "../../components/utils/loading/FullLoading.jsx";
import ConnectionHomePage from "../connection/ConnectionHomePage.jsx";
import Profile from "./components/Profile.jsx";

const ProfileHomePage = ({isSearching}) => {
    // Context
    const auth = useAuth();
    const cache = useCache();

    // State
    const [isLoading, setIsLoading] = useState(!cache.isUserCached);

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