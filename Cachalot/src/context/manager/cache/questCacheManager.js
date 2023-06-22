import axios from "axios";
import xpCacheManager from "./xpCacheManager.js";

let questCache = {
    currentQuest: [],
    totalQuestDone: 0,
    isUpdated: false,
}

let uid = undefined;
let isUserCached = false;

const questCacheManager = {
    loadData: async (id) => {
        if(!isUserCached){
            isUserCached = true;
            uid = id;
            let result = undefined;
            await axios.post("http://localhost:4000/api/cache/getQuestCache", JSON.stringify({
                id: uid,
            }), {
                headers: {"Content-Type": "application/json"}
            }).then((response) => {
                result = response.data;
            }).catch((error) => {
                console.log(error);
            });

            if(result.data !== undefined){
                questCache = result.data;
                questCache.isUpdated = false;
            } else {
                console.error("Error while loading questCache: result.data is undefined!");
            }

            return result;
        } else {
            console.info("UserQuest loaded from cache!");
            return {data: questCache};
        }
    },

    getCache: () => questCache,

    claimReward: async (id) => {
        let result = false;
        let quest = questCache.currentQuest[id];
        if(quest.current === quest.amount){
            quest.isClaimed = true;
            questCache.totalQuestDone++;
            questCache.isUpdated = true;
            await questCacheManager.updateNodeCache(uid).then((r) => {
                if(r){
                    console.log("QuestCache updated successfully!");
                    xpCacheManager.addXp(quest.reward);
                    result = true;
                }
            });
        } else {
            console.error("Quest is not completed yet!");
        }
        return result;
    },

    updateNodeCache: async (id) => {
        let result = undefined;
        if(questCache.isUpdated){
            await axios.post("http://localhost:4000/api/cache/updateQuestCache", JSON.stringify({
                id: id,
                data: questCache,
            }), {
                headers: {"Content-Type": "application/json"}
            }).then((response) => {
                result = response.data.isUpdated;
                //console.log(response.data);
            }).catch((error) => {
                console.log(error);
            });
            questCache.isUpdated = false;
        }
        return result;
    }

}

export default questCacheManager;