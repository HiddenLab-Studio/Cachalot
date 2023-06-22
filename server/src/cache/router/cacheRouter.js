const express = require('express');
const router = express.Router();

const cacheManager = require("../cacheManager");
const utils = require("../function/utils");

const firebaseConfigClient = require("../../config/firebase.config");
const { auth, db , storage } = firebaseConfigClient();
const {doc, getDoc, updateDoc} = require("firebase/firestore");

router.post('/getQuestCache', async (req, res) => {
    let id = req.body.id;
    console.info("[INFO] Loading userCache for user " + id);
    let retrievedData = cacheManager.getUserFromQuestCache(id);
    if(retrievedData === null) {
        const userRef = doc(db, "users", id);
        await getDoc(userRef).then(async (doc) => {
            if (doc.exists()) {
                let data = doc.data().userQuest;
                if(data.currentQuest.length === 0) {
                    data.currentQuest = await utils.generateQuest();
                    await updateDoc(userRef, {
                        userQuest: data
                    }).then(() => {
                        console.log("[INFO] user " + id + " data updated successfully!");
                    });
                }
                cacheManager.setUserToQuestCache(id, data);
                retrievedData = data;
            } else {
                console.log("[ERROR] user data not found!");
            }
        }).catch((error) => {
            console.log("[ERROR] Error getting user data:", error);
        });
    }
    res.send({data: retrievedData});
});
router.post('/updateQuestCache', async (req, res) => {
    let id = req.body.id;
    let data = req.body.data;
    let isUpdated = false;
    if (cacheManager.getUserFromQuestCache(id) !== null) {
        cacheManager.setUserToQuestCache(id, data);
        isUpdated = true;
    }
    res.send({isUpdated: isUpdated});
});

router.post('/getXpCache', async (req, res) => {
    let id = req.body.id;
    let retrievedData = undefined;
    console.info("[INFO] Loading xpCache for user " + id );
    if (cacheManager.getUserFromXpCache(id) === null) {
        const userRef = doc(db, "users", id);
        await getDoc(userRef).then((doc) => {
            if (doc.exists()) {
                cacheManager.setUserToXpCache(id, doc.data().userXp);
                retrievedData = doc.data().userXp;
            } else {
                console.log("[ERROR] user data not found!");
            }
        }).catch((error) => {
            console.log("[ERROR] Error getting user data:", error);
        });
    } else {
        retrievedData = cacheManager.getUserFromXpCache(id);
    }
    res.send({data: retrievedData});
})
router.post('/updateXpCache', async (req, res) => {
    let id = req.body.id;
    let data = req.body.data;
    let isUpdated = false;
    console.info("[INFO] user " + id + " request data from the server!")
    if (cacheManager.getUserFromXpCache(id) !== null) {
        cacheManager.setUserToXpCache(id, data);
        isUpdated = true;
    }
    res.send({isUpdated: isUpdated});
})

module.exports = router;