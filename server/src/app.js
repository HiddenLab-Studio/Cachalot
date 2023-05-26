
const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
const path = require('path');

const dotenv = require('dotenv')
dotenv.config({path : "./.env"});
const PORT = process.env.SERVER_PORT || 5000;

app.use(express.static(path.join(__dirname, "..")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../BonneEcole/register.html"));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../../BonneEcole/login.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

//Recuperation des element html

