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

//Genere un exercice aléatoire de calcul (la fonction est très grande à cause de tous les cas particuliers pour les différents niveaux, j'ai pas trouvé plus optimisé)
function generateRandomExercise(operatorUsed = "all", levelSelected = "all") {
    let firstNumber = generateRandomNumber(1, 51);
    let secondNumber = generateRandomNumber(1, 51);

    if (operatorUsed == "all") {
        operatorUsed = selectRandomOperator(levelSelected);
    }

    switch (operatorUsed) {
        case "addition":
            var operator = "+";
            switch (levelSelected) {
                case "CP":
                    firstNumber = generateRandomNumber(1, 10);
                    secondNumber = generateRandomNumber(1, 10);
                    break;
                case "CE1":
                    firstNumber = generateRandomNumber(1, 20);
                    secondNumber = generateRandomNumber(1, 20);
                    break;
                case "CE2":
                    firstNumber = generateRandomNumber(1, 40);
                    secondNumber = generateRandomNumber(1, 40);
                    break;
                case "CM1":
                    firstNumber = generateRandomNumber(1, 75);
                    secondNumber = generateRandomNumber(1, 75);
                    break;
                case "CM2":
                    firstNumber = generateRandomNumber(1, 150);
                    secondNumber = generateRandomNumber(1, 150);
                    break;
                default:
                    firstNumber = generateRandomNumber(1, 150);
                    secondNumber = generateRandomNumber(1, 150);
                    break;
            }
            break;
        case "soustraction":
            var operator = "-";
            switch (levelSelected) {
                case "CE1":
                    firstNumber = generateRandomNumber(1, 10);
                    secondNumber = generateRandomNumber(1, 10);
                    break;
                case "CE2":
                    firstNumber = generateRandomNumber(1, 40);
                    secondNumber = generateRandomNumber(1, 40);
                    break;
                case "CM1":
                    firstNumber = generateRandomNumber(1, 75);
                    secondNumber = generateRandomNumber(1, 75);
                    break;
                case "CM2":
                    firstNumber = generateRandomNumber(1, 150);
                    secondNumber = generateRandomNumber(1, 150);
                    break;
                default:
                    firstNumber = generateRandomNumber(1, 150);
                    secondNumber = generateRandomNumber(1, 150);
                    break;
            }

            if (secondNumber > firstNumber) {
                let tmp = firstNumber;
                firstNumber = secondNumber;
                secondNumber = tmp;
            }
            break;

        case "multiplication":
            switch (levelSelected) {
                case "CE1":
                    firstNumber = generateRandomNumber(3, 5);
                    secondNumber = generateRandomNumber(1, 10);
                    break;
                case "CE2":
                    firstNumber = generateRandomNumber(3, 10);
                    firstNumber == 10 ? firstNumber = 100 : firstNumber;//On veut permettre de s'exercer sur les multiplications par 100 aussi
                    secondNumber = generateRandomNumber(1, 10);
                    break;
                case "CM1":
                    firstNumber = generateRandomNumber(3, 13);
                    firstNumber == 11 ? firstNumber = 25 : firstNumber;//On veut permettre de s'exercer sur les multiplications par 25 aussi
                    firstNumber == 12 ? firstNumber = 50 : firstNumber;//On veut permettre de s'exercer sur les multiplications par 50 aussi
                    firstNumber == 13 ? firstNumber = 100 : firstNumber;//On veut permettre de s'exercer sur les multiplications par 100 aussi
                    secondNumber = generateRandomNumber(1, 25);
                    break;
                case "CM2":
                    firstNumber = generateRandomNumber(1, 27);
                    firstNumber == 26 ? firstNumber = 50 : firstNumber;//On veut permettre de s'exercer sur les multiplications par 50 aussi
                    firstNumber == 27 ? firstNumber = 100 : firstNumber;//On veut permettre de s'exercer sur les multiplications par 100 aussi
                    secondNumber = generateRandomNumber(1, 50);
                    break;
                default:
                    firstNumber = generateRandomNumber(1, 27);
                    secondNumber = generateRandomNumber(1, 50);
                    break;
            }
            var operator = "*";
            break;
        case "division":

            switch (levelSelected) {
                case "CM1":
                    secondNumber = generateRandomNumber(2, 4);
                    secondNumber == 3 ? firstNumber = 5 : firstNumber;//On veut permettre de s'exercer sur les divisions par 5 aussi
                    secondNumber == 4 ? firstNumber = 10 : firstNumber;//On veut permettre de s'exercer sur les divisions par 10 aussi
                    firstNumber = generateRandomNumber(1, 25) * secondNumber;
                    break;
                case "CM2":
                    secondNumber = generateRandomNumber(1, 12);
                    firstNumber = generateRandomNumber(1, 50) * secondNumber;
                    break;
                default:
                    secondNumber = generateRandomNumber(1, 12);
                    firstNumber = generateRandomNumber(1, 50) * secondNumber;
                    break;
            }
            var operator = "/";
            break;
        default:
            //Version par défaut : permet de protéger d'un crash serveur si le type d'opération n'est pas reconnu
            var operator = generateRandomOperator();
            break;
    }

    return firstNumber + " " + operator + " " + secondNumber;
}



function selectRandomOperator(levelSelected) {
    var operators = ["addition", "soustraction", "multiplication", "division"];
    switch (levelSelected) {
        case "CP":
            return operators[generateRandomNumber(0, 1)];
        case "CE1":
            return operators[generateRandomNumber(0, 2)];
        case "CE2":
            return operators[generateRandomNumber(0, 2)];
        default: //CM1, CM2 et n'importe
            return operators[generateRandomNumber(0, 3)];

    }
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