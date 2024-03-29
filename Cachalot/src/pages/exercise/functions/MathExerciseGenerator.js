import axios from "axios";

// Objet qui contient les données de l'exercice actuel
export let data = {
    validExerciseType: ["addition", "soustraction", "multiplication", "division", "all"], //Tableau contenant les types d'exercices valides
    validClassType: ["CP", "CE1", "CE2", "CM1", "CM2", "all"],                            //Tableau contenant les niveaux valides
    currentExercise: undefined,                                                           //Variable qui contient l'exercice actuel
    currentExerciseType: "all",                                                           //Variable qui contient le type d'exercice actuel
    currentLevel: "all",
    exerciseType: "math"
}

// Objet qui contient les fonctions propres à l'exercice de mathématiques
export const mathFunctions = {
    // Fonction qui initialise l'exercice
    init: async () => {
        await mathFunctions.getExercise().then(() =>
            console.info("Initialization of an exercise...")
        );
    },

    // Fonction qui récupère un exercice
    getExercise: async () => {
        await axios.post("http://localhost:4000/api/exercise/getExercise", JSON.stringify(data), {
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            //console.log(response.data);
            data.currentExercise = undefined;
            data.currentExercise = response.data.exercise;
            console.log(data.currentExercise)
            return response;
        }).catch((error) => {
            console.log(error);
        });
    },

    // Fonction qui permet de sélectionner un type d'exercice
    selectExerciseType: async (type, generateNewExercise = true) => {
        if (data.validExerciseType.includes(type)) {
            data.currentExerciseType = type
            if(generateNewExercise) await mathFunctions.getExercise();
            return true;
        }
        return false;
    },

    // Fonction qui permet de sélectionner un niveau
    selectClassType: async (level) => {
        if (data.validClassType.includes(level)) {
            data.currentLevel = level;
            await mathFunctions.getExercise();
            return true;
        }
        return false;
    },

    // Fonction qui met à jour l'aspect visuel de notre composant
    updateView: (event) => {
        let target = event.target;
        target.parentElement.childNodes.forEach(element => {
            element.style.backgroundColor = "";
        });
        event.target.style.backgroundColor = "#f1f1f1";
    },

    // Fonction qui permet de récupérer la solution de l'exercice et de la comparer à la réponse de l'utilisateur
    getSolution: async (currentExercise = undefined, currentAnswer = undefined) => {
        //console.log(exercise, answer);
        //console.log(data.currentExercise, document.getElementById("value").value);
        let result = undefined;
        await axios.post("http://localhost:4000/api/exercise/getSolution", JSON.stringify({
            exercise: currentExercise !== undefined ? currentExercise : data.currentExercise,
            answer: currentAnswer !== undefined ? currentAnswer : document.getElementById("value").value
        }), {
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            result = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return result.isCorrect;
    },

    getExercises: async (amount, type, niveau) => {
        let result = undefined;
        await axios.post("http://localhost:4000/api/exercise/getExercises", JSON.stringify({
            type: type,
            amount: amount,
            currentLevel: niveau
        }), {
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            result = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return result.exercises;
    },
        
}
