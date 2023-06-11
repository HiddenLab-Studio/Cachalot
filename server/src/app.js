
const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
const path = require('path');


const dotenv = require('dotenv')
dotenv.config({ path: "./.env" });
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

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

const fs = require('fs');

function loadJSONFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (parseError) {
                    reject(parseError);
                }
            }
        });
    });
}

function loadJSONFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (parseError) {
                    reject(parseError);
                }
            }
        });
    });
}

app.get('/xp-data', (req, res) => {
    fs.readFile('./src/firebase-client/xp.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        }
    });
});

app.get('/quests', (req, res) => {
    fs.readFile('./src/firebase-client/quests.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Une erreur s\'est produite lors de la lecture du fichier quests.json');
        } else {
            try {
                const quests = JSON.parse(data);
                res.json(quests);
            } catch (error) {
                console.error(error);
                res.status(500).send('Une erreur s\'est produite lors du traitement du fichier quests.json');
            }
        }
    });
});


