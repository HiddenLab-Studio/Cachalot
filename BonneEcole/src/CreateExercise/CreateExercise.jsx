import React, { useEffect, useState } from "react";

// Scss
import "./CreateExercise.scss"

// Windows
import StatementExercise from "./StatementExercise.jsx";
/*import "./QCMExercise.jsx"*/

// Main page display
const CreateExercise = (props) => {
    const [showStatementExercise, setShowStatementExercise] = useState(false);
    const [showQCMExercise, setShowQCMExercise] = useState(false);

    const openWindow1 = () => {
        setShowStatementExercise(true);
        setShowQCMExercise(false);
    };

    const openWindow2 = () => {
        setShowStatementExercise(false);
        setShowQCMExercise(true);
    };

    return (
        <>
            <h1>Créer votre propre exercice</h1>

            <div className="switchWindow">
                <button onClick={openWindow1}>Fenêtre 1</button>
                <button onClick={openWindow2}>Fenêtre 2</button>
            </div>

            {showStatementExercise && <StatementExercise />}
        </>
    );
};

export default CreateExercise;