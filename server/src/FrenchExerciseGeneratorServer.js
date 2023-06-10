
//Pour la lecture du fichier JSON
const path = require('path');
const fs = require('fs');

var exercisesJSON = loadExercisesFromJSON();


function loadExercisesFromJSON() {
    const filePath = path.join(__dirname, 'exercise.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const exercises = JSON.parse(data);

    exercisesJSON = exercises

    return exercises;
}


function getExercicesFromJSON(Level) {
    loadExercisesFromJSON();
    const exercises = getExerciseByLevel(Level);
    const randomIndex = Math.floor(Math.random() * exercises.length);
    const randomExercise = exercises[randomIndex];
    return randomExercise;
}


//On vient prendre la solution de l'exercice et on défini un arrondi acceptable pour la réponse utilisateur (2 chiffres après la virgule)
function AllowedSolution(solution) {
    console.log(solution);
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

    console.log(answer, exerciseId)
    console.log(exercisesJSON[exerciseId].reponse)
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

//Système de niveau : chaque niveau a un emplacement différent dans le JSON et il se suivent -> d'abord cp, puis ce1, puis ce2, puis cm1, puis cm2
//Ainsi, on créé une fonction qui va retourner uniquement la partie du JSON correspondant au niveau demandé
function getExerciseByLevel(level) {
    const exercises = exercisesJSON;//On récupère le JSON (je ne répète pas la fonction loadExercisesFromJSON() car elle est déjà appelée dans getExercicesFromJSON())
    
    let exercisesByLevel = undefined;
    //On sélectionne la partie du JSON qui nous intéresse en fonction du niveau (slice permet de prendre uniquement entre le premier index inclus et le deuxième index exclus)
    switch (level) {
        case "CP":
            exercisesByLevel = exercises.slice(0, 21);
            break;
        case "CE1":
            exercisesByLevel = exercises.slice(21, 61);
            break;
        case "CE2":
            exercisesByLevel = exercises.slice(51, 101);
            break;
        case "CM1":
            exercisesByLevel = exercises.slice(101, 191);
            break;
        case "CM2":
            exercisesByLevel = exercises.slice(119, 191);
            break;
        default:
            exercisesByLevel = exercises.slice(0, 191);
            break;
    }


    return exercisesByLevel;
}





module.exports = {
    getExercicesFromJSON,
    getUserInputAndCheckSolutionFrench
};