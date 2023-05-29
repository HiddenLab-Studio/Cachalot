import React, { useEffect, useState } from "react";

// Scss
import "./CreateExercise.scss"

// Main page display
const CreateExercise = (props) => {
    const [previewSource, setPreviewSource] = useState(""); // Preview image when uploded
    let answers = []; // Answers list
    const [inputAnswer, setInputAnswer] = useState(""); // Input answer


    // Display the answers list
    const displayList = () => {
        if (answers.length > 0) {
            setInputAnswer(
                <ul>
                  {answers.map((answer, index) => (
                    <li key={index}>{answer}</li>
                  ))}
                </ul>
            );
        } else {
            // If the list is empty, display a message
            setInputAnswer(<p>Aucune réponse n'a été ajoutée</p>);
        }
    };

    useEffect(() => {
        const uploadInput = document.getElementById('upload'); // Upload button
        const answerInput = document.getElementById('answer'); // Answer input
        const addAswerInput = document.getElementById('addAnswer'); // Add answer button
        const addExerciseInput = document.getElementById('addExercise'); // Add exercise button

        // Change the preview image when a new image is uploaded
        uploadInput.addEventListener('change', (event) => {
            setPreviewSource(URL.createObjectURL(event.target.files[0]));
        });

        // Add a new answer to the list
        addAswerInput.addEventListener('click', (event) => {
            answers.push(answerInput.value);
            // annuler l'ajout si la réponse est vide
            // annuler l'ajout si la réponse est déjà dans la liste
            displayList();
        });

        // Delete an answer from the list

        // Add the exercise to the database
        addExerciseInput.addEventListener('click', () => {
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

            <hr/>

            <section>
                <h3>Réponses possibles</h3>
                <input type="text" id="answer"></input>
                <button id="addAnswer">Ajouter</button>
            </section>

            <section>{inputAnswer}</section>

            <section><button id="addExercise">Créer l'exercice</button></section>
        </>
    )
};

export default CreateExercise;