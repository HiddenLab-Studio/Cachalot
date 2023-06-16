const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;


//On défini le dossier indiqué comme dossier statique => on peut directement accéder aux fichiers du dossier côté client
app.use(express.static('BonneEcole/src/exerciseMaker'));
app.use(express.static('BonneEcole/src/exercisePlayer'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/BonneEcole/src/exerciseMaker/exerciseMaker.html');
});

app.get('/exercisePlayer', (req, res) => {
  res.sendFile(__dirname + '/BonneEcole/src/exercisePlayer/exercisePlayer.html');
});


app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
