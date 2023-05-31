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


