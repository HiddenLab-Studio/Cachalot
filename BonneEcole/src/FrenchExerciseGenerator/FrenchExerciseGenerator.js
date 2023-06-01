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


//On demande au serveur un nouveau calcul et on l'affiche sur la page HTML
function getNewExerciseAndDisplay() {
    //Demande au serveur un nouvel exercice
    fetch('/api/getNewFrenchExercise', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())//On récupère la réponse du serveur et on la convertit en JSON
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            // Gérer les erreurs de requête
            console.error('Une erreur s\'est produite:', error);
        });

}

getNewExerciseAndDisplay();
