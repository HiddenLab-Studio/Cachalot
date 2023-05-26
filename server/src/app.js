// Déclaration des modules importants
const express = require("express");
const http = require("http");
const cors = require("cors");
//const mysql = require("mysql");



// Déclaration des modules utiles
const app = express();
const path = require("path");
const dotenv = require("dotenv").config({path: "./.env"});
/*const compression = require("compression");
const bodyParser = require("body-parser");
const flash = require("express-flash");*/

// Configuration de la base de données
/*const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})*/

// Configuration du serveur
app.use(express.static(path.join(__dirname, "..")));
app.use(cors());
/*app.use(compression());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(session)
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

// Lancement du serveur
const server = http.createServer(app);
server.listen(app.get("port"), () => {
    process.stdout.write('\x1B[2J\x1B[0f');
    console.log("[INFO] Server " + app.get("title") + " started on port: " + app.get("port"));
    console.log("[INFO] Server environnement: " + app.get("env"));
    /*console.log("[INFO] Server view engine: " + app.get("view engine"));
    console.log("[INFO] Hooking into MySQL...");
    pool.getConnection((error, connection) => {
        if(error) throw error;
        connection.release();
        console.log("[INFO] Server is now connected to database");
    })*/
})
