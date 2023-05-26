import React from "react";

// Components

const CreateExercise = (props) => {
    return (
        <body>
            <h1>Créer votre propre exercice</h1>

            <section>
                <div>
                    <h3>Énoncé</h3>
                    <textarea name="statement" rows="5" cols="33" required>Énoncé de l'exercice...</textarea>
                </div>
                <div>
                    <h3>Ajouter une image (optionnel)</h3>
                    <input type="file" id="upload" accept="image/*"></input>
                    <img id="preview" src="#" alt="Aperçu de l'image"></img>
                </div>
            </section>

            <section>
                <h3>Réponses possibles</h3>
                <input type="text"></input>
                <button>Ajouter</button>
            </section>

            <button>Créer l'exercice</button>
        </body>
    )
};

export default CreateExercise;