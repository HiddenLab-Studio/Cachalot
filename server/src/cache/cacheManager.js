let cacheManager = (function(){

    let cache = {
        xp: new Map(),
        quest: new Map(),
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

        setUserToQuestCache: (id, data) => cache.quest.set(id, data),
        getUserFromQuestCache: (id) => {
            let data = cache.quest.get(id);
            if(data === undefined){
                return null;
            }
            return data;
        },

        getAllUserIdFromQuestCache: () => {
            let keys = [];
            for(let key of cache.quest.keys()){
                keys.push(key);
            }
            return keys;
        },

        clearCache: () => {
            cache.xp.clear();
            cache.quest.clear();
        }
    }
})();

module.exports = cacheManager;