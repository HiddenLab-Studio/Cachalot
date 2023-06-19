let cacheManager = (function(){

    let cache = {
        xp: new Map(),
        friends: new Map(),
    }

    return {
        setUserToXpCache: (id, data) => cache.xp.set(id, data),
        getUserFromXpCache: (id) => {
            let data = cache.xp.get(id);
            if(data === undefined){
                return null;
            }
            return data;
        },

        getAllUserIdFromXpCache: () => {
            let keys = [];
            for(let key of cache.xp.keys()){
                keys.push(key);
            }
            return keys;
        },

        setFriendsCache: (id, data) => cache.friends.set(id, data),
        getFriendsCache: (id) => cache.friends.get(id),

        clearCache: () => {
            cache.xp.clear();
            cache.friends.clear();
        }
    }
})();

module.exports = cacheManager;