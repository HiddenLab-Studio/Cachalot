// Déclaration des modules importants
const express = require("express");
const http = require("http");
const cors = require("cors");

// Déclaration des modules utiles
const app = express();
const path = require("path");
const dotenv = require("dotenv").config({path: "./.env"});
//const compression = require("compression");
const bodyParser = require("body-parser");
const {generateRandomExercise, getUserInputAndCheckSolution} = require("./functions/math/MathExerciseGenerator");

// Firebase
const firebaseConfigClient = require("./config/firebase.config");
const { auth, db , storage } = firebaseConfigClient();
const { doc, getDoc, getDocs, updateDoc } = require("firebase/firestore");

// cache
const cacheManager = require("./cache/cacheManager");

// Scheduler
const CronJob = require('cron').CronJob;


// Configuration du serveur
app.use(express.static(path.join(__dirname, "..")));
app.use(cors());
//app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
/*app.use(session)
app.use(flash());*/
app.set("title", process.env.SERVER_NAME)
app.set("port", process.env.SERVER_PORT);
app.set("env", process.env.SERVER_ENV)
app.set("view engine", "ejs");
if(app.get("env") === "production"){
    app.set("trust proxy", 1);
}

// home page
app.get('/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write('Cachalot - Back server started!');
    res.end();
})

app.get('/test', (req, res) => {
    console.log("[REQUEST] user request data from the server!")
    res.send(JSON.stringify("request processed successfully!"))
})

app.post('/api/getExercise', (req, res) => {
    console.log("[POST] user send data to the server !")
    let currentExerciseType = req.body.currentExerciseType;
    let currentLevel = req.body.currentLevel;
    const exercise = generateRandomExercise(currentExerciseType, currentLevel);
    res.send({exercise: exercise});
})

app.post('/api/getExercises', (req, res) => {
    console.log("[POST] user send data to the server !")
    let type = req.body.type;
    let amount = req.body.amount;
    let exerciseList = [];
    for (let i = 0; i < amount; i++) {
        exerciseList.push(generateRandomExercise());
    }
    res.send({exercises: exerciseList});
})

app.post('/api/getSolution', (req, res) => {
    console.log("[POST] user send data to the server !")
    let currentExercise = req.body.exercise;
    let answer = req.body.answer;
    console.log(currentExercise);
    let isCorrect = getUserInputAndCheckSolution(answer, currentExercise);
    res.send({isCorrect: isCorrect});
})

app.post('/api/getXpCache', async (req, res) => {
    let id = req.body.id;
    let retrievedData = undefined;
    console.info("[INFO] user " + id + " request data from the server!")
    if (cacheManager.getUserFromXpCache(id) === null) {
        // retrieve user xp data from the database
        const userRef = doc(db, "users", id);
        await getDoc(userRef).then((doc) => {
            if (doc.exists()) {
                console.log("[INFO] user data retrieved successfully!");
                // add data to the cache
                cacheManager.setUserToXpCache(id, doc.data().userXp);
                // set the retrieved data
                retrievedData = doc.data().userXp;
            } else {
                console.log("[ERROR] user data not found!");
            }
        }).catch((error) => {
            console.log("[ERROR] Error getting user data:", error);
        });
    } else {
        console.log("[INFO] user " + id + " already in the cache!");
        retrievedData = cacheManager.getUserFromXpCache(id);
    }
    res.send({data: retrievedData});
})

app.post('/api/updateXpCache', async (req, res) => {
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


const scheduledJob = new CronJob('*/30 * * * *', async () => {
    console.log("[INFO] scheduled job started!");
    // Push xp cache to the database for each users' data
    let users = cacheManager.getAllUserIdFromXpCache();
    if(users.length !== 0){
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
});

// Lancement du serveur
const server = http.createServer(app);
server.listen(app.get("port"), () => {
    process.stdout.write('\x1B[2J\x1B[0f');
    console.log("[INFO] Server " + app.get("title") + " started on port: " + app.get("port"));
    console.log("[INFO] Server environnement: " + app.get("env"));
    console.log("[INFO] Server started successfully!");

    // start the scheduled job
    scheduledJob.start();
})