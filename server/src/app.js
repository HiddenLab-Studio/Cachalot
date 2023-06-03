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
    res.write('BonneEcole - Back server started!');
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

app.post('/api/getSolution', (req, res) => {
    console.log("[POST] user send data to the server !")
    let currentExercise = req.body.exercise;
    let answer = req.body.answer;
    console.log(currentExercise);
    let isCorrect = getUserInputAndCheckSolution(answer, currentExercise);
    res.send({isCorrect: isCorrect});
})

// Lancement du serveur
const server = http.createServer(app);
server.listen(app.get("port"), () => {
    process.stdout.write('\x1B[2J\x1B[0f');
    console.log("[INFO] Server " + app.get("title") + " started on port: " + app.get("port"));
    console.log("[INFO] Server environnement: " + app.get("env"));
})