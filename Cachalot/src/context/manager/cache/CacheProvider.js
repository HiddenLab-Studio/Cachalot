import {createContext, useContext} from "react";

// Cache Managers
import friendsCacheManager from "./FriendsCacheManager.js";
import xpCacheManager from "./xpCacheManager.js";

const CacheContext = createContext(undefined);

export const useCache = () => {
    return useContext(CacheContext);
}
const CacheProvider = ({ children }) => {

    const functions = {
        friendsCache: friendsCacheManager,
        xpCache: xpCacheManager,
    }

    return (
        <CacheContext.Provider value={functions}>
            {children}
        </CacheContext.Provider>
    )
}

export default CacheProvider;