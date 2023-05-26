


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


let exercise = generateRandomExercise();
console.log(exercise);

function findSolution(exercise) {
    return eval(exercise);//eval prend en paramètre une chaîne de caractères et l'exécute comme du code JavaScript, attention à la sécurité -> Ne pas utiliser avec des données provenant de l'utilisateur
}

//On vient prendre la solution de l'exercice et on défini un arrondi acceptable pour la réponse utilisateur (2 chiffres après la virgule)
function AllowedSolution(solution) {
    return Math.round(solution * 100) / 100;
}

function checkSolution(solution, userSolution) {
    if (solution == userSolution || AllowedSolution(solution) == AllowedSolution(userSolution)) {
        return true;
    }
    else {
        return false;
    }
}

console.log('Solution :');
console.log(findSolution(exercise));

//Afichage de l'opération sur la page HTML
console.log(document.getElementById("exercise"));
document.getElementById("exercise").innerHTML = exercise;

/*Récupération de l'entrée utilisateur
function getUserInput() {
    var valeur = document.getElementById("valeurInput").value;
    console.log("La valeur saisie est : " + valeur);
  }
*/

  //Récupération de l'entrée utilisateur et vérification de la solution
function getUserInputAndCheckSolution() {
    var valeur = document.getElementById("valeurInput").value;
    console.log("La valeur saisie est : " + valeur);
    var solution = findSolution(exercise);
    if (checkSolution(solution, valeur)) {
        //On génère un encadré sur l'écran pour indiquer si la réponse est bonne ou mauvaise
        document.getElementById("result").innerHTML = "Bonne réponse";
        console.log("Bonne réponse");
    }
    else {
        document.getElementById("result").innerHTML = "Mauvaise réponse";
        console.log("Mauvaise réponse");
    }
}
  
