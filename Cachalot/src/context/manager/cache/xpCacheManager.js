import {utils} from "../../database/utilsFunctions.js";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import firebaseConfigClient from "../../../services/firebase.config.js";
import axios from "axios";
import {data} from "../../../pages/exercise/functions/MathExerciseGenerator.js";
const { auth, db, storage } = firebaseConfigClient();

let xpCache = {
    currentXp: 0,
    currentLvl: 1,
    cumulatedXp: 0,
}

let uid = undefined;
let cacheUpdated = false;
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
            await axios.post("http://localhost:4000/api/getXpCache", JSON.stringify({
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
        if(!cacheUpdated) cacheUpdated = true;
        xpCache.currentXp += xp
        xpCache.cumulatedXp += xp;
        checkLvlUp(xpCache.currentLvl);
        //console.info(getRequiredXp(xpCache.currentLvl) - xpCache.currentXp + " xp avant le prochain niveau");
        //xpCacheManager.test();
    },

    getRequiredXp: (lvl) => getRequiredXp(lvl),
    getXpCache: () => xpCache,
    isUserCached: () => isUserCached,

    // Update
    updateNodeCache: async (id) => {
        let result = undefined;
        if(cacheUpdated){
            await axios.post("http://localhost:4000/api/updateXpCache", JSON.stringify({
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
            cacheUpdated = false;
        }
        return result;
    }

}

export default xpCacheManager;