import xpCacheManager from "../context/manager/cache/xpCacheManager.js";

async function loadXpCache(currentUser, callback){
    if(currentUser !== null) {
        if(currentUser instanceof Object && !xpCacheManager.isUserCached()){
            callback(true);
            xpCacheManager.loadData(currentUser.uid).then((r) => {
                if(r.data !== undefined){
                    console.info("Xp cache loaded!");
                    callback(false);
                }
            });


        } else {
            callback(false);
        }
    }
}

export default loadXpCache;