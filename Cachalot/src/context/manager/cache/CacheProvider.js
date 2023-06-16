import {createContext, useContext} from "react";
import { friendsCacheManager } from "./FriendsCacheManager.js";

const CacheContext = createContext(undefined);

export const useCache = () => {
    return useContext(CacheContext);
}
const CacheProvider = ({ children }) => {

    const functions = {
        friendsCache: friendsCacheManager,
        //xpCache: manager,
    }

    return (
        <CacheContext.Provider value={functions}>
            {children}
        </CacheContext.Provider>
    )
}

export default CacheProvider;