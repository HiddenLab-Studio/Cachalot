import {data, mathFunctions} from "../../pages/exercise/functions/MathExerciseGenerator.js";
import React, {useEffect, useState} from "react";
import { styled } from "twin.macro";

const ExerciseDisplayContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-grow: 2;
  gap: 10px;

  span {
    font-family: "Din_Round_Med", sans-serif;
    font-size: var(--fs-l);
    color: ${props => props.theme.text};
  }

  input {
    font-size: var(--fs-sm);
    padding: 10px 16px;
    background-color: ${props => props.theme.inputBg};
    border: 2px solid ${props => props.theme.borderRightColor};
    border-radius: 12px;
    outline: none;
    color: ${props => props.theme.text};
  }

  button {
    font-family: "Din_Round_Med", sans-serif;
    color: ${props => props.theme.cachalotColor};
    border: 2px solid ${props => props.theme.borderRightColor};
    border-bottom: 4px solid ${props => props.theme.borderRightColor};
    border-radius: 12px;
    padding: 12px;
    transition: all 0.2s ease-in-out;
    font-size: var(--fs-sm);

    &:hover {
      background-color: ${props => props.theme.buttonBgHover};
    }
  }
`;
const ExerciseDisplay = ({exercise, setExercise}) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        mathFunctions.init().then(() => {
            setIsLoading(false);
            console.log("Init done (result: " + data.currentExercise + " )");
            document.getElementById("all_exercise").style.backgroundColor = "#f1f1f1";
            document.getElementById("all_class").style.backgroundColor = "#f1f1f1";
            document.addEventListener("keydown", onKeyPress);
            setExercise(data.currentExercise);
        });

        return () => {
            data.currentExerciseType = "all";
            data.currentLevel = "all";
            document.removeEventListener("keydown", onKeyPress);
        }
    }, []);

    async function onKeyPress(event) {
        if (event.key === "Enter") {
            let result = await mathFunctions.getSolution();
            document.getElementById("value").value = "";
            if (result) {
                await mathFunctions.getExercise();
                setExercise(data.currentExercise)
            }
        }
    }

    return (
        <ExerciseDisplayContainer>
            {isLoading ? <h1>Loading exercise...</h1> : <div id="exercise">{exercise === undefined ? "Error while loading excercise" : <span>{exercise}</span>}</div>}
            <input type="text" id="value" placeholder="Réponse"/>
            <button onClick={async () => {
                let result = await mathFunctions.getSolution();
                document.getElementById("value").value = "";
                if (result) {
                    await mathFunctions.getExercise();
                    setExercise(data.currentExercise)
                }
            }}>Valider</button>
            <div id="result"></div>
        </ExerciseDisplayContainer>
    )
}

export default ExerciseDisplay;