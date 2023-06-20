import React, {useRef, useState} from "react";
import { Link } from "react-router-dom";
import tw from "twin.macro";

// Components
import TrendingExercise from "../../../components/cards/TrendingExercise.jsx";

// Styled Components
import {BodyTrainingContainer, InputNumberContainer} from "../styles/BodyTrainingStyle.js";

// Icons
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import {useMediaQuery} from "react-responsive";

const BodyTraining = ({auth}) => {
    // State
    const [amountOfExerciseToShow, setAmountOfExerciseToShow] = useState(3);

    // Refs
    const amountOfExerciseToShowRef = useRef();
    // Responsive
    const isOnMobile = useMediaQuery({ query: '(max-width: 768px)' });

    function handleInputNumber(num){
        let inputValue = parseInt(amountOfExerciseToShowRef.current.innerText);
        if(inputValue + num <= 9 && inputValue + num >= 1) {
            setAmountOfExerciseToShow(inputValue + num);
            amountOfExerciseToShowRef.current.innerText = inputValue + num;
            console.log(amountOfExerciseToShow);
        }
    }

    return (
        <BodyTrainingContainer>
            <div className="title__container">
                <div tw="flex flex-row gap-[8px] items-center">
                    <img tw="w-[36px] h-[36px]" src="../../../../static/img/icons/dumbbell.png" alt="Dumbbell"/>
                    <h1>Entrainement</h1>
                </div>
                <span>
                    Entrainez-vous à résoudre des exercices de mathématiques et de français mais
                    créez aussi vos propres exercices et partagez-les avec la communauté !
                </span>
            </div>
            <div className="training__choice__container">
                <div className="grid__container">
                    <Link to="/training/math">
                        <div className="card">
                            <img src="../../../../static/img/icons/math.png" alt="Math"/>
                            <span>Mathématiques</span>
                        </div>
                    </Link>
                    <Link to="/training/french">
                        <div className="card">
                            <img src="../../../../static/img/icons/french.png" alt="Français"/>
                            <span>Français</span>
                        </div>
                    </Link>
                </div>
            </div>

            <div tw="flex flex-row items-center">
                <div tw="flex flex-row items-center gap-[8px]">
                    <img tw="w-[38px] h-[38px]" src="../../../static/img/gif/flame.gif" alt="Flame"/>
                    <h1>Exercices du moment</h1>
                </div>
                {
                    isOnMobile ?
                            null
                        :
                        <InputNumberContainer>
                            <div>
                                <FaMinus onClick={() => handleInputNumber(-1)} />
                                <span ref={amountOfExerciseToShowRef}>{amountOfExerciseToShow}</span>
                                <FaPlus onClick={() => handleInputNumber(1)} />
                            </div>
                        </InputNumberContainer>
                }
            </div>

            <TrendingExercise amount={amountOfExerciseToShow} auth={auth} />

        </BodyTrainingContainer>
    )
}

export default BodyTraining;