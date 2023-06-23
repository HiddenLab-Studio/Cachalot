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
    let currentLevel = req.body.currentLevel;
    let amount = req.body.amount;
    let exerciseList = [];
    for (let i = 0; i < amount; i++) {
        exerciseList.push(generateRandomExercise("all", currentLevel));
    }
    res.send({exercises: exerciseList});
})

app.post('/api/getSolution', (req, res) => {
    //console.log("[POST] user send data to the server !")
    let currentExercise = req.body.exercise;
    let answer = req.body.answer;
    console.log(currentExercise);
    let isCorrect = getUserInputAndCheckSolution(answer, currentExercise);
    res.send({isCorrect: isCorrect});
})


//FRANCAIS
//On envoie un exercice aléatoire au client
app.post('/api/getNewFrenchExercise', (req, res) => {
    const exerciseLevel = req.body.currentLevel;
  
    exercise = getExercicesFromJSON(exerciseLevel);
  
    const data = {
      exerciseId: exercise.id,
      exerciseType: exercise.type,
      exerciseQuestion: exercise.question,
      exerciseSentence: exercise.phrase,
    }
    
    res.send(data);
  });
  //On récupère la réponse du client et on vérifie si elle est correcte
app.post('/api/getSolutionFrench', (req, res) => {
    const exerciseId = req.body.exerciseId;
    const answer = req.body.answer;
  
    //On verifie la solution
    let isCorrect2 = getUserInputAndCheckSolutionFrench(answer, exerciseId);
  
    // Données à envoyer au client
    res.json({ isCorrect: isCorrect2 });
  });

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