//Partie client de la génération d'exercice de calcul aléatoire, on utilise le serveur pour générer les exercices et vérifier les réponses


var currentExercise = undefined;//Variable qui contient l'exercice actuel
var currentExerciseType = "all";//Variable qui contient le type d'exercice actuel (addition, soustraction, multiplication, division ou tout type d'opération)
var currentLevel = "all";//Variable qui contient le niveau actuel (CP, CE1, CE2, CM1, CM2 ou tout niveau)


//Lorsqu'on valide la réponse, on vient récupérer la valeur de l'input et on vérifie la solution
//On peut soit cliquer sur le bouton valider
document.getElementById("ConfirmAnswerBtn").addEventListener("click", function () {
    getSolution(currentExercise)
});
//Soit appuyer sur la touche entrée
document.getElementById("valeurInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getSolution(currentExercise)
    }
});


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

//Systeme de surbrillance du bouton d'opération sélectionné
// Récupérer tous les boutons
let buttonsExerciseTypeContainer = document.querySelectorAll('.selectExerciseTypeDiv button');

// Ajouter un écouteur d'événement pour chaque bouton
buttonsExerciseTypeContainer.forEach(function (button) {
    button.addEventListener('click', function () {
        // Retirer la classe "active" de tous les boutons
        buttonsExerciseTypeContainer.forEach(function (btn) {
            btn.classList.remove('activeExerciseType');
        });

        // Ajouter la classe "active" au bouton cliqué
        button.classList.add('activeExerciseType');
    });
});





//Ajout des listeners sur chacun des boutons d'opérateurs
document.getElementById("selectAddition").addEventListener("click", function () {
    currentExerciseType = "addition";
    getNewExerciseAndDisplay();
});
document.getElementById("selectSoustraction").addEventListener("click", function () {
    currentExerciseType = "soustraction";
    getNewExerciseAndDisplay();
});
document.getElementById("selectMultiplication").addEventListener("click", function () {
    currentExerciseType = "multiplication";
    getNewExerciseAndDisplay();
});
document.getElementById("selectDivision").addEventListener("click", function () {
    currentExerciseType = "division";
    getNewExerciseAndDisplay();
});
document.getElementById("selectNimporte").addEventListener("click", function () {
    currentExerciseType = "all";
    getNewExerciseAndDisplay();
});



//Ajout des listeners sur chacun des boutons de niveau
document.getElementById("selectCP").addEventListener("click", function () {
    currentLevel = "CP";
    hideOrShowOperation(true, false, false, false, false);
});
document.getElementById("selectCE1").addEventListener("click", function () {
    currentLevel = "CE1";
    hideOrShowOperation(true, true, true, false, true);
});
document.getElementById("selectCE2").addEventListener("click", function () {
    currentLevel = "CE2";
    hideOrShowOperation(true, true, true, false, true);
});
document.getElementById("selectCM1").addEventListener("click", function () {
    currentLevel = "CM1";
    hideOrShowOperation(true, true, true, true, true);
});
document.getElementById("selectCM2").addEventListener("click", function () {
    currentLevel = "CM2";
    hideOrShowOperation(true, true, true, true, true);
});
document.getElementById("selectLevelNimporte").addEventListener("click", function () {
    currentLevel = "all";
    hideOrShowOperation(true, true, true, true, true);
});


//Fonction qui permet de cacher ou d'afficher les boutons d'opérations en fonction du niveau sélectionné
//True = afficher, false = cacher
function hideOrShowOperation(boolAddition, boolSoustraction, boolMultiplication, boolDivision, boolNimporte) {
    let addition = document.getElementById("selectAddition");
    let soustraction = document.getElementById("selectSoustraction");
    let multiplication = document.getElementById("selectMultiplication");
    let division = document.getElementById("selectDivision");
    let nimporte = document.getElementById("selectNimporte");

    if (boolAddition) {
        addition.style.display = "inline-block";
    }
    else {
        addition.style.display = "none";
    }

    if (boolSoustraction) {
        soustraction.style.display = "inline-block";
    }
    else {
        soustraction.style.display = "none";
    }

    if (boolMultiplication) {
        multiplication.style.display = "inline-block";
    }
    else {
        multiplication.style.display = "none";
    }

    if (boolDivision) {
        division.style.display = "inline-block";
    }
    else {
        division.style.display = "none";
    }

    if (boolNimporte) {
        nimporte.style.display = "inline-block";
    }
    else {
        nimporte.style.display = "none";
    }
}




//On demande au serveur un nouveau calcul et on l'affiche sur la page HTML
function getNewExerciseAndDisplay() {
    //Demande au serveur un nouvel exercice

    fetch('/api/getNewExercise', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentExerciseType, currentLevel })
    })
        .then(response => response.json())//On récupère la réponse du serveur et on la convertit en JSON
        .then(data => {
            //Récupération des données et affichage sur la page si la requête est réussie
            let newExercise = data.exercise;
            currentExercise = newExercise;

            //Afichage de l'opération sur la page HTML
            document.getElementById("exercise").innerHTML = newExercise;
        })
        .catch(error => {
            // Gérer les erreurs de requête
            console.error('Une erreur s\'est produite:', error);
        });

}

function displayResult(isCorrect) {
    if (isCorrect) {
        document.getElementById("result").innerHTML = "Bonne réponse";

        //Ensuite, vu qu'on a fini l'exercice (on a eu bon), on génère un bouton pour passer à l'exercice suivant
        let nextExerciseBtn = document.createElement("button");
        nextExerciseBtn.innerHTML = "Nouvel exercice";
        nextExerciseBtn.id = "nouvelExerciceBtn";
        document.getElementById("result").appendChild(nextExerciseBtn);

        //Lorsqu'on clique sur le bouton "Nouvel exercice", on vient générer un nouvel exercice et on efface la valeur dans l'input
        nextExerciseBtn.addEventListener("click", function () {
            document.getElementById("valeurInput").value = "";
            getNewExerciseAndDisplay()
            document.getElementById("result").innerHTML = "";
            nextExerciseBtn.remove();//Suppression du bouton "Nouvel exercice"
        });
    }
    else {
        document.getElementById("result").innerHTML = "Mauvaise réponse";
    }
}


function getSolution(currentExercise) {
    // Client-side
    let answer = document.getElementById("valeurInput").value;
    fetch('/api/getSolution', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentExercise, answer })
    })
        .then(response => response.json())//On récupère la réponse du serveur et on la convertit en JSON
        .then(data => {
            displayResult(data.isCorrect);
        })
        .catch(error => {
            // Gérer les erreurs de requête
            console.error('Une erreur s\'est produite:', error);
        });
}

getNewExerciseAndDisplay();//Initialisation de la page avec un exercice