const express = require('express');
const {generateRandomExercise, getUserInputAndCheckSolution} = require("../functions/math/MathExerciseGenerator");
const {getExercicesFromJSON, getUserInputAndCheckSolutionFrench} = require("../functions/french/FrenchExerciseGeneratorServer");
const router = express.Router();

router.post('/getExercise', (req, res) => {
    console.log("[POST] user send data to the server !")
    let type = req.body.exerciseType;
    let currentLevel = req.body.currentLevel;
    let currentExerciseType = undefined;
    let exercise = undefined;

    switch (type) {
        case "math":
            currentExerciseType = req.body.currentExerciseType
            exercise = generateRandomExercise(currentExerciseType, currentLevel);
            break;
        case "french":
            console.log("her")
            exercise = getExercicesFromJSON(currentLevel);
            break;

    }
    res.send({exercise: exercise});
})

router.post('/getExercises', (req, res) => {
    console.log("[POST] user send data to the server !")
    let type = req.body.type;
    let currentLevel = req.body.currentLevel;
    let amount = req.body.amount;
    let exerciseList = [];

    switch (type) {
        case "math":
            for (let i = 0; i < amount; i++) {
                exerciseList.push(generateRandomExercise("all", currentLevel));
            }
            break;
        case "french":
            console.log("french")
            for (let i = 0; i < amount; i++) {
                exerciseList.push(getExercicesFromJSON());
            }
            let onlyInputExercise = exerciseList.filter((exercise) => exercise.type === "INPUT");
            let objectList = [];
            for (let i = 0; i < onlyInputExercise.length; i++) {
                //phrase question / id
                let tmp = {
                    id: exerciseList[i].id,
                    exercise: {
                        question: exerciseList[i].question,
                        phrase: exerciseList[i].phrase
                    }
                }
                objectList.push(tmp);
            }
            exerciseList = objectList;
            break;
        default:
                break;
    }
    console.log(exerciseList)
    res.send({exercises: exerciseList});
})
router.post('/getSolution', (req, res) => {
    //console.log("[POST] user send data to the server !")
    let currentExercise = req.body.exercise;
    let answer = req.body.answer;
    let isCorrect = false;

    console.log(currentExercise);

    if(currentExercise.id === undefined){
        isCorrect = getUserInputAndCheckSolution(answer, currentExercise);
    } else {
        isCorrect = getUserInputAndCheckSolutionFrench(answer, currentExercise.id);
    }
    res.send({isCorrect: isCorrect});
})

module.exports = router;