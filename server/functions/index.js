
//Declaration des modules importants pour le serveur
const functions = require("firebase-functions");
const express = require("express");

//Déclaration modules utiles pour le serveur
const app = express();
const path = require("path");
const dontenv = require("dotenv").config({path:"./.env"});

//Déclaration des variables utiles pour le serveur
const PORT = process.env.SERVER_PORT || 3000 ;
const TITLE = process.env.SERVER_NAME ;
const ENV = process.env.SEVREUR_ENV ;




app.get("/", (req, res) => {
  res.status(200).send({data: "Hello World!"});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

exports.app = functions.https.onRequest(app);
