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


app.use(express.json());



//Partie exerciseMaker

// Utilisation du middleware body-parser pour traiter les données JSON
app.use(bodyParser.json());


//On récupère l'exercice envoyé par le client
app.post('/api/sentExercise', (req, res) => {
  //console.log(req);
  console.log(req.body);

  res.send('Exercice reçu');
});




//Partie exercisePlayer

var exercise = {
  type: 'QCM',
  title: 'Titre de l\'exercice',
  question: 'Question de l\'exercice',
  answer1: 'réponse 1',
  answer2: 'réponse 2',
  answer3: 'réponse 3',
  answer4: 'réponse 4',
  answer5: 'réponse 5',
  QCMCorrectAnswer: [2, 3, 5]
};


//On envoie l'exercice demandé par le client au client
app.post('/api/getUserExercise', (req, res) => {
  let userExerciseId = req.body.exerciseId;
  console.log(userExerciseId);


  //On vient supprimer la réponse avant de l'envoyer au client

  //RAJOUTER LA PARTIE FIREBASE ICI
  let exerciseToSend = JSON.parse(JSON.stringify(exercise));
  exerciseToSend.answer = "";
  exerciseToSend.QCMCorrectAnswer = "";

  console.log(exercise);
  // Données à envoyer au client
  const data = {
    exercise: exerciseToSend,
  };

  // Envoie des données en tant que réponse
  res.send(data);
});


//On récupère la réponse de l'utilisateur et on la compare à la réponse de l'exercice
app.post('/api/sendAnswerAndGetSolution', (req, res) => {
  console.log(req.body);


  //RAJOUTER LA PARTIE FIREBASE ICI
  if (exercise.type == "INPUT") {
    let answer = req.body.answer;
    let solution = exercise.answer;


    let isCorrect = compareAnswer(answer, solution);

  }
  if (exercise.type == "QCM") {
    let answer = req.body.answerQCM;
    let solution = exercise.QCMCorrectAnswer;

    isCorrect = compareArrays(answer, solution);
  }
  res.json({ isCorrect });

});

function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

//On vient prendre la solution de l'exercice et on défini un arrondi acceptable pour la réponse utilisateur (2 chiffres après la virgule)
function AllowedSolution(solution) {
  console.log(solution);
  const normalizeString = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  return normalizeString(solution);
}


function compareAnswer(answer, solution) {
  if (answer == solution || AllowedSolution(answer) == AllowedSolution(solution)) {
    return true;
  }
  else {
    return false;
  }
}

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
