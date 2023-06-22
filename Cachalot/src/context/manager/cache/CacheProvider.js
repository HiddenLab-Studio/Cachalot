import {createContext, useContext} from "react";

// Cache Managers
import friendsCacheManager from "./FriendsCacheManager.js";
import xpCacheManager from "./xpCacheManager.js";
import questCacheManager from "./questCacheManager.js";

const CacheContext = createContext(undefined);

export const useCache = () => {
    return useContext(CacheContext);
}
const CacheProvider = ({ children }) => {

    const functions = {
        init: async () => {
            await xpCacheManager.loadData();
            functions.isUserCached = true;
        },

        friendsCache: friendsCacheManager,
        xpCache: xpCacheManager,
        questCache: questCacheManager,

        setIsUserCached: (value) => functions.isUserCached = value,
        isUserCached: false,
    }

    return (
        <CacheContext.Provider value={functions}>
            {children}
        </CacheContext.Provider>
    )
}

export default CacheProvider;