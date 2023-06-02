
//Pour la lecture du fichier JSON
const path = require('path');
const fs = require('fs');

var exercisesJSON = undefined;


function loadExercisesFromJSON() {
    const filePath = path.join(__dirname, 'exercise.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const exercises = JSON.parse(data);

    // Utilisez les données JSON ici
    exercisesJSON = exercises

    return exercises;
}


function getRandomExerciseFromJSON() {
    const exercises = loadExercisesFromJSON();
    const randomIndex = Math.floor(Math.random() * exercises.length);
    const randomExercise = exercises[randomIndex];
    return randomExercise;
}


//On vient prendre la solution de l'exercice et on défini un arrondi acceptable pour la réponse utilisateur (2 chiffres après la virgule)
function AllowedSolution(solution) {
    const normalizeString = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    return normalizeString(solution);
}



//On vient comparer la solution de l'exercice avec la réponse de l'utilisateur
function checkSolution(solution, userSolution) {
    if (solution == userSolution || AllowedSolution(solution) == AllowedSolution(userSolution)) {
        return true;
    }
    else {
        return false;
    }
}


//Récupération de l'entrée utilisateur et vérification de la solution
function getUserInputAndCheckSolutionFrench(answer, exerciseId) {

    solution = exercisesJSON[exerciseId].reponse;

    if (checkSolution(solution, answer)) {
        //Bonne réponse
        return true;
    }
    else {
        //Mauvaise réponse
        return false;
    }
}






module.exports = {
    getRandomExerciseFromJSON,
    getUserInputAndCheckSolutionFrench
};