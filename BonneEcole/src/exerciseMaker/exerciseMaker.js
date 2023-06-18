import { createExercise, uploadImage } from "./firebaseStoreExercise.js";
//Au chargement de la page, on va générer tous les éléments nécessaires à la création d'un exercice
//Objet qui va contenir toutes les informations de l'exercice
var exerciseObjectClient = {
    type: undefined,
    title: undefined,
    imageURL: undefined,
    imageName: undefined,
    question: undefined,
    answer: undefined,
    answerQCMArray: undefined,
    QCMCorrectAnswer: undefined
}

//Au chargement de la page, on vient clear les champs de l'exercice
document.getElementById("titleInput").value = "";
document.getElementById("consigneInput").value = "";


//Listener sur le bouton INPUT
//On va ici générer tous les éléments nécessaires à la création d'un exercice de type INPUT
document.getElementById("buttonTypeINPUT").addEventListener("click", function () {

    removeHighlightFromAll();
    if (document.getElementById("errorDiv") != null) {
        document.getElementById("errorDiv").remove();
    }

    //Si l'utilisateur a crée un exercice de type QCM avant, on supprime les éléments de cet exercice
    if (document.getElementById("divAnswerContainer") != null) {
        document.getElementById("divAnswerContainer").remove();
    }

    //Bouton valider
    if (document.getElementById("buttonValidate") != null) {
        document.getElementById("buttonValidate").remove();
    }

    //Bouton ajouter une réponse
    if (document.getElementById("buttonAddAnswer") != null) {
        document.getElementById("buttonAddAnswer").remove();
    }
    //Bouton supprimer une réponse
    if (document.getElementById("buttonRemoveAnswer") != null) {
        document.getElementById("buttonRemoveAnswer").remove();
    }


    //Si l'input de réponse n'existe pas déjà, on le créé
    if (document.getElementById("answerInput") == null) {
        //On créer l'input de la réponse
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

        if (checkEveryNecessaryField("INPUT") == true) {
            //On récupère les valeurs des inputs et on les met dans l'objet
            resetExercise();
            createExerciseObject("INPUT");

            console.log(exerciseObjectClient);
            sendExerciseToDatabase();
        }


    });

});



//Listener sur le bouton QCM
//On va ici générer tous les éléments nécessaires à la création d'un exercice de type QCM
document.getElementById("buttonTypeQCM").addEventListener("click", function () {

    removeHighlightFromAll();
    if (document.getElementById("errorDiv") != null) {
        document.getElementById("errorDiv").remove();
    }
    //On va d'abord supprimer les éléments de l'exercice de type INPUT (s'il y en a)
    if (document.getElementById("answerInput") != null) {
        document.getElementById("answerInput").remove();
    }
    if (document.getElementById("buttonValidate") != null) {
        document.getElementById("buttonValidate").remove();
    }
    //Suppression des éléments QCM s'ils existent déjà (permet aussi de clear les champs si on est déjà sur QCM et qu'on reclique sur QCM)
    if (document.getElementById("buttonAddAnswer") != null) {
        document.getElementById("buttonAddAnswer").remove();
    }
    if (document.getElementById("buttonRemoveAnswer") != null) {
        document.getElementById("buttonRemoveAnswer").remove();
    }
    if (document.getElementById("divAnswerContainer") != null) {
        document.getElementById("divAnswerContainer").remove();
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
        if (document.querySelectorAll('#divAnswerContainer div').length < 5) {
            //On créer un div pour la nouvelle réponse
            let divAnswer = document.createElement("div");

            //On regarde le nombre de divs de réponses pour donner un id au nouveau div
            let divAnswerNumber = document.querySelectorAll('#divAnswerContainer div').length + 1;
            divAnswer.setAttribute("id", "divAnswer" + divAnswerNumber);

            //On ajoute le div à l'exercice au dessus du bouton "Ajouter une réponse"
            document.getElementById("divAnswerContainer").appendChild(divAnswer);

            //Dans cette div, va créer notre input pour la réponse et la checkbox
            let answerInputQCM = document.createElement("input");
            answerInputQCM.setAttribute("type", "text");
            answerInputQCM.setAttribute("id", "answerInputQCM" + divAnswerNumber);
            answerInputQCM.setAttribute("placeholder", "Réponse " + divAnswerNumber);
            document.getElementById("divAnswer" + divAnswerNumber).appendChild(answerInputQCM);

            let answerCheckbox = document.createElement("input");
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
        if (document.querySelectorAll('#divAnswerContainer div').length > 2) {
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

    //Listener sur le bouton valider -> création de l'exercice QCM
    document.getElementById("buttonValidate").addEventListener("click", function () {

        if (checkEveryNecessaryField("QCM") == true) {
            //On récupère les valeurs des inputs et on les met dans l'objet
            resetExercise();
            createExerciseObject("QCM");

            console.log(exerciseObjectClient);
            sendExerciseToDatabase();

        }


    });
});


function createExerciseObject(exerciseType) {
    exerciseObjectClient.type = exerciseType;
    exerciseObjectClient.title = document.getElementById("titleInput").value;
    exerciseObjectClient.question = document.getElementById("consigneInput").value;
    if (exerciseType == "INPUT") {
        exerciseObjectClient.answer = document.getElementById("answerInput").value;

    }
    else if (exerciseType == "QCM") {
        console.log("QCM");
            //on vérifie que l'élément existe en HTML avant de le récupérer
            exerciseObjectClient.answerQCMArray = [];
            for(let i = 1; i <= 5; i++){
                if(document.getElementById("answerInputQCM" + i) != null){
                    exerciseObjectClient.answerQCMArray[i-1] = document.getElementById("answerInputQCM" + i).value;
                }
            }

        //On regarde les cases cochées pour trouver la/les bonne(s) réponse(s)
        //On vérifie que l'élément existe en HTML avant de le récupérer
        exerciseObjectClient.QCMCorrectAnswer = [];//On reset le tableau
        for (let i = 0; i <= 5; i++) {
            if (document.getElementById("answerCheckbox" + i) != null) {
                if (document.getElementById("answerCheckbox" + i).checked) {
                    exerciseObjectClient.QCMCorrectAnswer.push(i);
                }
            }
        }

    }
}



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


//On vérifie que tous les champs nécessaires sont remplis, et s'ils ne le sont pas, on vient les surligner en leur ajoutant une classe (et grace au css)
function checkEveryNecessaryField(exerciseType) {
    let allFieldsAreFilled = true;
    if (document.getElementById("consigneInput").value == "") {
        document.getElementById("consigneInput").classList.add("missingField");

        allFieldsAreFilled = false;
    }
    else {
        document.getElementById("consigneInput").classList.remove("missingField");
    }
    if (exerciseType == "INPUT") {
        if (document.getElementById("answerInput").value == "") {
            document.getElementById("answerInput").classList.add("missingField");
            allFieldsAreFilled = false;
        }
        else {
            document.getElementById("answerInput").classList.remove("missingField");
        }
    }
    if (exerciseType == "QCM") {
        if (document.getElementById("answerInputQCM1").value == "" && document.getElementById("answerInputQCM2").value == "") {
            if (document.getElementById("answerInputQCM1").value == "") {
                document.getElementById("answerInputQCM1").classList.add("missingField");
            }
            else {
                document.getElementById("answerInputQCM1").classList.remove("missingField");
            }
            if (document.getElementById("answerInputQCM2").value == "") {
                document.getElementById("answerInputQCM2").classList.add("missingField");
            }
            else {
                document.getElementById("answerInputQCM2").classList.remove("missingField");
            }
            allFieldsAreFilled = false;
        }
    }

    if (!allFieldsAreFilled) {
        if (document.getElementById("errorDiv") == null) {
            let errorDiv = document.createElement("div");
            errorDiv.setAttribute("id", "errorDiv");
            document.getElementById("exerciseDiv").appendChild(errorDiv);
            errorDiv.innerHTML = "Veuillez remplir tous les champs nécessaires";
        }
    }
    else {
        if (document.getElementById("errorDiv") != null) {
            document.getElementById("errorDiv").remove();
        }
    }
    return allFieldsAreFilled;
}


function resetExercise() {
    exerciseObjectClient.type = "INPUT";
    exerciseObjectClient.answer = undefined;
    exerciseObjectClient.answerQCMArray = undefined;
    exerciseObjectClient.QCMCorrectAnswer = undefined;
}

function removeHighlightFromAll() {
    //On récupère tous les éléments de la div exerciseDiv
    const elements = document.querySelectorAll('#exerciseDiv *');

    //On retire la classe qui permet de surligner de tous les éléments
    elements.forEach((element) => {
        element.classList.remove("missingField");
    });
}

function sendExerciseToDatabase() {
    createExercise(exerciseObjectClient, imageURL);
}



//Upload d'une image en local
var imageURL = '';//Variable globale qui va contenir l'URL de l'image

//Fonction pour uploader une image en local (pas sur firebase -> se fera après quand il validera son exercice)
function displayImage(input) {
    const previewImage = document.getElementById('previewImage');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewImage.setAttribute('src', e.target.result);
            previewImage.style.display = 'block';

            // Stocker l'URL de l'image dans la variable globale
            exerciseObjectClient.imageURL = e.target.result;
            exerciseObjectClient.imageLink = generateRandomHash();
            imageURL = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}


const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';

uploadBtn.addEventListener('click', function () {
    fileInput.click();

});

fileInput.addEventListener('change', function () {
    displayImage(this);
});

// Générer un hash aléatoire (NE SURTOUT PAS METTRE EN ASYNC SINON JE PEUX PAS L'UTILISER DANS LE CREATE EXERCISE pcq jsp pq mon await passe pas) -> a supprimer pour remplacer par un simple lien dans la bdd
function generateRandomHash() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);

    // Convertir les valeurs en une représentation hexadécimale
    const hashArray = Array.from(array)
        .map(byte => byte.toString(16).padStart(2, '0'));

    // Concaténer les octets pour obtenir le hash final
    const hash = hashArray.join('');

    return hash;
}