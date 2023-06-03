import tw from "twin.macro";
import React, {useEffect, useRef, useState} from "react";

// Components
import Navbar from "../../components/navbar/Navbar.jsx"
import {
    ExerciseContainer,
    Container
} from "./ExerciseHomePageStyle.js";

// Functions and data
import {
    data, mathFunctions
} from "./functions/MathExerciseGenerator.js";
import ExerciseType from "./components/ExerciseType.jsx";
import ExerciseLevel from "./components/ExerciseLevel.jsx";


const ExerciseHomePage = () => {
    // States
    const [isLoading, setIsLoading] = useState(true);
    const [exercise, setExercise] = useState(data.currentExercise);

    // useEffect
    useEffect( () => {
        //document.getElementById("all_exercise").style.backgroundColor = "grey";
        //document.getElementById("all_class").style.backgroundColor = "grey";
        mathFunctions.init().then(() => {
            console.log("Init done (result: " + data.currentExercise + " )");
            setExercise(data.currentExercise);
            setIsLoading(false);
        });

        document.addEventListener("keydown", async (event) => {
            if (event.key === "Enter") {
                let result = await mathFunctions.getSolution();
                document.getElementById("value").value = "";
                if (result) {
                    await mathFunctions.getExercise();
                    setExercise(data.currentExercise)
                }
            }
        });
    }, []);

    // Functions
    function handleState(type, d){
        switch (type) {
            case "exercise":
                setExercise(d);
                break;
            case "exerciseType":
                mathFunctions.selectExerciseType(d).then(() => {
                    setExercise(data.currentExercise);
                });
                break;
            default:
                console.log("Error: handleState() type not found");
                break;
        }
    }

    /* TODO:
    *   - Revoir les composants et le css
    */
    return (
        <Container>
            <Navbar/>
            <ExerciseContainer>
                <div className="selectClassType">
                    <ExerciseLevel setState={handleState} />
                </div>

                <div tw="flex flex-col items-center w-[100%]">
                    <div className="selectExerciseType">
                        <ExerciseType setState={handleState} exerciseType={data.currentExerciseType} />
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
        </Container>
    )
}

/*

                            if(currentLevel === "CP" && type === "addition"){
                                console.log(type);
                                return <ExerciseType type="addition" setState={handleState}/>
                            } else {
                                return <ExerciseType type={type} setState={handleState}/>
                            }


 */

export default ExerciseHomePage;