import React, {createRef, useState} from 'react';
import tw, { styled } from 'twin.macro';

import {
    CreationSwiperContainer,
    Dot, ErrorContainer,
    ExerciseTypeCard, ExerciseTypeCardContainer, GridContainer, NextStepContainer,
    PaginationContainer, PreviousStepContainer, SubmitButtonContainer, TitleDescContainer,
} from "./style/CreationSwiperStyle.js";
import {FaChevronRight, FaExclamationCircle, FaChevronLeft} from "react-icons/fa";
import DescSpan from "../../../../../../components/utils/ui/DescSpan.jsx";
import {useMediaQuery} from "react-responsive";
import QuestionAnswer from "./QuestionAnswer.jsx";
import QuestionComponent from "./QuestionAnswer.jsx";

const CreationSwiper = (props) => {
    // Data
    const auth = props.auth;

    // State
    const [currentStep, setCurrentStep] = useState(0);
    const [exerciseType, setExerciseType] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [list, setList] = useState(null);

    // Error state
    const [error, setError] = useState(null);

    // Media Queries
    const isOnMobile = useMediaQuery({query: "(max-width: 550px)"});

    // Refs
    const titleRef = createRef();
    const descRef = createRef();
    const questionAnswerRef = createRef();

    function handleClick(type) {
        if(error !== null) setError(null);
        switch (type) {
            case "math":
                setExerciseType("math");
                break;
            case "french":
                setExerciseType("french");
                break;
            case "other":
                setExerciseType("other");
                break;
            case "create":
                let exerciseData = {
                    title: title,
                    desc: desc,
                    type: exerciseType,
                    question: list.question,
                    answers: list.answers,
                    photo: list.photo.name !== undefined ? URL.createObjectURL(list.photo) : undefined
                }
                auth.exercise.createExercise(auth.currentUser, exerciseData).then((r) => {
                    console.info(r);
                    if(r.code){
                        console.info("Exercise created!");
                        window.location.pathname = "/exercise/" + r.exerciseId.toString();
                    } else {
                        setError("Une erreur est survenue lors de la création de l'exercice");
                    }
                });
                break;
        }
    }

    function handleChange(e, type) {
        switch (type) {
            case "title":
                setTitle(e.target.value);
                break;
            case "desc":
                setDesc(e.target.value);
                break;
        }
    }

    async function handlePagination(page, previous = false) {
        setError(null);
        if(!previous) {
            switch (currentStep) {
                case 0:
                    if (exerciseType !== null) setCurrentStep(page);
                    else setError("Veuillez sélectionner un type d'exercice");
                    break;
                case 1:
                    if (titleRef.current.value !== "" && descRef.current.value !== "") {
                        setTitle(titleRef.current.value);
                        setDesc(descRef.current.value);
                        setCurrentStep(page)
                    } else {
                        setError("Veuillez remplir tous les champs");
                    }
                    break;
                case 2:
                    if(questionAnswerRef.current !== null){
                        let tmpList = questionAnswerRef.current.getState();
                        if(tmpList.question.length > 0){
                            let AtLeastOneAnswer = false;
                            let isEachFieldValid = true;
                            tmpList.answers.forEach((element) => {
                                console.log(element.text);
                                if(element.text.length === 0) isEachFieldValid = false;
                                if(element.isValid) AtLeastOneAnswer = true;
                            });
                            if(isEachFieldValid){
                                if(AtLeastOneAnswer){
                                    setList(tmpList);
                                    setCurrentStep(page);
                                } else {
                                    setError("Veuillez ajouter au moins une réponse !");
                                }
                            } else {
                                setError("Veuillez remplir tous les champs");
                            }
                        } else {
                            setError("Veuillez ajouter un énoncé !");
                        }
                    }
                    break;
            }
        } else {
            setCurrentStep(page);
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
                    <ExerciseTypeCardContainer>
                        <GridContainer>
                            <ExerciseTypeCard current={exerciseType === "math"}  onClick={() => handleClick("math")}>
                                <img src="../../../../../../../static/img/icons/math.png" alt="Math"/>
                                <span>Mathématiques</span>
                            </ExerciseTypeCard>
                            <ExerciseTypeCard current={exerciseType === "french"} onClick={() => handleClick("french")}>
                                <img src="../../../../../../../static/img/icons/french.png" alt="Français"/>
                                <span>Français</span>
                            </ExerciseTypeCard>
                            <ExerciseTypeCard current={exerciseType === "other"} onClick={() => handleClick("other")}>
                                <img src="../../../../../../../static/img/icons/other.png" alt="Autre"/>
                                <span>Autre</span>
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
                        <Dot current={true} />
                        <Dot onClick={() => handlePagination(1)} />
                        <Dot />
                        <Dot />
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

                    <TitleDescContainer>
                        <div className="title">
                            <label htmlFor="title">Titre</label>
                            <input ref={titleRef}
                                   type="text"
                                   placeholder="Titre de l'exercice"
                                   defaultValue={title !== null ? title.toString() : ""}
                                   onChange={(e) => handleChange(e, "title")}
                            />
                        </div>
                        <div className="textarea">
                            <label htmlFor="desc">Description</label>
                            <textarea ref={descRef}
                                      placeholder="Ajouter votre description"
                                      className="textarea"
                                      defaultValue={desc !== null ? desc.toString() : ""}
                                      onChange={(e) => handleChange(e, "desc")}
                            />
                        </div>
                    </TitleDescContainer>

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
                        <Dot onClick={() => handlePagination(0, true)}/>
                        <Dot current={true} />
                        <Dot onClick={() => handlePagination(2)}/>
                        <Dot />
                    </PaginationContainer>
                    {
                        !isOnMobile ?
                                <>
                                    <NextStepContainer right={true}>
                                        <FaChevronRight onClick={() => handlePagination(2)}/>
                                    </NextStepContainer>
                                    <PreviousStepContainer left={true} right={false}>
                                        <FaChevronLeft onClick={() => handlePagination(0, true)}/>
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
                    <div tw="flex flex-col gap-[8px]">
                        <h1>Créer une question et des réponses</h1>
                        <DescSpan
                            desc="Ajoutez un énoncé et des réponses à votre exercice."
                        />
                    </div>

                    <QuestionComponent ref={questionAnswerRef} list={list} setList={setList} />

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
                        <Dot onClick={() => handlePagination(0, true)} />
                        <Dot onClick={() => handlePagination(1, true)} />
                        <Dot current={true} />
                        <Dot onClick={() => handlePagination(3)} />
                    </PaginationContainer>

                    {
                        !isOnMobile ?
                            <>
                                <NextStepContainer right={true}>
                                    <FaChevronRight onClick={() => handlePagination(3)} />
                                </NextStepContainer>
                                <PreviousStepContainer left={true} right={false}>
                                    <FaChevronLeft onClick={() => handlePagination(1, true)} />
                                </PreviousStepContainer>
                            </>
                            :
                            null
                    }
                </CreationSwiperContainer>
            )
        case 3:
            return (
                <CreationSwiperContainer>
                    <div tw="flex flex-col gap-[8px]">
                        <h1>Résumer</h1>
                        <DescSpan
                            desc="Vérifiez que votre exercice est correctement configuré."
                        />
                    </div>

                    <div tw="flex flex-row items-center justify-center">
                        <SubmitButtonContainer onClick={() => handleClick("create")}>
                            <span>Créer l'exercice</span>
                        </SubmitButtonContainer>
                    </div>

                    <PaginationContainer>
                        <Dot onClick={() => handlePagination(0, true)} />
                        <Dot onClick={() => handlePagination(1, true)} />
                        <Dot onClick={() => handlePagination(2, true)} />
                        <Dot current={true} />
                    </PaginationContainer>

                    {
                        !isOnMobile ?
                            <>
                                <PreviousStepContainer left={true} right={false}>
                                    <FaChevronLeft onClick={() => handlePagination(2, true)}/>
                                </PreviousStepContainer>
                            </>
                            :
                            null
                    }

                </CreationSwiperContainer>
            )
    }
}

export default CreationSwiper;