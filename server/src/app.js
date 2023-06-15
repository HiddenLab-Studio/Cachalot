
const express = require('express');
const cors = require('cors');


const app = express();
const path = require('path');


const dotenv = require('dotenv')
dotenv.config({path : "./.env"});
const PORT = process.env.SERVER_PORT || 5000;

app.use(express.static(path.join(__dirname, "..")));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../BonneEcole/html/index.html"));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "../../BonneEcole/html/register.html"));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../../BonneEcole/html/login.html"));
});

app.get('/info', (req, res) => {
    res.sendFile(path.join(__dirname, "../../BonneEcole/html/info.html"));
});

app.get('/passwordReset', (req, res) => {
    res.sendFile(path.join(__dirname, "../../BonneEcole/html/passwordReset.html"));
});

app.get('/room', (req, res) => {
    res.sendFile(path.join(__dirname, "../../BonneEcole/html/room.html"));
});

app.get('/JZU0S', (req, res) => {
    res.sendFile(path.join(__dirname, "../../BonneEcole/html/classe.html"));
});

app.get('/ligue', (req, res) => {
    res.sendFile(path.join(__dirname, "../../BonneEcole/html/ligue.html"));
});

app.get('/francais/game1', (req, res) => {
    res.sendFile(path.join(__dirname, "../../BonneEcole/html/game.html"));
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


