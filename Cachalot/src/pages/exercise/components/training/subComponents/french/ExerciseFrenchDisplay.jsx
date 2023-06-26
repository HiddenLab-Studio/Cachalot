import React, {useRef, useState} from "react";
import tw, {styled} from "twin.macro";
import SelectorClassFrench from "./SelectorClassFrench.jsx";
import {data, frenchFunctions} from "../../../../functions/FrenchExerciseGenerator.js";
import {mathFunctions} from "../../../../functions/MathExerciseGenerator.js";
import {useCache} from "../../../../../../context/manager/cache/CacheProvider.js";

const ButtonYesOrNo = styled.button`
  background-color: white;
  width: 25%;
  font-family: "Din_Round_Med", sans-serif;
  color: ${props => props.theme.cachalotColor};
  border: 2px solid ${props => props.theme.borderRightColor};
  border-bottom: 4px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  padding: 12px;
  font-size: var(--fs-s);
  background-color: ${props => props.current ? props.theme.buttonBgHover : null};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.theme.buttonBgHover};
  }
`;
const ExerciseContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  
  .question__and__sentence__container {
    display: flex;
    flex-direction: column;
    h2 {
      font-family: "Din_Round_Bold", sans-serif;
      font-size: var(--fs-m);
      color: ${props => props.theme.text};
    }
    span {
        font-family: "Din_Round", sans-serif;
        font-size: var(--fs-s);
        color: ${props => props.theme.text};
        text-align: center;
    }
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
  
  .yes__or__no__container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

  }
  
  .submit__btn__container {
    display: flex;
    justify-content: center;
    button {
      background-color: white;
      width: 50%;
      font-family: "Din_Round_Med", sans-serif;
      color: ${props => props.theme.cachalotColor};
      border: 2px solid ${props => props.theme.borderRightColor};
      border-bottom: 4px solid ${props => props.theme.borderRightColor};
      border-radius: 12px;
      padding: 12px;
      font-size: var(--fs-sm);
      transition: all 0.2s ease-in-out;
      &:hover {
        background-color: ${props => props.theme.buttonBgHover};
      }
    }
  }

  
`;

const ExerciseFrenchDisplay = () => {
    const cache = useCache();

    const [exercise, setExercise] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [current, setCurrent] = useState(null);
    const [error, setError] = useState(null);

    function handleState(type, value = undefined){
        switch (type) {
            case "class":
                frenchFunctions.selectClass(value).then(async () => {
                    console.info("Class type changed to: " + value);
                    console.log("Current exercise: " + data.currentExercise);
                    setError(null);
                    setExercise(data.currentExercise);
                });
                break;
            default:
                console.log("Error: handleState() type not found");
        }
    }

    function handleClick(value, current){
        let exerciseQuestion = exercise.question;
        switch(exercise.type) {
            case "INPUT":
                setAnswer(value);
                break;
            case "QCM2":
                switch (exerciseQuestion) {
                    case "Est-ce que ce verbe est à l'infinitif ou au participe passé ?":
                        if(value) setAnswer("Infinitif");
                        else setAnswer("Participe passé");
                        break;
                    case "Est-ce que cette phrase est affirmative ou négative ?":
                        if(value) setAnswer("Affirmative");
                        else setAnswer("Négative");
                        break;
                    case "c' ou s' ?":
                        if(value) setAnswer("c'");
                        else setAnswer("s'");
                        break;
                    default:
                        break;
                }
                switch (current) {
                    case 0:
                        setCurrent(0);
                        break;
                    case 1:
                        setCurrent(1);
                        break;
                    default:
                        break;
                }
                break;
            case "QCM3":
                switch (exerciseQuestion) {
                    case "Quel est le temps de cette phrase ?":
                        switch (value) {
                            case 0:
                                setAnswer("Passé");
                                break;
                            case 1:
                                setAnswer("Présent");
                                break;
                            case 2:
                                setAnswer("Futur");
                                break;
                            default:
                                break;
                        }
                        break;
                }
                switch (current) {
                    case 0:
                        setCurrent(0);
                        break;
                    case 1:
                        setCurrent(1);
                        break;
                    case 2:
                        setCurrent(2);
                        break;
                    default:
                        break;
                }
                break;
        }
    }

    function setText(index) {
        switch (exercise.type) {
            case "INPUT":
                break;
            case "QCM2":
                switch (exercise.question) {
                    case "Est-ce que ce verbe est à l'infinitif ou au participe passé ?":
                        if(index === 0) return "Infinitif";
                        else return "Participe passé";
                    case "Est-ce que cette phrase est affirmative ou négative ?":
                        if(index === 0) return "Affirmative";
                        else return "Négative";
                    case "c' ou s' ?":
                        if(index === 0) return "c'";
                        else return "s'";
                }
                break;
            case "QCM3":
                switch (exercise.question) {
                    case "Quel est le temps de cette phrase ?":
                        switch (index) {
                            case 0:
                                return "Passé";
                            case 1:
                                return "Présent";
                            case 2:
                                return "Futur";
                        }
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    function handleSubmit(){
        frenchFunctions.getSolution(exercise, answer, exercise.type).then(r => {
            if(r){
                setError(false);
                setTimeout(() => {
                    setError(null);
                }, 500);
                frenchFunctions.generateExercise().then(() => {
                    cache.questCache.updateQuestProgress("onTrainingCompleted").then(() => {
                        setExercise(data.currentExercise)
                        setCurrent(null);
                        setAnswer(null);
                    });
                });
            } else {
                setError(true);
                setTimeout(() => {
                    setError(null);
                }, 1000);
            }
        });
    }

    return (
        <ExerciseContainer>
            <SelectorClassFrench setState={handleState} />
            <div tw="w-[60%]">
                {
                    exercise === null || exercise === undefined ?
                        "Loading exercise..."
                    :
                        <div tw="flex flex-col gap-[12px]">
                            <div className="question__and__sentence__container">
                                <h2>{exercise.question}</h2>
                                <span>{exercise.phrase}</span>
                            </div>
                            {
                                exercise.type === "INPUT" ?
                                    <input type="text" placeholder="Réponse" onChange={(e) => setAnswer(e.target.value)} />
                                :
                                    exercise.type === "QCM2" ?
                                        <div className="yes__or__no__container">
                                            <ButtonYesOrNo current={current === 0} onClick={() => handleClick(true, 0)}>{setText(0)}</ButtonYesOrNo>
                                            <ButtonYesOrNo current={current === 1} onClick={() => handleClick(false, 1)}>{setText(1)}</ButtonYesOrNo>
                                        </div>
                                    :
                                        exercise.type === "QCM3" ?
                                            <div className="yes__or__no__container">
                                                <ButtonYesOrNo current={current === 0} onClick={() => handleClick(0, 0)}>{setText(0)}</ButtonYesOrNo>
                                                <ButtonYesOrNo current={current === 1} onClick={() => handleClick(1, 1)}>{setText(1)}</ButtonYesOrNo>
                                                <ButtonYesOrNo current={current === 2} onClick={() => handleClick(2, 2)}>{setText(2)}</ButtonYesOrNo>
                                            </div>
                                        :
                                            null
                            }


                            <div className="submit__btn__container">
                                <button onClick={() => handleSubmit()}>
                                    Valider
                                </button>
                            </div>
                            {
                                error !== null ?
                                    error ?
                                        <div tw="flex justify-center">
                                            <span tw="text-red-500">Mauvaise réponse !</span>
                                        </div>
                                        :
                                        <div tw="flex justify-center">
                                            <span tw="text-green-500">Bonne réponse !</span>
                                        </div>
                                :
                                    null

                            }

                        </div>
                }


            </div>
        </ExerciseContainer>
    )
}

/*


                {
                    exercise !== null && exercise !== undefined ?
                        <pre tw="my-[16px] flex flex-col gap-[4px]">
                            <span>Type: {exercise.type}</span>
                            <span>Réponse: {exercise.reponse}</span>
                        </pre>
                    :
                        null
                }

 */

export default ExerciseFrenchDisplay;