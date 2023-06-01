
//Pour la lecture du fichier JSON
const path = require('path');
const fs = require('fs');



function loadExercisesFromJSON() {
    const filePath = path.join(__dirname, 'exercise.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const exercises = JSON.parse(data);

    // Utilisez les données JSON ici
    console.log(exercises);
    console.log("Exercice 1");
    console.log(exercises[0]);

    return exercises;
}


function getRandomExerciseFromJSON(){
    const exercises = loadExercisesFromJSON();
    const randomIndex = Math.floor(Math.random() * exercises.length);
    const randomExercise = exercises[randomIndex];
    return randomExercise;
}









module.exports = {
    getRandomExerciseFromJSON
};