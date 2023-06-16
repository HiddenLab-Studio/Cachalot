const exerciseId = 0; //Id de l'exercice à récupérer (à faire plus tard quand firebase implémenté)
var QCMAnswer = [];

//Demande au serveur un nouvel exercice
fetch('/api/getUserExercise', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ exerciseId })
})
    .then(response => response.json())//On récupère la réponse du serveur et on la convertit en JSON
    .then(data => {
        //Récupération des données et affichage sur la page si la requête est réussie
        let exercise = data.exercise;

        console.log(exercise);

        displayExercise(exercise);
    })
    .catch(error => {
        // Gérer les erreurs de requête
        console.error('Une erreur s\'est produite:', error);
    });



//Affiche l'exercice sur la page
function displayExercise(exercise) {
    //On affiche d'abord la partie commune aux deux types d'exercices
    document.getElementById("exerciseTitle").innerHTML = exercise.title;
    document.getElementById("exerciseQuestion").innerHTML = exercise.question;


    if (exercise.type == "INPUT") {
        displayInputExercise(exercise);
    }
    else if (exercise.type == "QCM") {
        displayQCMExercise(exercise);
    }
    else {
        console.log("Type d'exercice non reconnu");
    }
}


//Affiche un exercice de type INPUT
function displayInputExercise(exercise) {

    //On créer un input pour que l'utilisateur entre sa réponse
    let input = document.createElement("input");
    input.type = "text";
    input.id = "userAnswer";
    input.placeholder = "Entrez votre réponse ici";
    input.onfocus = function () { this.value = ''; };
    document.getElementById("result").insertAdjacentElement("beforebegin", input);

    //Bouton valider
    let buttonValidate = document.createElement("button");
    buttonValidate.innerHTML = "Valider";
    document.getElementById("result").insertAdjacentElement("beforebegin", buttonValidate);
    buttonValidate.addEventListener("click", function () {
        sendAnswerAndGetSolution(exercise);
    });
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            sendAnswerAndGetSolution(exercise)
        }
    });

}

//Affiche un exercice de type QCM
function displayQCMExercise(exercise) {
    const answers = [
        { answer: exercise.answer1, id: "answer1", index: 1 },
        { answer: exercise.answer2, id: "answer2", index: 2 },
        { answer: exercise.answer3, id: "answer3", index: 3 },
        { answer: exercise.answer4, id: "answer4", index: 4 },
        { answer: exercise.answer5, id: "answer5", index: 5 }
    ];

    for (let i = 0; i < answers.length; i++) {
        if (answers[i].answer !== undefined) {
            console.log(answers[i].answer);
            const divAnswer = document.createElement("div");
            divAnswer.innerHTML = answers[i].answer;
            divAnswer.id = answers[i].id;
            divAnswer.className = "QCManswer";
            document.getElementById("result").insertAdjacentElement("beforebegin", divAnswer);
            divAnswer.addEventListener("click", function () {
                addChoiceToQCMAnswer(answers[i].index);
                if (divAnswer.classList.contains("QCManswerSelected")) {
                    divAnswer.classList.remove("QCManswerSelected");
                }
                else {
                    divAnswer.classList.add("QCManswerSelected");
                }
            });
        }

    }

    //Bouton valider
    let buttonValidate = document.createElement("button");
    buttonValidate.innerHTML = "Valider";
    document.getElementById("result").insertAdjacentElement("beforebegin", buttonValidate);
    buttonValidate.addEventListener("click", function () {
        sendAnswerAndGetSolution(exercise);
    });

}


function addChoiceToQCMAnswer(index) {
    if (QCMAnswer.includes(index)) {
        QCMAnswer.splice(QCMAnswer.indexOf(index), 1);
    }
    else {
        QCMAnswer.push(index);
    }
    //On trie le tableau pour que les réponses soient dans l'ordre croissant
    QCMAnswer.sort(function (a, b) { return a - b });
    console.log(QCMAnswer);
}


function sendAnswerAndGetSolution(exercise) {
    // Client-side

    if (exercise.type == "INPUT") {

        let answer = document.getElementById("userAnswer").value;
        let exerciseType = exercise.type;
        fetch('/api/sendAnswerAndGetSolution', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ exerciseId, answer, exerciseType })
        })
            .then(response => response.json())//On récupère la réponse du serveur et on la convertit en JSON
            .then(data => {
                console.log(data);
                //Récupération des données et affichage sur la page si la requête est réussie
                let isCorrect = data.isCorrect;
                if (isCorrect) {
                    document.getElementById("result").innerHTML = "Bonne réponse";
                }
                else {
                    document.getElementById("result").innerHTML = "Mauvaise réponse";
                }
            })
            .catch(error => {
                // Gérer les erreurs de requête
                console.error('Une erreur s\'est produite:', error);
            });
    }

    if (exercise.type == "QCM") {

        let answerQCM = QCMAnswer;
        let exerciseType = exercise.type;
        fetch('/api/sendAnswerAndGetSolution', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ exerciseId, answerQCM, exerciseType })
        })
            .then(response => response.json())//On récupère la réponse du serveur et on la convertit en JSON
            .then(data => {
                console.log(data);
                //Récupération des données et affichage sur la page si la requête est réussie
                let isCorrect = data.isCorrect;
                if (isCorrect) {
                    document.getElementById("result").innerHTML = "Bonne réponse";
                }
                else {
                    document.getElementById("result").innerHTML = "Mauvaise réponse";
                }
            })
            .catch(error => {
                // Gérer les erreurs de requête
                console.error('Une erreur s\'est produite:', error);
            });
    }
}
