import React, { useEffect, useState } from "react";
import { createExercise } from "./firebase/firebase-createexo";

// Scss
import "./StatementExercise.scss";

const StatementExercise = (props) => {
    const [previewSource, setPreviewSource] = useState(""); // Preview image when uploded
    let imageUrl = ""; // Image url
    let answers = []; // Answers list
    const [inputAnswer, setInputAnswer] = useState(""); // Input answer

    // Display the answers list
    const displayList = () => {
        if (answers.length > 0) {
            setInputAnswer(
                <ul>
                    {answers.map((answer, index) => (
                        <li key={index}>
                            <div className="row">{answer}
                                <img alt="delete" src="https://img.icons8.com/material-rounded/24/filled-trash.png" className="delete" onClick={() => {
                                    // Delete an answer from the list
                                    answers.splice(index, 1);
                                    displayList();
                                }}>
                                </img>
                            </div></li>
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
            imageUrl = URL.createObjectURL(event.target.files[0]);
        });

        // Add a new answer to the list when the button is clicked
        addAswerInput.addEventListener('click', (event) => {
            // Cancel if the answer is empty or already in the list
            if (answerInput.value != "" && !answers.includes(answerInput.value)) {
                answers.push(answerInput.value);
                answerInput.value = '';
            }
            displayList();
        });

        // Add a new answer to the list when the enter key is pressed
        answerInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                // Cancel if the answer is empty or already in the list
                if (answerInput.value != "" && !answers.includes(answerInput.value)) {
                    answers.push(answerInput.value);
                    answerInput.value = '';
                }
                displayList();
            }
        });

        // Add the exercise to the database
        addExerciseInput.addEventListener('click', async (event) => {
            // Cancel if the statement is empty
            if (document.querySelector('.statement').value == "") {
                return;
            }
            const data = {
                name : "exercise",
                statement: document.querySelector('.statement').value,
                image: imageUrl,
                answers: answers
            };
            await createExercise(data);
            console.log(data);
        });

        // Display the answers list for the first time
        displayList();
    }, []);

    return (
        <div className="StatementExercice">
            <section>
                <div>
                    <h3>Énoncé</h3>
                    <textarea className="statement" required defaultValue="Énoncé de l'exercice..."></textarea>
                </div>
                <div className="image">
                    <h3>Ajouter une image (optionnel)</h3>
                    <input type="file" id="upload" accept="image/*"></input>
                    <img className="preview" src={previewSource} alt="Image preview"></img>
                </div>
            </section>

            <hr />

            <section className="answers">
                <h3>Réponses possibles</h3>
                <input type="text" id="answer"></input>
                <button id="addAnswer">Ajouter</button>
            </section>

            <section className="answers">{inputAnswer}</section>

            <div className="submit"><button id="addExercise">Créer l'exercice</button></div>
        </div>
    );
};

export default StatementExercise;