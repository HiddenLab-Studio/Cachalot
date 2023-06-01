import tw from "twin.macro";
import { useEffect } from "react";

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
    console.log(data);

    useEffect(() => {
        mathFunctions.getExercise();
        window.addEventListener('keydown', (event) => {
            // ...
        });
    }, []);

    function updateView(event){
        console.log("updateView");
        event.target.parentElement.childNodes.forEach(element => {
            element.style.backgroundColor = "";
        });
        event.target.style.backgroundColor = "grey";
    }

    return (
        <Container>
            <Navbar />
            <ExerciseContainer>
                <div className="selectClassType">
                    {data.validClassType.map(type => {
                        return (
                            <button key={type} onClick={(event) => {
                                mathFunctions.selectClassType(type);
                                updateView(event);
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
                                <button key={type} onClick={(event) => {
                                    mathFunctions.selectExerciseType(type);
                                    updateView(event);
                                }}>
                                    {type === "all" ? "Tout" : type === "addition" ? "Addition" : type === "soustraction" ? "Soustraction" : type === "multiplication" ? "Multiplication" : type === "division" ? "Division" : "Error"}
                                </button>
                            )
                        })}
                    </div>

                    <div className="exercise">
                        <div id="exercise"></div>
                        <input type="text" id="valeurInput" placeholder="Réponse"/>
                        <button id="ConfirmAnswerBtn">Valider</button>
                        <div id="result"></div>
                    </div>
                </div>

            </ExerciseContainer>
        </Container>
    )
}

//<ThemeChanger setTheme={props.setTheme} />

export default ExerciseHomePage;