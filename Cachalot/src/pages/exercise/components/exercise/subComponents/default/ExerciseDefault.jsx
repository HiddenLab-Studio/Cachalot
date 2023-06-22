import React, {useEffect, useState} from "react";
import tw from "twin.macro";

// Context
import {useCache} from "../../../../../../context/manager/cache/CacheProvider.js";


// Components
import FullLoading from "../../../../../../components/utils/loading/FullLoading.jsx";
import ConnectionHomePage from "../../../../../connection/ConnectionHomePage.jsx";
import SmallLoading from "../../../../../../components/utils/loading/SmallLoading.jsx";
import {FcCheckmark, FcLike, FcLikePlaceholder} from "react-icons/fc";

// Styled Components
import {
    ExerciseCompleteContainer,
    ExerciseDefaultContainer,
    GridContainer,
    GridElement,
    ImageZoomContainer, LikeContainer
} from "./ExerciseDefaultStyle.js";

const ExerciseDefault = ({auth, id}) => {
    // Context
    const userData = auth.userData;
    const cache = useCache();

    // State
    const [isLoading, setIsLoading] = React.useState(true);
    const [imageZoom, setImageZoom] = useState(false);
    const [exerciseData, setExerciseData] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [exerciseFinished, setExerciseFinished] = useState({correct: false, complete: false});
    const [isLiked, setIsLiked] = useState(false);

    useEffect( () => {
        const getExerciseId = () => {
            return window.location.pathname.split("/")[2];
        }

        let exerciseId = getExerciseId();
        auth.exercise.getExerciseById(id === null ? exerciseId : id).then(r => {
            if(r !== undefined) {
                // check if exercise already liked by the user (userData.userExercise.exerciseLikedList)
                if(userData.userExercise.exerciseLikedList.includes(exerciseId)) setIsLiked(true);
                setExerciseData(r)
            }
            setIsLoading(false);
        });
    }, []);

    function handleClick(type, e = undefined) {
        switch (type) {
            case "imageZoom":
                setImageZoom(!imageZoom);
                break;
            case "select":
                if(selectedAnswer.includes(e.target.id)) setSelectedAnswer(selectedAnswer.filter((item) => item !== e.target.id));
                else setSelectedAnswer([...selectedAnswer, e.target.id]);
                break;
            case "submit":
                if(!exerciseFinished.complete){
                    if(selectedAnswer.length === 0){
                        setExerciseFinished({correct: false, complete: false})
                    } else {
                        let amountOfIncorrectAnswers = 0;
                        let amountOfCorrectAnswers = 0;
                        let countCorrectAnswers = 0;
                        exerciseData.answers.forEach((answer) => {
                            if(answer.isValid) countCorrectAnswers++;
                        });
                        selectedAnswer.forEach((answer) => {
                            if(!exerciseData.answers[answer].isValid) {
                                document.getElementById(answer).style.backgroundColor = "#e74c3c";
                                amountOfIncorrectAnswers++
                            } else {
                                document.getElementById(answer).style.backgroundColor = "#2ecc71";
                                amountOfCorrectAnswers++;
                            }
                        });
                        if (amountOfIncorrectAnswers === 0 && amountOfCorrectAnswers === countCorrectAnswers) {
                            // check if the user hasn't already complete the exercise
                            let exerciseId = window.location.pathname.split("/")[2];
                            console.log(userData.userExercise.exerciseDoneList);
                            if(!userData.userExercise.exerciseDoneList.includes(exerciseId.toString())){
                                auth.user.addExerciseDone(auth.currentUser, exerciseId).then(r => {
                                    //console.log(r);
                                    cache.questCache.updateQuestProgress("onExerciseCompleted").then(r => {
                                        console.info("First time completing this exercise ! you earned 10XP");
                                        cache.xpCache.addXp(10);
                                        setExerciseFinished({correct: true, complete: true});
                                    });
                                });
                            } else {
                                setExerciseFinished({correct: true, complete: true});
                            }
                        } else {
                            setExerciseFinished({correct: false, complete: true});
                        }
                    }
                } else {
                    setSelectedAnswer([]);
                    setExerciseFinished({correct: false, complete: false});
                    for(let i = 0; i < exerciseData.answers.length; i++){
                        document.getElementById(i).style.backgroundColor = "";
                    }
                }
                break
            case "like":
                let exerciseId = window.location.pathname.split("/")[2];
                if(!isLiked){
                    auth.user.likeExercise(auth.currentUser, exerciseId).then(r => {
                        setIsLiked(true);
                    });
                } else {
                    auth.user.unlikeExercise(auth.currentUser, exerciseId).then(r => {
                        setIsLiked(false);
                    });
                }
        }
    }


    if(typeof auth.currentUser === "number"){
        return <ConnectionHomePage />
    } else {
        if(!cache.isUserCached){
            return <FullLoading setIsLoading={setIsLoading} />
        } else {
            if(isLoading) {
                return <SmallLoading />
            } else {
                if(exerciseData === null) {
                    return (
                        <div>
                            <h1>Erreur</h1>
                            <p>Une erreur est survenue lors du chargement de l'exercice</p>
                            <p>Aucun exercice trouvé !</p>
                        </div>
                    )
                } else {
                    return (
                        <ExerciseDefaultContainer>
                            <div className="title__container">
                                <div tw="flex flex-row items-center gap-[8px]">
                                    <img src="../../../../../../../static/img/icons/exercise.png" alt="Exercise"/>
                                    <h1>Exercice de {exerciseData.username}</h1>
                                </div>
                                <div tw="flex justify-end grow-[1]">
                                    <span>#{id}</span>
                                </div>
                            </div>
                            <ImageZoomContainer zoom={imageZoom} className="question__container">
                                {exerciseData.photo === undefined ? null :
                                    <img src={exerciseData.photo} alt="Photo de l'énoncé"
                                         onClick={() => handleClick("imageZoom")} />}
                                <h2>{exerciseData.question}</h2>
                            </ImageZoomContainer>
                            <GridContainer>
                                {
                                    exerciseData.answers.map((answer, index) => {
                                        return (
                                            <GridElement id={index} rightAnswer={answer.isValid && exerciseFinished} current={selectedAnswer.includes(index.toString())} key={index} onClick={(e) => handleClick("select", e)}>
                                                {answer.text}
                                            </GridElement>
                                        )
                                    })
                                }
                            </GridContainer>
                            <div className="submit__btn__container">
                                {
                                    !exerciseFinished.complete ?
                                            <>
                                                <button onClick={() => handleClick("submit")}>
                                                    <span>Valider</span>
                                                </button>
                                            </>
                                        :
                                            !exerciseFinished.correct ?
                                                <>
                                                    <button onClick={() => handleClick("submit")}>
                                                        <span>Recommencer</span>
                                                    </button>
                                                </>
                                            :
                                                <>
                                                    <ExerciseCompleteContainer>
                                                        <FcCheckmark />
                                                        <span>Bravo ! Vous avez réussi l'exercice ! {!userData.userExercise.exerciseDoneList.includes(window.location.pathname.split("/")[2].toString()) ? "+10XP" : null}</span>
                                                    </ExerciseCompleteContainer>
                                                </>

                                }

                            </div>
                            <LikeContainer>
                                {
                                    isLiked ?
                                            <FcLike onClick={() => handleClick("like")} />
                                        :
                                            <FcLikePlaceholder onClick={() => handleClick("like")} />
                                }
                                <span>{exerciseData.like}</span>
                            </LikeContainer>
                        </ExerciseDefaultContainer>
                    )
                }
            }
        }
    }


}

export default ExerciseDefault;