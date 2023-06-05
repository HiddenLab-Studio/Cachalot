import React, {useEffect, useState} from "react";
import tw from "twin.macro";

// Styles
import {
    ExerciseContainer
} from "../ExerciseHomePageStyle.js";

// Data and functions
import {data, mathFunctions} from "../functions/MathExerciseGenerator.js";

// subComponents
import SelectorClass from "./SelectorClass.jsx";
import SelectorType from "./SelectorType.jsx";

const MathExercise = () => {
    // States
    const [isLoading, setIsLoading] = useState(true);
    const [exercise, setExercise] = useState(data.currentExercise);

    // useEffect
    useEffect( () => {
        // Triggered each time the user loads the page

        // TODO: change this to remember the last exercise type and class
        document.getElementById("all_exercise").style.backgroundColor = "grey";
        document.getElementById("all_class").style.backgroundColor = "grey";

        mathFunctions.init().then(() => {
            console.log("Init done (result: " + data.currentExercise + " )");
            setExercise(data.currentExercise);
            setIsLoading(false);
            document.addEventListener("keydown", onKeyPress);
        });

        // Triggered each time the user leaves the page
        return () => {
            data.currentExerciseType = "all";
            data.currentLevel = "all";
            document.removeEventListener("keydown", onKeyPress);
        }

    }, []);

    // Functions
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

    function handleState(type, newData){
        switch (type) {
            case "exercise":
                setExercise(newData);
                break;
            case "exerciseType":
                mathFunctions.selectExerciseType(newData).then(() => {
                    setExercise(data.currentExercise);
                });
                break;
            default:
                console.log("Error: handleState() type not found");
                break;
        }
    }
    return (
        <ExerciseContainer>
            <div className="selectClassType">
                <SelectorClass setState={handleState} />
            </div>

            <div tw="flex flex-col items-center w-[100%]">
                <div className="selectExerciseType">
                    <SelectorType setState={handleState} exerciseType={data.currentExerciseType} />
                </div>

                <div className="exercise">
                    {isLoading ? <h1>Loading exercise...</h1> : <div id="exercise">{exercise}</div>}
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
                </div>
            </div>
        </ExerciseContainer>
    )
}

export default MathExercise;