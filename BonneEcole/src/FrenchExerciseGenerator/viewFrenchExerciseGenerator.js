

//PARTIE AMELIORATION DE LA QUALITÉ DE L'UTILISATION

//Génération de toute la partie HTML de l'exercice 

//Div contenant l'ensemble de l'exercice et de la réponse
var exerciseAndAnswerDiv = document.createElement("div");
exerciseAndAnswerDiv.id = "exerciseAndAnswerDiv";
document.getElementsByTagName("body")[0].appendChild(exerciseAndAnswerDiv);

//Div contenant le texte de la question
var exerciseQuestionDiv = document.createElement("div");
exerciseQuestionDiv.id = "exerciseQuestion";
document.getElementById("exerciseAndAnswerDiv").appendChild(exerciseQuestionDiv);

//Div contenant le texte de la phrase
var exerciseSentenceDiv = document.createElement("div");
exerciseSentenceDiv.id = "exerciseSentence";
document.getElementById("exerciseAndAnswerDiv").appendChild(exerciseSentenceDiv);

//Encadré de réponse de l'utilisateur
var inputAnswer = document.createElement("input");
inputAnswer.type = "text";
inputAnswer.id = "valeurInput";
inputAnswer.placeholder = "Réponse";
inputAnswer.onfocus = function () {
    this.value = '';
}
document.getElementById("exerciseAndAnswerDiv").appendChild(inputAnswer);

//Bouton de validation de la réponse
var ConfirmAnswerBtn = document.createElement("button");
ConfirmAnswerBtn.innerHTML = "Valider";
ConfirmAnswerBtn.id = "ConfirmAnswerBtn";
document.getElementById("exerciseAndAnswerDiv").appendChild(ConfirmAnswerBtn);

var divQCM = document.createElement("div");
divQCM.id = "divQCM";
document.getElementById("exerciseAndAnswerDiv").appendChild(divQCM);


var answer1Btn = document.createElement("button");
answer1Btn.innerHTML = "Réponse 1";
answer1Btn.id = "answer1Btn";
document.getElementById("divQCM").appendChild(answer1Btn);

answer1Btn.addEventListener("click", function () {
    document.getElementById("valeurInput").value = answer1Btn.innerHTML;
    getSolution(currentExerciseId);
});


var answer2Btn = document.createElement("button");
answer2Btn.innerHTML = "Réponse 2";
answer2Btn.id = "answer2Btn";
document.getElementById("divQCM").appendChild(answer2Btn);

answer2Btn.addEventListener("click", function () {
    document.getElementById("valeurInput").value = answer2Btn.innerHTML;
    getSolution(currentExerciseId);
});

var answer3Btn = document.createElement("button");
answer3Btn.innerHTML = "Réponse 3";
answer3Btn.id = "answer3Btn";
document.getElementById("divQCM").appendChild(answer3Btn);

answer3Btn.addEventListener("click", function () {
    document.getElementById("valeurInput").value = answer3Btn.innerHTML;
    getSolution(currentExerciseId);
});


//Div d'affichage de résultat et où apparait le bouton "Nouvel exercice"
var resultDiv = document.createElement("div");
resultDiv.id = "result";
document.getElementById("exerciseAndAnswerDiv").appendChild(resultDiv);






function modifyExerciseAndAnswerDiv(exerciseType, exerciseQuestion) {
    //Si l'exercice est de type "INPUT", on affiche l'encadré de réponse de l'utilisateur et le bouton de validation
    if (exerciseType == 'INPUT') {
        inputAnswer.style.display = "block";
        ConfirmAnswerBtn.style.display = "block";

        answer1Btn.style.display = "none";
        answer2Btn.style.display = "none";
        answer3Btn.style.display = "none";
    }
    else if (exerciseType == 'QCM2') {
        inputAnswer.style.display = "none";
        ConfirmAnswerBtn.style.display = "none";

        //On affiche les boutons de réponse
        answer1Btn.style.display = "block";
        answer2Btn.style.display = "block";
        answer3Btn.style.display = "none";


        switch (exerciseQuestion) {
            case "Est-ce que ce verbe est à l'infinitif ou au participe passé ?":
                answer1Btn.innerHTML = "Infinitif";
                answer2Btn.innerHTML = "Participe passé";
                break;
            case "Est-ce que cette phrase est affirmative ou négative ?":
                answer1Btn.innerHTML = "Affirmative";
                answer2Btn.innerHTML = "Négative";
                break;
            case "c' ou s' ?":
                answer1Btn.innerHTML = "c'";
                answer2Btn.innerHTML = "s'";
                break;
        }

    }
    else if (exerciseType == 'QCM3') {
        inputAnswer.style.display = "none";
        ConfirmAnswerBtn.style.display = "none";

        //On affiche les boutons de réponse
        answer1Btn.style.display = "block";
        answer2Btn.style.display = "block";
        answer3Btn.style.display = "block";


        switch (exerciseQuestion) {
            case "Quel est le temps de cette phrase ?":
                answer1Btn.innerHTML = "Passé";
                answer2Btn.innerHTML = "Présent";
                answer3Btn.innerHTML = "Futur";
                break;
        }
    }
}







//PARTIE FONCTIONNELLE (à déclarer absolument après la partie HTML pour que les éléments soient bien créés au préalable)

//Systeme de surbrillance du bouton de classe sélectionné
// Récupérer tous les boutons
let buttonsLevelContainer = document.querySelectorAll('.classLevelSelectionDiv button');

// Ajouter un écouteur d'événement pour chaque bouton
buttonsLevelContainer.forEach(function (button) {
    button.addEventListener('click', function () {
        // Retirer la classe "active" de tous les boutons
        buttonsLevelContainer.forEach(function (btn) {
            btn.classList.remove('activeLevel');
        });

        // Ajouter la classe "active" au bouton cliqué
        button.classList.add('activeLevel');
    });
});
