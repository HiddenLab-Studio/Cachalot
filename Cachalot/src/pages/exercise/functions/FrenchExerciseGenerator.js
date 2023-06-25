import axios from "axios";

export let data = {
    validClassType: ["CP", "CE1", "CE2", "CM1", "CM2"],
    currentClass: undefined,
    currentExercise: undefined,
    exerciseType: "french",
}

export const frenchFunctions = {
    selectClass: async (level) => {
        if (data.validClassType.includes(level)) {
            data.currentLevel = level;
            await frenchFunctions.generateExercise();
            return true;
        }
        return false;
    },


    generateExercise: async() => {
        await axios.post("http://localhost:4000/api/exercise/getExercise", JSON.stringify(data), {
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            data.currentExercise = undefined;
            data.currentExercise = response.data.exercise;
            console.log(data.currentExercise)
            return response;
        }).catch((error) => {
            console.log(error);
        });
    },

    getSolution: async (exercise = undefined, answer, type) => {
        console.log(exercise, answer, type);
        if(answer === null) return false;
        console.log(exercise, answer, type);
        let currentExercise = exercise !== undefined ? exercise : data.currentExercise;
        let result = undefined;
        await axios.post("http://localhost:4000/api/exercise/getSolution", JSON.stringify({
            exercise: currentExercise,
            answer: answer
        }), {
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            result = response.data;
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
        return result.isCorrect;
    }

}