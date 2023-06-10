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


//Ajout des listeners sur chacun des boutons de niveau
document.getElementById("selectCP").addEventListener("click", function () {
    currentLevel = "CP";
    if (currentExerciseType != "addition") {
        currentExerciseType = "addition";
    }
});
document.getElementById("selectCE1").addEventListener("click", function () {
    currentLevel = "CE1";
    if (currentExerciseType == "division") {
        currentExerciseType = "all";
    }
});
document.getElementById("selectCE2").addEventListener("click", function () {
    currentLevel = "CE2";
    if (currentExerciseType == "division") {
        currentExerciseType = "all";
    }
});
document.getElementById("selectCM1").addEventListener("click", function () {
    currentLevel = "CM1";
});
document.getElementById("selectCM2").addEventListener("click", function () {
    currentLevel = "CM2";
});
document.getElementById("selectLevelNimporte").addEventListener("click", function () {
    currentLevel = "all";
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

//Affichage du résultat de la réponse de l'utilisateur
//Pourrait aller dans le viewMathExerciseGenerator.js mais il correspond aussi à une partie fonctionnelle du code
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