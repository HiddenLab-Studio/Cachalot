const express = require('express');
const app = express();
const port = 4000;


//On défini le dossier indiqué comme dossier statique => on peut directement accéder aux fichiers du dossier côté client
app.use(express.static('BonneEcole/src/exerciseCreator'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/BonneEcole/src/exerciseCreator/exerciseCreator.html');
});



app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
