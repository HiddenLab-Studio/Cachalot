import React, {useEffect, useState} from "react";

// Context
import { useAuth } from "../../../context/AuthContext.js";
import { useCache } from "../../../context/manager/cache/CacheManager.js";

// Styled components
import {
    MainContainer
} from "../../../components/utils/ui/GlobalStyle.js";

// Components
import Navbar from "../../../components/navbar/Navbar.jsx";
import Search from "./searchComponents/Search.jsx";

import Loading from "../../../components/utils/loading/Loading.jsx";

const SearchUser = () => {
    // Context
    const auth = useAuth();
    const cacheManager = useCache();

    // States
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(auth.currentUser instanceof Object || typeof auth.currentUser === "number") {
            const getUserFriends = async (id) => {
                // if the cache is empty, load the data from the database
                if(cacheManager.isFriendsCacheEmpty()){
                    let result = await auth.utils.getUserFriends(id);
                    cacheManager.setFriendsCache(result.follower, result.following);
                    return result;
                } else {
                    // if the cache is not empty, load the data from the cache
                    console.info("Friends loaded from cache!");
                }
            }

            getUserFriends(auth.currentUser.uid).then(() => {
                console.info("Friends loaded successfully!");
                setIsLoading(false);
            });
        }
    }, [auth.currentUser])

    if(isLoading) {
        return <Loading />
    } else {
        return (
            <MainContainer>
                <Navbar />
                <Search auth={auth} />
            </MainContainer>
        )
    }
}

export default SearchUser;