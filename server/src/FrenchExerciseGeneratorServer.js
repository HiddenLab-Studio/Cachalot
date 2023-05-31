
//Test création exercice
var exercice = {
    question: "Quel est le verbe dans la phrase suivante ?",
    phrase: "Le chat mange une souris.",
    reponse: "mange"
  };
  
  
  
  const fs = require('fs');
  
  function createExerciseJSON(exercise) {
      //On le convertit en JSON
      var exerciceJSON = JSON.stringify(exercise);
  
      //On l'enregistre dans un fichier
      fs.writeFile('exercise.json', exerciceJSON, 'utf8', function(err) {
          if (err) {
              console.log('Une erreur s\'est produite lors de l\'écriture du fichier.');
              return console.log(err);
          }
  
          console.log('Le fichier JSON a été enregistré avec succès.');
      });
  }
  
  
  createExerciseJSON(exercice);