import React, { useEffect, useState } from "react";

// Scss
import "./CreateExercise.scss"

// Windows
import StatementExercise from "./StatementExercise.jsx";
import QCMExercise from "./QCMExercise";

// Main page display
const CreateExercise = (props) => {
    const [showStatementExercise, setShowStatementExercise] = useState(true);
    const [showQCMExercise, setShowQCMExercise] = useState(false);

    const openWindow1 = () => {
        // Display the statement exercise window
        setShowStatementExercise(true);
        setShowQCMExercise(false);
        // Change the button color
        document.getElementsByClassName("StatementButton")[0].style.backgroundColor = "#888888";
        document.getElementsByClassName("QCMButton")[0].style.backgroundColor = "#bbbbbb";
    };

    const openWindow2 = () => {
        // Display the QCM exercise window 
        setShowStatementExercise(false);
        setShowQCMExercise(true);
        // Change the button color
        document.getElementsByClassName("StatementButton")[0].style.backgroundColor = "#bbbbbb";
        document.getElementsByClassName("QCMButton")[0].style.backgroundColor = "#888888";
    };

    return (
        <>
            <h1>Créer votre propre exercice</h1>

            <div className="switchWindow">
                <button onClick={openWindow1} className="StatementButton">Exercice avec énoncé</button>
                <button onClick={openWindow2} className="QCMButton">Exercice QCM</button>
            </div>

            {showStatementExercise && <StatementExercise />}
            {showQCMExercise && <QCMExercise />}
        </>
    );
};

export default CreateExercise;