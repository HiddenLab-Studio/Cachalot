//Au chargement de la page, on va générer tous les éléments nécessaires à la création d'un exercice


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

    if(document.getElementById("buttonValidate") != null){
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
    buttonValidate.setAttribute("class", "buttonExerciseType");
    buttonValidate.innerHTML = "Valider";
    document.getElementById("exerciseDiv").appendChild(buttonValidate);

});

//Listener sur le bouton QCM
//On va ici générer tous les éléments nécessaires à la création d'un exercice de type QCM
document.getElementById("buttonTypeQCM").addEventListener("click", function () {
    //On va d'abord supprimer les éléments de l'exercice de type INPUT (s'il y en a)
    if (document.getElementById("answerInput") != null) {
        document.getElementById("answerInput").remove();
    }

    if(document.getElementById("buttonValidate") != null){
        document.getElementById("buttonValidate").remove();
    }

    //On créer ensuite les différents inputs de réponse. Ils vont chacun être dans un div.
    //4 réponses de base
    //On vérifie que les divs de réponses n'existent pas déjà (en vérifiant que le premier div existe ou non)
    if (document.getElementById("divAnswer1") == null) {
        for (let i = 1; i <= 4; i++) {
            //Div pour chaque réponse
            let divAnswer = document.createElement("div");
            divAnswer.setAttribute("id", "divAnswer" + i);
            document.getElementById("exerciseDiv").appendChild(divAnswer);

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
    
    //Génération du bouton valider
    let buttonValidate = document.createElement("button");
    buttonValidate.setAttribute("id", "buttonValidate");
    buttonValidate.setAttribute("class", "buttonExerciseType");
    buttonValidate.innerHTML = "Valider";
    document.getElementById("exerciseDiv").appendChild(buttonValidate);
});
