const questJson = require("../../data/quest.json");
const cacheManager = require("../cacheManager");

const firebaseConfigClient = require("../../config/firebase.config");
const { auth, db , storage } = firebaseConfigClient();
const {doc, getDoc, getDocs, updateDoc, collection} = require("firebase/firestore");

const utils = {
    generateQuest: async(amount = 3) => {
        let quests = [];
        for (let i = 0; i < amount; i++) {
            quests.push(questJson[Math.floor(Math.random() * questJson.length)]);
        }
        return quests;
    },
    updateDatabase: async () => {
        let users = cacheManager.getAllUserIdFromQuestCache();
        if(users.length !== 0){

            // QuestCache
            for (let i = 0; i < users.length; i++) {
                let id = users[i];
                let userRef = doc(db, "users", id);
                let data = cacheManager.getUserFromQuestCache(id);
                if(data.isUpdated){
                    data.isUpdated = false;
                    await updateDoc(userRef, {
                        userQuest: data
                    }).then(() => {
                        console.log("[INFO] user " + id + " data updated successfully!");
                    }).catch((error) => {
                        console.log("[ERROR] Error updating user data:", error);
                    });
                } else {
                    console.log("[INFO] user " + id + " data not updated cause never changed!");
                }
            }

            // XpCache
            for (let i = 0; i < users.length; i++) {
                let id = users[i];
                let userRef = doc(db, "users", id);
                let data = cacheManager.getUserFromXpCache(id);
                if(data.isUpdated){
                    data.isUpdated = false;
                    await updateDoc(userRef, {
                        userXp: data
                    }).then(() => {
                        console.log("[INFO] user " + id + " data updated successfully!");
                    }).catch((error) => {
                        console.log("[ERROR] Error updating user data:", error);
                    });
                } else {
                    console.log("[INFO] user " + id + " data not updated cause never changed!");
                }
            }

        } else {
            console.log("[INFO] no user in the cache!");
        }
    },

    updateQuestOfTheDay: async () => {
        // return id of users in collection users
        let users = [];
        await getDocs(collection(db, "users")).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                users.push({id: doc.id, userQuest: doc.data().userQuest});
            });
        });

        // update quest of the day
        for (let i = 0; i < users.length; i++) {
            let id = users[i].id;
            let userRef = doc(db, "users", id);
            let data = users[i].userQuest;
            data.currentQuest = await utils.generateQuest();
            await updateDoc(userRef, {
                userQuest: data
            }).then(() => {
                console.log("[INFO] user " + id + " data updated successfully!");
                cacheManager.setUserToQuestCache(id, data);
            }).catch((error) => {
                console.log("[ERROR] Error updating user data:", error);
            });
        }
    }
}

module.exports = utils;