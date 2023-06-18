import { getExercise, getSolution } from "./firebase-getExo.js";


var exerciseId = "ucq4w8LgKoiJm5T64HXh"; //Id de l'exercice à récupérer
var QCMAnswer = [];
var currentExerciseType = "";

document.getElementById("exerciseCodeInput").value = ""

document.getElementById("loadExercise").addEventListener("click", function () {
    exerciseId = document.getElementById("exerciseCodeInput").value;
    loadExerciseFromCode(exerciseId);
});

function loadExerciseFromCode(code) {
    exerciseId = document.getElementById("exerciseCodeInput").value;
    resetPlayer();
    //On récupère l'exercice depuis la base de données et on l'affiche
    getExercise(code).then((exercise) => {
        currentExerciseType = exercise.type;
        displayExercise(exercise);
    });
}

//Affiche l'exercice sur la page
function displayExercise(exercise) {
    //On affiche d'abord la partie commune aux deux types d'exercices
    document.getElementById("exerciseTitle").innerHTML = exercise.title;
    document.getElementById("exerciseQuestion").innerHTML = exercise.question;
    if (exercise.imageLink != undefined) {
        document.getElementById("exerciseImage").src = exercise.imageLink;
    }

    if (exercise.type == "INPUT") {
        displayInputExercise(exercise);
    }
    else if (exercise.type == "QCM") {
        displayQCMExercise(exercise);
    }
    else {
        console.log("Type d'exercice non reconnu");
    }
}

//Affiche un exercice de type INPUT
function displayInputExercise(exercise) {

    //On créer un input pour que l'utilisateur entre sa réponse
    let input = document.createElement("input");
    input.type = "text";
    input.id = "userAnswer";
    input.placeholder = "Entrez votre réponse ici";
    input.onfocus = function () { this.value = ''; };
    document.getElementById("result").insertAdjacentElement("beforebegin", input);

    //Bouton valider
    let buttonValidate = document.createElement("button");
    buttonValidate.innerHTML = "Valider";
    document.getElementById("result").insertAdjacentElement("beforebegin", buttonValidate);
    buttonValidate.addEventListener("click", function () {
        sendAnswerAndGetSolution(exercise);
    });
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            sendAnswerAndGetSolution(exercise)
        }
    });

}

//Affiche un exercice de type QCM
function displayQCMExercise(exercise) {
    const answers = [
        { answer: exercise.answerQCMArray[0], id: "answer1", index: 1 },
        { answer: exercise.answerQCMArray[1], id: "answer2", index: 2 },
        { answer: exercise.answerQCMArray[2], id: "answer3", index: 3 },
        { answer: exercise.answerQCMArray[3], id: "answer4", index: 4 },
        { answer: exercise.answerQCMArray[4], id: "answer5", index: 5 }
    ];

    for (let i = 0; i < answers.length; i++) {
        if (answers[i].answer !== undefined) {
            const divAnswer = document.createElement("div");
            divAnswer.innerHTML = answers[i].answer;
            divAnswer.id = answers[i].id;
            divAnswer.className = "QCManswer";
            document.getElementById("result").insertAdjacentElement("beforebegin", divAnswer);
            divAnswer.addEventListener("click", function () {
                addChoiceToQCMAnswer(answers[i].index);
                if (divAnswer.classList.contains("QCManswerSelected")) {
                    divAnswer.classList.remove("QCManswerSelected");
                }
                else {
                    divAnswer.classList.add("QCManswerSelected");
                }
            });
        }

    }

    //Bouton valider
    let buttonValidate = document.createElement("button");
    buttonValidate.innerHTML = "Valider";
    document.getElementById("result").insertAdjacentElement("beforebegin", buttonValidate);
    buttonValidate.addEventListener("click", function () {
        sendAnswerAndGetSolution(exercise);
    });

}

function resetPlayer() {
    QCMAnswer = [];
    currentExerciseType = "";
    document.getElementById("exerciseTitle").innerHTML = "";
    document.getElementById("exerciseQuestion").innerHTML = "";
    document.getElementById("exerciseImage").src = "";
    document.getElementById("userAnswer") != undefined ? document.getElementById("userAnswer").remove() : null;
    document.getElementById("result").innerHTML = "";
    for (let i = 1; i <= 5; i++) {
        document.getElementById("answer" + i) != undefined ? document.getElementById("answer" + i).remove() : null;
    }
}


function addChoiceToQCMAnswer(index) {
    if (QCMAnswer.includes(index)) {
        QCMAnswer.splice(QCMAnswer.indexOf(index), 1);
    }
    else {
        QCMAnswer.push(index);
    }
    //On trie le tableau pour que les réponses soient dans l'ordre croissant
    QCMAnswer.sort(function (a, b) { return a - b });
}


function sendAnswerAndGetSolution(exercise) {
    // Client-side
    getSolution(exerciseId).then((solution) => {
        let isCorrect = false;
        if (exercise.type == "INPUT") {
            let answer = document.getElementById("userAnswer").value;
            isCorrect = compareAnswer(answer, solution);
        }
        if (exercise.type == "QCM") {
            let answer = QCMAnswer;
            isCorrect = compareArrays(answer, solution);
        }
        if (isCorrect) {
            document.getElementById("result").innerHTML = "Bonne réponse";
        }
        else {
            document.getElementById("result").innerHTML = "Mauvaise réponse";
        }
    });

}


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
