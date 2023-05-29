import React, { useEffect, useState } from "react";

// Scss
import "./CreateExercise.scss"

const CreateExercise = (props) => {
    const [previewSource, setPreviewSource] = useState("");
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const uploadInput = document.getElementById('upload');

        uploadInput.addEventListener('change', (event) => {
            setPreviewSource(URL.createObjectURL(event.target.files[0]));
        });
    }, []);

    return (
        <>
            <h1>Créer votre propre exercice</h1>

            <section>
                <div>
                    <h3>Énoncé</h3>
                    <textarea name="statement" className="statement" required defaultValue="Énoncé de l'exercice..."></textarea>
                </div>
                <div className="image">
                    <h3>Ajouter une image (optionnel)</h3>
                    <input type="file" id="upload" accept="image/*"></input>
                    <img className="preview" src={previewSource} alt="Image preview"></img>
                </div>
            </section>

            <section>
                <h3>Réponses possibles</h3>
                <input type="text"></input>
                <button>Ajouter</button>
            </section>

            <section><li>{answers}</li></section>

            <section><button>Créer l'exercice</button></section>
        </>
    )
};

export default CreateExercise;