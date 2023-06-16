
let xpCache = {
    currentXp: 0,
    currentLvl: 1,
    cumulatedXp: 0,
    isCacheUpdated: false
}


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
    loadData: (object) => {
        if(object === null) return;
        for (const objectKey in object) {
            xpCache[objectKey] = object[objectKey];
        }
    },

    addXp: (xp) => {
        if(!xpCache.isCacheUpdated) xpCache.isCacheUpdated = true;
        xpCache.currentXp += xp
        xpCache.cumulatedXp += xp;
        console.info(getRequiredXp(xpCache.currentLvl) - xpCache.currentXp + " xp avant le prochain niveau");
        checkLvlUp(xpCache.currentLvl);
        xpCacheManager.test();
    },

    removeXp: (xp) => xpCache.currentXp -= xp,

    test: () => {
        for (let i = 1; i <= 25; i++) {
            console.log(getRequiredXp(i));
        }
    },

    getRequiredXp: (lvl) => getRequiredXp(lvl),
    getXpCache: () => xpCache,

}

export default xpCacheManager;