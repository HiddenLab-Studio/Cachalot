const express = require('express');
const app = express();
const port = 4000;



app.use(express.static('BonneEcole/src/ExerciseGenerator'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/BonneEcole/src/ExerciseGenerator/ExerciseGenerator.html');
  });


app.get('/api/getNewExercise', (req, res) => {
  // Données à envoyer au client
  const data = {
    message: 'Bonjour, voici les informations !',
    exercise: exercise,
  };

  // Envoie des données en tant que réponse
  res.send(data);
});

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});








//JE VAIS LE DEPLACER DANS UN AUTRE FICHIER DANS LE DOSSIER SERVER
//Genere une valeur aléatoire entre min et max
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Genere un opérateur aléatoire
function generateRandomOperator() {
  var operators = ["+", "-", "*", "/"];
  return operators[generateRandomNumber(0, 3)];
}

//Genere un exercice aléatoire de calcul
function generateRandomExercise(operatorUsed = "all") {
  var firstNumber = generateRandomNumber(0, 10);
  var secondNumber = generateRandomNumber(0, 10);

  if (operatorUsed == "all") {
      var operator = generateRandomOperator();
  } else {
      var operator = operatorUsed;
  }
  return firstNumber + " " + operator + " " + secondNumber;
}

var exercise = generateRandomExercise();