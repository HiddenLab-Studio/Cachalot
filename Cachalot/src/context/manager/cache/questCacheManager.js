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

    setData: async(id, data) => {
        questCache = data
        await questCacheManager.updateNodeCache(uid).then(() => console.info("questCache updated!"));
    },

    getCache: () => questCache,

    claimReward: async (id) => {
        let result = false;
        let quest = questCache.currentQuest[id];
        if(quest.current >= quest.amount){
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
    updateQuestProgress: async (type) => {
        switch (type) {
            case "onExerciseCompleted":
                // update progress (field current) for each quest with type "onExerciseCompleted"
                console.log(questCache);
                for(let i = 0; i < questCache.currentQuest.length; i++){
                    if(questCache.currentQuest[i].type === "onExerciseCompleted"){
                        questCache.currentQuest[i].current++;
                        questCache.isUpdated = true;
                    }
                }
                console.log(questCache);
                break;
            case "onTrainingCompleted":
                console.log(questCache);
                for(let i = 0; i < questCache.currentQuest.length; i++){
                    if(questCache.currentQuest[i].type === "onTrainingCompleted"){
                        questCache.currentQuest[i].current++;
                        questCache.isUpdated = true;
                    }
                }
                console.log(questCache);
                break;
            default:
                console.error("Unknown quest type!");
                break;
        }

        await questCacheManager.updateNodeCache(uid);

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
    },

    clearCache: () => {
        questCache = {
            currentQuest: [],
            totalQuestDone: 0,
            isUpdated: false,
        };
    }

}

export default questCacheManager;