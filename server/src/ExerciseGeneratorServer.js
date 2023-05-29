//Partie serveur de la génération d'exercice de calcul aléatoire, on retrouve ici les fonctions qui permettent de générer un exercice aléatoire et de vérifier la solution

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
    let firstNumber = generateRandomNumber(1, 51);
    let secondNumber = generateRandomNumber(1, 51);

    if(operatorUsed == "all"){
        operatorUsed = selectRandomOperator();
    }


    switch (operatorUsed) {
        case "addition":
            var operator = "+";
            break;
        case "soustraction":
            var operator = "-";
            break;
        case "multiplication":
            firstNumber = generateRandomNumber(2, 10);
            secondNumber = generateRandomNumber(2, 10);
            var operator = "*";
            break;
        case "division":
            firstNumber = generateRandomNumber(0, 50);
            secondNumber = generateRandomNumber(1, 10);
            var operator = "/";
            break;
        default:
            //Version par défaut : permet de protéger d'un crash serveur si le type d'opération n'est pas reconnu
            var operator = generateRandomOperator();
            break;
    }

    return firstNumber + " " + operator + " " + secondNumber;
}

function selectRandomOperator() {
    var operators = ["addition", "soustraction", "multiplication", "division"];
    return operators[generateRandomNumber(0, 3)];
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


//Récupération de l'entrée utilisateur et vérification de la solution
function getUserInputAndCheckSolution(answer, exercise) {
    var solution = findSolution(exercise);
    if (checkSolution(solution, answer)) {
        //Bonne réponse
        return true;
    }
    else {
        //Mauvaise réponse
        return false;
    }
}


module.exports = {
    generateRandomExercise,
    getUserInputAndCheckSolution
};