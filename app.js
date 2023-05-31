const express = require('express');
const app = express();
const port = 4000;

const { generateRandomExercise, getUserInputAndCheckSolution } = require('./server/src/MathExerciseGeneratorServer.js');


//On défini le dossier indiqué comme dossier statique => on peut directement accéder aux fichiers du dossier côté client
app.use(express.static('BonneEcole/src/MathExerciseGenerator'));

app.use(express.json()); // Middleware express.json() pour parser le JSON des requêtes POST (essentiel pour récupérer les données envoyées par le client avec une requête POST)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/BonneEcole/src/MathExerciseGenerator/MathExerciseGenerator.html');
});


//On envoie un exercice aléatoire au client
app.post('/api/getNewExercise', (req, res) => {
  const exerciseType = req.body.currentExerciseType;
  const exerciseLevel = req.body.currentLevel;

  exercise = generateRandomExercise(exerciseType, exerciseLevel);
  // Données à envoyer au client
  const data = {
    exercise: exercise,
  };

  // Envoie des données en tant que réponse
  res.send(data);
});

//On récupère la réponse du client et on vérifie si elle est correcte
app.post('/api/getSolution', (req, res) => {
  const exercise = req.body.currentExercise;
  const answer = req.body.answer;

  //On verifie la solution
  let isCorrect2 = getUserInputAndCheckSolution(answer, exercise);

  // Données à envoyer au client
  res.json({isCorrect: isCorrect2});
});

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});