const express = require('express');
const app = express();
const port = 4000;

const { generateRandomExercise } = require('./server/src/ExerciseGeneratorServer.js');



//On défini le dossier indiqué comme dossier statique => on peut directement accéder aux fichiers du dossier côté client
app.use(express.static('BonneEcole/src/ExerciseGenerator'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/BonneEcole/src/ExerciseGenerator/ExerciseGenerator.html');
});


var currentExercise = generateRandomExercise();
app.get('/api/getNewExercise', (req, res) => {
  exercise = generateRandomExercise();
  // Données à envoyer au client
  const data = {
    exercise: exercise,
  };

  // Envoie des données en tant que réponse
  res.send(data);
});

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});







