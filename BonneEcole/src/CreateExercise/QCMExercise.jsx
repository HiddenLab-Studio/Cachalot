import React, { useEffect, useState } from "react";

// Scss
import "./QCMExercise.scss";

const QCMExercise = (props) => {
    const [qcm, setQcm] = useState([{question: "Question n°1", imgSrc: null, answers: [], state: []}]); // QCM list

    // Change the preview image when a new image is uploaded
    const changePreviewImage = (event, qcmIndex) => {
        qcm[qcmIndex].imgSrc = URL.createObjectURL(event.target.files[0]);
        setQcm([...qcm]);
    };

    // Add a new answer to the question
    const addAnswer = (qcmIndex, answer) => {
        if (answer != "" && !qcm[qcmIndex].answers.includes(answer)){
            qcm[qcmIndex].answers.push(answer);
            qcm[qcmIndex].state.push(false);
            setQcm([...qcm]);
        }
    };

    // Delete an answer from the question
    const deleteAnswer = (qcmIndex, answerIndex) => {
        qcm[qcmIndex].answers.splice(answerIndex, 1);
        qcm[qcmIndex].state.splice(answerIndex, 1);
        setQcm([...qcm]);
    };

    // Change the answer's state
    const changeAnswerState = (qcmIndex, state) => {
        qcm[qcmIndex].state[state] = !qcm[qcmIndex].state[state];
        setQcm([...qcm]);
    };

    // Add a new question to the qcm
    const addQuestion = () => {
        setQcm([...qcm, {question: "Question n°" + (qcm.length + 1), imgSrc: null, answers: [], state: []}]);
    };

    // Display the qcm
    const displayQcm = () => {
        return (
          <>
            {qcm.map((qcmItem, qcmIndex) => (
              <div key={qcmIndex}>
                <section>
                  <div>
                    <h3>Question</h3>
                    <textarea className="question" defaultValue={qcmItem.question}></textarea>
                  </div>
                  <div className="image">
                    <h3>Ajouter une image (optionnel)</h3>
                    <input type="file" accept="image/*" onChange={(event) => {
                        // Change the preview image when a new image is uploaded
                        changePreviewImage(event, qcmIndex);
                    }}></input>
                    <img className="preview" src={qcmItem.imgSrc} alt="Image preview"></img>
                  </div>
                </section>
      
                <section className="answers">
                  <h3>Réponses</h3>
                  <input type="text" onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            // Add a new answer to the question
                            addAnswer(qcmIndex, event.target.value);
                            event.target.value = "";
                        }
                  }}></input>
                  <button onClick={(event) => {
                    // Add a new answer to the question
                    addAnswer(qcmIndex, event.target.previousSibling.value);
                    event.target.previousSibling.value = "";
                  }}>Ajouter</button>
                </section>
      
                <section className="answers">
                  <ul>
                    {qcmItem.answers.map((answer, answerIndex) => (
                      <li key={answerIndex}>
                        <div className="row">
                          {answer}
                          <button onClick={()=> {
                            // Change the answer's state
                            changeAnswerState(qcmIndex, answerIndex);
                          }}>{qcm[qcmIndex].state[answerIndex] ? 'Vrai' : 'Faux'}</button>
                          <img
                            alt="delete"
                            src="https://img.icons8.com/material-rounded/24/filled-trash.png"
                            className="delete"
                            onClick={() => {
                              // Delete an answer from lists
                              deleteAnswer(qcmIndex, answerIndex);
                            }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
                <hr />
              </div>
            ))}
          </>
        );
      };      

    // When the component is loaded
    useEffect(() => {
        const addExerciseInput = document.getElementById('addExercise'); // Add exercise button

        // Add the exercise to the database
        addExerciseInput.addEventListener('click', () => {
            console.log(qcm);
        });
    }, []);

    return (
        <div className="QCMExercise">

            {displayQcm()}

            <div className="newQuestion"><button onClick={() => {
                // Add a new question to the qcm
                addQuestion();
            }}>Ajouter une question</button></div>

            <div className="submit"><button id="addExercise">Créer l'exercice</button></div>
        </div>
    );
};

export default QCMExercise;