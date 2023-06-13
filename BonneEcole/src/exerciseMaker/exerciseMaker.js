//Au chargement de la page, on va générer tous les éléments nécessaires à la création d'un exercice

//Objet qui va contenir toutes les informations de l'exercice
var exerciseObjectClient = {
    type: undefined,
    title:undefined,
    question: undefined,
    answer: undefined,
    answer1: undefined,
    answer2: undefined,
    answer3: undefined,
    answer4: undefined,
    answer5: undefined,
    QCMCorrectAnswer: []
}



//D'abord un input pour le titre de l'exercice
var titleInput = document.createElement("input");
titleInput.setAttribute("type", "text");
titleInput.setAttribute("id", "titleInput");
titleInput.setAttribute("placeholder", "Titre de l'exercice");
document.getElementById("exerciseDiv").appendChild(titleInput);

//Ensuite un input pour la consigne de l'exercice
var consigneInput = document.createElement("input");
consigneInput.setAttribute("type", "text");
consigneInput.setAttribute("id", "consigneInput");
consigneInput.setAttribute("placeholder", "Consigne de l'exercice");
document.getElementById("exerciseDiv").appendChild(consigneInput);

var divExerciseTypeChoice = document.createElement("div");
divExerciseTypeChoice.setAttribute("id", "divExerciseTypeChoice");
document.getElementById("exerciseDiv").appendChild(divExerciseTypeChoice);

//Ensuite on va créer un bouton pour chaque type d'exercice
var buttonTypeINPUT = document.createElement("button");
buttonTypeINPUT.setAttribute("id", "buttonTypeINPUT");
buttonTypeINPUT.setAttribute("class", "buttonExerciseType");
buttonTypeINPUT.innerHTML = "INPUT";
document.getElementById("divExerciseTypeChoice").appendChild(buttonTypeINPUT);

var buttonTypeQCM = document.createElement("button");
buttonTypeQCM.setAttribute("id", "buttonTypeQCM");
buttonTypeQCM.setAttribute("class", "buttonExerciseType");
buttonTypeQCM.innerHTML = "QCM";
document.getElementById("divExerciseTypeChoice").appendChild(buttonTypeQCM);





//Listener sur le bouton INPUT
//On va ici générer tous les éléments nécessaires à la création d'un exercice de type INPUT
document.getElementById("buttonTypeINPUT").addEventListener("click", function () {

    //On va d'abord supprimer tous les éléments de l'exercice de type QCM (s'il y en a)
    for (let i = 1; i <= 4; i++) {
        if (document.getElementById("divAnswer" + i) != null) {
            document.getElementById("divAnswer" + i).remove();
        }
    }

    if (document.getElementById("buttonValidate") != null) {
        document.getElementById("buttonValidate").remove();
    }


    //Si l'input de réponse n'existe pas déjà, on le créer
    if (document.getElementById("answerInput") == null) {
        //On créer l'input de la réponse.
        let answerInput = document.createElement("input");
        answerInput.setAttribute("type", "text");
        answerInput.setAttribute("id", "answerInput");
        answerInput.setAttribute("placeholder", "Réponse");
        document.getElementById("exerciseDiv").appendChild(answerInput);
    }


    //Génération du bouton valider
    let buttonValidate = document.createElement("button");
    buttonValidate.setAttribute("id", "buttonValidate");
    buttonValidate.innerHTML = "Valider";
    document.getElementById("exerciseDiv").appendChild(buttonValidate);


    //Listener sur le bouton valider -> création de l'exercice INPUT
    document.getElementById("buttonValidate").addEventListener("click", function () {
            
            //On récupère les valeurs des inputs et on les met dans l'objet
            exerciseObjectClient.type = "INPUT";
            exerciseObjectClient.title = document.getElementById("titleInput").value;
            exerciseObjectClient.question = document.getElementById("consigneInput").value;
            exerciseObjectClient.answer = document.getElementById("answerInput").value;

            console.log(exerciseObjectClient);

    });

});



//Listener sur le bouton QCM
//On va ici générer tous les éléments nécessaires à la création d'un exercice de type QCM
document.getElementById("buttonTypeQCM").addEventListener("click", function () {
    //On va d'abord supprimer les éléments de l'exercice de type INPUT (s'il y en a)
    if (document.getElementById("answerInput") != null) {
        document.getElementById("answerInput").remove();
    }

    if (document.getElementById("buttonValidate") != null) {
        document.getElementById("buttonValidate").remove();
    }

    //On créer ensuite les différents inputs de réponse. Ils vont chacun être dans un div.
    //4 réponses de base
    //On vérifie que les divs de réponses n'existent pas déjà (en vérifiant que le premier div existe ou non)

    //On créer une div contenant les réponses
    let divAnswerContainer = document.createElement("div");
    divAnswerContainer.setAttribute("id", "divAnswerContainer");
    document.getElementById("exerciseDiv").appendChild(divAnswerContainer);


    if (document.getElementById("divAnswer1") == null) {
        for (let i = 1; i <= 4; i++) {
            //Div pour chaque réponse
            let divAnswer = document.createElement("div");
            divAnswer.setAttribute("id", "divAnswer" + i);
            document.getElementById("divAnswerContainer").appendChild(divAnswer);

            //Input pour chaque réponse -> pour écrire chaque réponse
            let answerInputQCM = document.createElement("input");
            answerInputQCM.setAttribute("type", "text");
            answerInputQCM.setAttribute("id", "answerInputQCM" + i);
            answerInputQCM.setAttribute("placeholder", "Réponse " + i);
            document.getElementById("divAnswer" + i).appendChild(answerInputQCM);

            //Checkbox pour chaque réponse -> pour indiquer si la réponse est correcte ou non
            let answerCheckbox = document.createElement("input");
            answerCheckbox.setAttribute("type", "checkbox");
            answerCheckbox.setAttribute("id", "answerCheckbox" + i);
            document.getElementById("divAnswer" + i).appendChild(answerCheckbox);
        }
    }


    //Gestion de l'ajout / suppression de réponses

    let buttonAddAnswer = document.createElement("button");
    buttonAddAnswer.setAttribute("id", "buttonAddAnswer");
    buttonAddAnswer.innerHTML = "Ajouter une réponse";
    document.getElementById("exerciseDiv").appendChild(buttonAddAnswer);

    buttonAddAnswer.addEventListener("click", function () {
        //On vérifie que le nombre de réponses n'est pas supérieur à 5
        if (document.getElementById("divAnswer5") == null) {
            //On créer un div pour la nouvelle réponse
            let divAnswer = document.createElement("div");

            //On regarde le nombre de divs de réponses pour donner un id au nouveau div
            let divAnswerNumber = document.querySelectorAll('#divAnswerContainer div').length + 1;
            divAnswer.setAttribute("id", "divAnswer" + divAnswerNumber);

            //On ajoute le div à l'exercice au dessus du bouton "Ajouter une réponse"
            document.getElementById("divAnswerContainer").appendChild(divAnswer);

            //Dans cette div, va créer notre input pour la réponse et la checkbox
            answerInputQCM = document.createElement("input");
            answerInputQCM.setAttribute("type", "text");
            answerInputQCM.setAttribute("id", "answerInputQCM" + divAnswerNumber);
            answerInputQCM.setAttribute("placeholder", "Réponse " + divAnswerNumber);
            document.getElementById("divAnswer" + divAnswerNumber).appendChild(answerInputQCM);

            answerCheckbox = document.createElement("input");
            answerCheckbox.setAttribute("type", "checkbox");
            answerCheckbox.setAttribute("id", "answerCheckbox" + divAnswerNumber);
            document.getElementById("divAnswer" + divAnswerNumber).appendChild(answerCheckbox);

        }
    });


    //A rework pour pouvoir delete la réponse que je veux et pas forcément la dernière (si j'ai le temps)
    let buttonRemoveAnswer = document.createElement("button");
    buttonRemoveAnswer.setAttribute("id", "buttonRemoveAnswer");
    buttonRemoveAnswer.innerHTML = "Supprimer une réponse";
    document.getElementById("exerciseDiv").appendChild(buttonRemoveAnswer);

    buttonRemoveAnswer.addEventListener("click", function () {
        //On vérifie que le nombre de réponses n'est pas inférieur à 2
        if (document.getElementById("divAnswer3") != null) {
            //On regarde le nombre de divs de réponses pour supprimer le dernier div
            let divAnswerNumber = document.querySelectorAll('#divAnswerContainer div').length;
            document.getElementById("divAnswer" + divAnswerNumber).remove();
            console.log(document.querySelectorAll('#divAnswerContainer div'));
            console.log(divAnswerNumber);
        }
    });








    //Génération du bouton valider
    let buttonValidate = document.createElement("button");
    buttonValidate.setAttribute("id", "buttonValidate");
    buttonValidate.innerHTML = "Valider";
    document.getElementById("exerciseDiv").appendChild(buttonValidate);

    //Listener sur le bouton valider -> création de l'exercice
    console.log(exerciseObjectClient);

    //Listener sur le bouton valider -> création de l'exercice QCM
    document.getElementById("buttonValidate").addEventListener("click", function () {
            
        //On récupère les valeurs des inputs et on les met dans l'objet
        exerciseObjectClient.type = "QCM";
        exerciseObjectClient.title = document.getElementById("titleInput").value;
        exerciseObjectClient.question = document.getElementById("consigneInput").value;
        
        //on vérifie que l'élément existe en HTML avant de le récupérer
        if(document.getElementById("answerInputQCM1") != null){
            exerciseObjectClient.answer1 = document.getElementById("answerInputQCM1").value;
        }
        if(document.getElementById("answerInputQCM2") != null){
            exerciseObjectClient.answer2 = document.getElementById("answerInputQCM2").value;
        }
        if(document.getElementById("answerInputQCM3") != null){
            exerciseObjectClient.answer3 = document.getElementById("answerInputQCM3").value;
        }
        if(document.getElementById("answerInputQCM4") != null){
            exerciseObjectClient.answer4 = document.getElementById("answerInputQCM4").value;
        }
        if(document.getElementById("answerInputQCM5") != null){
            exerciseObjectClient.answer5 = document.getElementById("answerInputQCM5").value;
        }

        //On regarde les cases cochées pour trouver la/les bonne(s) réponse(s)
        //On vérifie que l'élément existe en HTML avant de le récupérer
        exerciseObjectClient.QCMCorrectAnswer = [];//On reset le tableau
        for(let i = 0; i <= 5; i++){
            if(document.getElementById("answerCheckbox" + i) != null){
                if(document.getElementById("answerCheckbox" + i).checked){
                    exerciseObjectClient.QCMCorrectAnswer.push(i);
                }
            }
        }

        console.log(exerciseObjectClient);

});
});



//De base, pas de type d'exercice sélectionné
var currentExerciseType = undefined;

//Systeme de surbrillance du type d'exo sélectionné
// Récupérer tous les boutons
let buttonsExerciseTypeContainer = document.querySelectorAll('#divExerciseTypeChoice button');

// Ajouter un écouteur d'événement pour chaque bouton
buttonsExerciseTypeContainer.forEach(function (button) {
    button.addEventListener('click', function () {
        // Retirer la classe "active" de tous les boutons
        buttonsExerciseTypeContainer.forEach(function (btn) {
            btn.classList.remove('activeLevel');
        });

        // Ajouter la classe "active" au bouton cliqué
        button.classList.add('activeLevel');
    });
});






