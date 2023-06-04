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
