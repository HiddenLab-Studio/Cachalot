import React from "react";
import tw from "twin.macro";

// Styled Components
import {BodyTrainingContainer} from "../styles/BodyTrainingStyle.js";
import {Link} from "react-router-dom";
import TrendingExercise from "../../../components/cards/TrendingExercise.jsx";

const BodyTraining = ({auth}) => {

    const userData = auth.userData;

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
            <div className="training__note__container">
                <span>
                    * Pour chaque entrainement terminé, vous gagnez des points d'expérience.
                </span>
            </div>
            <TrendingExercise amount={3} />
        </BodyTrainingContainer>
    )
}

export default BodyTraining;