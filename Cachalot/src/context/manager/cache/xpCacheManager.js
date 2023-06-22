import axios from "axios";

let xpCache = {
    currentXp: 0,
    currentLvl: 1,
    cumulatedXp: 0,
    isUpdated: false,
}

let uid = undefined;
let isUserCached = false;

function getRequiredXp(lvl){
    return Math.round(5 * Math.pow(1.2, lvl));
}

function checkLvlUp(lvl){
    while (xpCache.currentXp >= getRequiredXp(lvl)){
        console.info("Niveau supérieur !")
        xpCache.currentXp -= getRequiredXp(lvl);
        xpCache.currentLvl++;
        console.info(xpCache);
    }
}

const xpCacheManager = {
    loadData: async (id) => {
        if(!isUserCached){
            isUserCached = true;
            uid = id;
            let result = undefined;
            await axios.post("http://localhost:4000/api/cache/getXpCache", JSON.stringify({
                id: uid,
            }), {
                headers: {"Content-Type": "application/json"}
            }).then((response) => {
                result = response.data;
            }).catch((error) => {
                console.log(error);
            });

            if(result.data !== undefined){
                xpCache = result.data;
                xpCache.isUpdated = false;
            } else {
                console.error("Error while loading xpCache: result.data is undefined!");
            }

            return result;
        } else {
            console.info("UserXp loaded from cache!");
            return {data: xpCache};
        }
    },

    addXp: (xp) => {
        if(!xpCache.isUpdated) xpCache.isUpdated = true;
        xpCache.currentXp += xp
        xpCache.cumulatedXp += xp;
        checkLvlUp(xpCache.currentLvl);
        xpCacheManager.updateNodeCache(uid).then(r =>
            console.info("xpCache updated: " + r)
        );
        //console.info(getRequiredXp(xpCache.currentLvl) - xpCache.currentXp + " xp avant le prochain niveau");
        //xpCacheManager.test();
    },

    getRequiredXp: (lvl) => getRequiredXp(lvl),
    getXpCache: () => xpCache,
    isUserCached: () => isUserCached,

    // Update
    updateNodeCache: async (id) => {
        let result = undefined;
        if(xpCache.isUpdated){
            await axios.post("http://localhost:4000/api/cache/updateXpCache", JSON.stringify({
                id: id,
                data: xpCache,
            }), {
                headers: {"Content-Type": "application/json"}
            }).then((response) => {
                result = response.data.isUpdated;
                //console.log(response.data);
            }).catch((error) => {
                console.log(error);
            });
            xpCache.isUpdated = false;
        }
        return result;
    }

}

export default xpCacheManager;