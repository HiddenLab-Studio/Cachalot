import tw from "twin.macro";
import { useEffect, useState } from "react";

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


const ExerciseHomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [exercise, setExercise] = useState(undefined);

    useEffect( () => {
        mathFunctions.init().then(() => {
            console.log("Init done (result: " + data.currentExercise + " )");
            setExercise(data.currentExercise);
            setIsLoading(false);
        });

        document.addEventListener("keydown", async (event) => {
            if (event.key === "Enter") {
                await mathFunctions.getSolution();
                setExercise(data.currentExercise);
            }
        });


    }, []);

    return (
        <Container>
            <Navbar/>
            <ExerciseContainer>
                <div className="selectClassType">
                    {data.validClassType.map(type => {
                        return (
                            <button id={type} key={type} onClick={(event) => {
                                mathFunctions.selectClassType(type).then(() => {
                                    mathFunctions.updateView(event);
                                    setExercise(data.currentExercise);
                                });
                            }}>
                                {type === "all" ? "Tout" : type}
                            </button>
                        )
                    })}
                </div>

                <div tw="flex flex-col items-center w-[100%]">
                    <div className="selectExerciseType">
                        {data.validExerciseType.map(type => {
                            return (
                                <button id={type} key={type} onClick={ (event) => {
                                    mathFunctions.selectExerciseType(type).then(() => {
                                        mathFunctions.updateView(event);
                                        setExercise(data.currentExercise);
                                    });
                                }}>
                                    {type === "all" ? "Tout" : type === "addition" ? "Addition" : type === "soustraction" ? "Soustraction" : type === "multiplication" ? "Multiplication" : type === "division" ? "Division" : "Error"}
                                </button>
                            )
                        })}
                    </div>

                    <div className="exercise">
                        {isLoading ? <h1>Loading exercise...</h1> : <div id="exercise">{exercise}</div>}
                        <input type="text" id="value" placeholder="Réponse"/>
                        <button onClick={async () => {
                            let result = await mathFunctions.getSolution();
                            console.log(result, data.currentExercise);
                            if(result) setExercise(data.currentExercise);
                        }}>Valider</button>
                        <div id="result"></div>
                    </div>
                </div>
            </ExerciseContainer>
        </Container>
    )
}

export default ExerciseHomePage;