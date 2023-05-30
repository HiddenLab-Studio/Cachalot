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
