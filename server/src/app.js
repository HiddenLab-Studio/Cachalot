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
const {getExercicesFromJSON, getUserInputAndCheckSolutionFrench} = require("./functions/french/FrenchExerciseGeneratorServer");

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

app.get('/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write('Cachalot - Back server started!');
    res.end();
})

const exerciseRouter = require("./router/exerciseRouter");
app.use("/api/exercise", exerciseRouter);

const utils = require("./cache/function/utils");
const cacheRouter = require("./cache/router/cacheRouter");
app.use("/api/cache", cacheRouter);
const scheduledJob = new CronJob('*/30 * * * *', async () => {
    console.log("[INFO] scheduled job started!");
    await utils.updateDatabase();
});

const NewQuestOfTheDay = new CronJob('0 0 * * *', async () => {
    console.log("[INFO] scheduled job started!");
    await utils.updateQuestOfTheDay();
});

// Lancement du serveur
const server = http.createServer(app);
server.listen(app.get("port"), async () => {
    process.stdout.write('\x1B[2J\x1B[0f');
    console.log("[INFO] Server " + app.get("title") + " started on port: " + app.get("port"));
    console.log("[INFO] Server environnement: " + app.get("env"));
    console.log("[INFO] Server started successfully!");
    // start the scheduled job
    scheduledJob.start();
    NewQuestOfTheDay.start();
    //await utils.updateQuestOfTheDay();
})