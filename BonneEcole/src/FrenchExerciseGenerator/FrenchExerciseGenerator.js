
var currentExerciseId = undefined;//Variable contenant l'id de l'exercice actuel
var currentLevel = "all";//Variable qui contient le niveau actuel (CP, CE1, CE2, CM1, CM2)


//Lorsqu'on valide la réponse, on vient récupérer la valeur de l'input et on vérifie la solution
//On peut soit cliquer sur le bouton valider
document.getElementById("ConfirmAnswerBtn").addEventListener("click", function () {
    getSolution(currentExerciseId)
});
//Soit appuyer sur la touche entrée
document.getElementById("valeurInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getSolution(currentExerciseId)
    }
});


//Ajout des listeners sur chacun des boutons de niveau
document.getElementById("selectCP").addEventListener("click", function () {
    currentLevel = "CP";
    getNewExerciseAndDisplay();
});
document.getElementById("selectCE1").addEventListener("click", function () {
    currentLevel = "CE1";
    getNewExerciseAndDisplay();
});
document.getElementById("selectCE2").addEventListener("click", function () {
    currentLevel = "CE2";
    getNewExerciseAndDisplay();
});
document.getElementById("selectCM1").addEventListener("click", function () {
    currentLevel = "CM1";
    getNewExerciseAndDisplay();
});
document.getElementById("selectCM2").addEventListener("click", function () {
    currentLevel = "CM2";
    getNewExerciseAndDisplay();
});


//On demande au serveur un nouveau calcul et on l'affiche sur la page HTML
function getNewExerciseAndDisplay() {
    //Demande au serveur un nouvel exercice
    fetch('/api/getNewFrenchExercise', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentLevel })
    })
        .then(response => response.json())//On récupère la réponse du serveur et on la convertit en JSON
        .then(data => {

            currentExerciseId = data.exerciseId;

            //Afichage de l'opération sur la page HTML
            document.getElementById("exerciseQuestion").innerHTML = data.exerciseQuestion;
            if(data.exerciseSentence != undefined){
                document.getElementById("exerciseSentence").innerHTML = data.exerciseSentence;
            }
            else{
                document.getElementById("exerciseSentence").innerHTML = "";
            }
            
        })
        .catch(error => {
            // Gérer les erreurs de requête
            console.error('Une erreur s\'est produite:', error);
        });

}



function getSolution(exerciseId) {
    // Client-side
    let answer = document.getElementById("valeurInput").value;//On récupère la valeur de l'input

    fetch('/api/getSolutionFrench', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ exerciseId, answer })
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


//Affichage du résultat de la réponse de l'utilisateur
//Pourrait aller dans le viewFrenchExerciseGenerator.js mais il correspond aussi à une partie fonctionnelle du code
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


getNewExerciseAndDisplay();
