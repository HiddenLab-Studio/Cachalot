import React, {useEffect} from "react";
import tw from "twin.macro";

// Styled Components
import {
    ExerciseCreationBodyContainer, ExerciseCreationSubContainer, Fieldset,
    MainTitleContainer
} from "./style/CreateExerciseStyle.js";
import DescSpan from "../../../../../../components/utils/ui/DescSpan.jsx";
import CreationSwiper from "./CreationSwiper.jsx";

const CreateExercise = (props) => {
    const auth = props.auth;

    useEffect( () => {
        console.info("Rendering CreateExercise.jsx...")
    }, []);

    return (
        <>
            <MainTitleContainer>
                <img src="../../../../../../../static/img/icons/exercise.png" alt="Create"/>
                <h1>Module de création</h1>
            </MainTitleContainer>
            <ExerciseCreationBodyContainer>
                <DescSpan desc="
                    Grâce à ce module, vous pouvez créer vos propres exercices de mathématiques et de français et les partager avec la communauté !
                    Chaque membre de Cachalot peut résoudre vos exercices et vous pouvez aussi résoudre les exercices des autres membres tout en donnant
                    votre avis sur la qualité de l'exercice."
                />
                <ExerciseCreationSubContainer>
                    <CreationSwiper auth={auth} />
                </ExerciseCreationSubContainer>
            </ExerciseCreationBodyContainer>
        </>
    )
}

export default CreateExercise;