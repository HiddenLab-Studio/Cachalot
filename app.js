const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;


//On défini le dossier indiqué comme dossier statique => on peut directement accéder aux fichiers du dossier côté client
app.use(express.static('BonneEcole/src/exerciseMaker'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/BonneEcole/src/exerciseMaker/exerciseMaker.html');
});


app.use(express.json());


// Utilisation du middleware body-parser pour traiter les données JSON
app.use(bodyParser.json());


//On récupère l'exercice envoyé par le client
app.post('/api/sentExercise', (req, res) => {
  //console.log(req);
  console.log(req.body);

  res.json('Exercice reçu');
});



app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
