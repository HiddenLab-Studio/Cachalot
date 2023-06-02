import axios from "axios";

export let data = {
    validExerciseType: ["addition", "soustraction", "multiplication", "division", "all"], //Tableau contenant les types d'exercices valides
    validClassType: ["CP", "CE1", "CE2", "CM1", "CM2", "all"],                            //Tableau contenant les niveaux valides
    currentExercise: undefined,                                                           //Variable qui contient l'exercice actuel
    currentExerciseType: "all",                                                           //Variable qui contient le type d'exercice actuel
    currentLevel: "all",                                                                  //Variable qui contient le niveau actuel (classe)
}

export const mathFunctions = {
    init: async () => {
        await mathFunctions.getExercise().then(() =>
            console.info("Initialization of an exercise...")
        );
    },

    getExercise: async () => {
        await axios.post("http://localhost:4000/api/getExercise", JSON.stringify(data), {
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

    selectExerciseType: async (type) => {
        if (data.validExerciseType.includes(type)) {
            data.currentExerciseType = type
            await mathFunctions.getExercise();
            return true;
        }
        return false;
    },

    selectClassType: async (level) => {
        if (data.validClassType.includes(level)) {
            data.currentLevel = level;
            await mathFunctions.getExercise();
            return true;
        }
        return false;
    },

    updateView: (event) => {
        event.target.parentElement.childNodes.forEach(element => {
            element.style.backgroundColor = "";
        });
        event.target.style.backgroundColor = "grey";
    },

    getSolution: async () => {
        let result = undefined;
        await axios.post("http://localhost:4000/api/getSolution", JSON.stringify({
            exercise: data.currentExercise,
            answer: document.getElementById("value").value
        }), {
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            //console.log(response.data);
            result = response.data;
        }).catch((error) => {
            console.log(error);
        });

        console.log(result);
        if(result.isCorrect){
            await mathFunctions.getExercise();
            document.getElementById("value").value = "";
        } else {
            document.getElementById("result").textContent = "Faux !";
            document.getElementById("value").value = "";
        }

        return result.isCorrect;

    }

}
