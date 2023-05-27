
//JE VAIS LE DEPLACER DANS UN AUTRE FICHIER DANS LE DOSSIER SERVER
//Genere une valeur aléatoire entre min et max
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Genere un opérateur aléatoire
function generateRandomOperator() {
    var operators = ["+", "-", "*", "/"];
    return operators[generateRandomNumber(0, 3)];
}

//Genere un exercice aléatoire de calcul
function generateRandomExercise(operatorUsed = "all") {
    var firstNumber = generateRandomNumber(0, 10);
    var secondNumber = generateRandomNumber(0, 10);

    if (operatorUsed == "all") {
        var operator = generateRandomOperator();
    } else {
        var operator = operatorUsed;
    }
    return firstNumber + " " + operator + " " + secondNumber;
}

//On vient calculer la solution de l'exercice
function findSolution(exercise) {
    return eval(exercise);//eval prend en paramètre une chaîne de caractères et l'exécute comme du code JavaScript, attention à la sécurité -> Ne pas utiliser avec des données provenant de l'utilisateur
}

//On vient prendre la solution de l'exercice et on défini un arrondi acceptable pour la réponse utilisateur (2 chiffres après la virgule)
function AllowedSolution(solution) {
    return Math.round(solution * 100) / 100;
}

//On vient comparer la solution de l'exercice avec la réponse de l'utilisateur
function checkSolution(solution, userSolution) {
    if (solution == userSolution || AllowedSolution(solution) == AllowedSolution(userSolution)) {
        return true;
    }
    else {
        return false;
    }
}


module.exports = {
    generateRandomExercise
};