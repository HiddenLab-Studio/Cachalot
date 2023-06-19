import React, {useState} from 'react';
import tw, { styled } from 'twin.macro';

import {
    CreationSwiperContainer,
    Dot, ErrorContainer,
    ExerciseTypeCard, ExerciseTypeCardContainer, GridContainer, NextStepContainer,
    PaginationContainer, PreviousStepContainer,
} from "../../../../styles/CreationSwiperStyle.js";
import {Link} from "react-router-dom";
import {FaChevronRight, FaExclamationCircle, FaChevronLeft} from "react-icons/fa";
import DescSpan from "../../../../../../components/utils/ui/DescSpan.jsx";
import {useMediaQuery} from "react-responsive";

const CreationSwiper = (props) => {
    // Data
    const auth = props.auth;

    // State
    const [currentStep, setCurrentStep] = useState(0);
    const [exerciseType, setExerciseType] = useState(null);

    // Error state
    const [error, setError] = useState(null);

    // Media Queries
    const isOnMobile = useMediaQuery({query: "(max-width: 550px)"});


    function handleClick(type) {
        if(error !== null) setError(null);
        setExerciseType(type);
    }

    function handlePagination(page, previous = false) {
        if(error !== null) setError(null);
        switch (currentStep) {
            case 0:
                if(exerciseType !== null) setCurrentStep(page);
                else setError("Veuillez sélectionner un type d'exercice");
                break;
            case 1:
                setCurrentStep(page);
                break;
        }
    }

    switch (currentStep) {
        case 0:
            return (
                <CreationSwiperContainer>
                    <div tw="flex flex-col gap-[8px]">
                        <h1>Sélectionner le type d'exercice</h1>
                        <DescSpan
                            desc="Sélectionnez le type d'exercice que vous souhaitez créer.
                            Vous pouvez modifier ce choix quand vous le souhaitez."
                        />
                    </div>
                    <ExerciseTypeCardContainer tw="flex flex-row justify-center">
                        <GridContainer tw="grid grid-cols-2 gap-[32px]">
                            <ExerciseTypeCard current={exerciseType === "math"}  onClick={() => handleClick("math")}>
                                <img src="../../../../../../../static/img/icons/math.png" alt="Math"/>
                                <span>Mathématiques</span>
                            </ExerciseTypeCard>
                            <ExerciseTypeCard current={exerciseType === "french"} onClick={() => handleClick("french")}>
                                <img src="../../../../../../../static/img/icons/french.png" alt="Français"/>
                                <span>Français</span>
                            </ExerciseTypeCard>
                        </GridContainer>
                    </ExerciseTypeCardContainer>
                    {
                        error !== null ?
                            <ErrorContainer tw="flex flex-row justify-center">
                                <FaExclamationCircle />
                                <span tw="text-red-500">{error}</span>
                            </ErrorContainer>
                        :
                            null
                    }
                    <PaginationContainer>
                        <Dot current={true} onClick={() => handlePagination(0)} />
                        <Dot onClick={() => handlePagination(1)} />
                        <Dot onClick={() => handlePagination(2)} />
                        <Dot onClick={() => handlePagination(3)} />
                    </PaginationContainer>
                    {
                        !isOnMobile ?
                                <NextStepContainer right={true}>
                                    <FaChevronRight onClick={() => handlePagination(1)} />
                                </NextStepContainer>
                            :
                            null
                    }
                </CreationSwiperContainer>
            )
        case 1:
            return (
                <CreationSwiperContainer>
                    <div tw="flex flex-col gap-[8px]">
                        <h1>Un titre... une description</h1>
                        <DescSpan
                            desc="Ajoutez un titre et une description à votre exercice."
                        />
                    </div>
                    <div>
                        <input type="text" placeholder="Titre de l'exercice" tw="w-full h-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"/>
                        <textarea placeholder="Description de l'exercice" tw="w-full h-32 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"/>
                    </div>
                    {
                        error !== null ?
                                <ErrorContainer tw="flex flex-row justify-center">
                                    <FaExclamationCircle/>
                                    <span tw="text-red-500">{error}</span>
                                </ErrorContainer>
                            :
                                null
                    }

                    <PaginationContainer>
                        <Dot onClick={() => handlePagination(0)}/>
                        <Dot current={true} onClick={() => handlePagination(1)}/>
                        <Dot onClick={() => handlePagination(2)}/>
                        <Dot onClick={() => handlePagination(3)}/>
                    </PaginationContainer>

                    {
                        !isOnMobile ?
                                <>
                                    <NextStepContainer right={true}>
                                        <FaChevronRight onClick={() => handlePagination(1)}/>
                                    </NextStepContainer>
                                    <PreviousStepContainer left={true} right={false}>
                                        <FaChevronLeft onClick={() => handlePagination(currentStep - 1)}/>
                                    </PreviousStepContainer>
                                </>
                            :
                                null
                    }

                </CreationSwiperContainer>
            )
        case 2:
            return (
                <CreationSwiperContainer>
                    <h1>Step 3</h1>
                    <PaginationContainer>
                        <Dot onClick={() => handlePagination(0)} />
                        <Dot onClick={() => handlePagination(1)}  />
                        <Dot current={true}  onClick={() => handlePagination(2)} />
                        <Dot onClick={() => handlePagination(3)} />
                    </PaginationContainer>
                </CreationSwiperContainer>
            )
        case 3:
            return (
                <CreationSwiperContainer>
                    <h1>Step 4</h1>
                    <PaginationContainer>
                        <Dot onClick={() => handlePagination(0)} />
                        <Dot onClick={() => handlePagination(1)}  />
                        <Dot onClick={() => handlePagination(2)} />
                        <Dot current={true}  onClick={() => handlePagination(3)} />
                    </PaginationContainer>
                </CreationSwiperContainer>
            )

    }
}

export default CreationSwiper;