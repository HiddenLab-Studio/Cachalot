//Au chargement de la page, on va générer tous les éléments nécessaires à la création d'un exercice


//D'abord un input pour le titre de l'exercice
var titleInput = document.createElement("input");
titleInput.setAttribute("type", "text");
titleInput.setAttribute("id", "titleInput");
titleInput.setAttribute("placeholder", "Titre de l'exercice");
document.getElementById("exerciseDiv").appendChild(titleInput);

//Ensuite un input pour la consigne de l'exercice
var consigneInput = document.createElement("input");
consigneInput.setAttribute("type", "text");
consigneInput.setAttribute("id", "consigneInput");
consigneInput.setAttribute("placeholder", "Consigne de l'exercice");
document.getElementById("exerciseDiv").appendChild(consigneInput);



