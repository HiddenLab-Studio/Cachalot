import React, {useEffect, useState} from "react";
import tw, { styled } from "twin.macro";
import Loading from "../../../../../../components/utils/loading/Loading.jsx";
import SmallLoading from "../../../../../../components/utils/loading/SmallLoading.jsx";
import {useCache} from "../../../../../../context/manager/cache/CacheProvider.js";
import FullLoading from "../../../../../../components/utils/loading/FullLoading.jsx";
import ConnectionHomePage from "../../../../../connection/ConnectionHomePage.jsx";

const GridElement = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-bottom: 4px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  padding: 16px;
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.buttonBgHover};
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;

const ImageZoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  img {
    border-radius: ${props => props.zoom ? "12px" : "50%"};
    width: ${props => props.zoom ? "512px" : "128px"};
    height: ${props => props.zoom ? "512px" : "128px"};
    transition: all 150ms ease-out;
    
    &:hover {
      cursor: ${props => props.zoom ? "zoom-out" : "zoom-in"};
      border: 3px solid ${props => props.theme.subText};
    }
  }
  h2 {
    font-size: var(--fs-m);
    font-family: "Din_Round_Bold",sans-serif;
    color: ${props => props.theme.text};
  }
`;
const ExerciseDefaultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  .title__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    border-bottom: 2px solid ${props => props.theme.borderRightColor};
    span {
      font-size: var(--fs-sss);
      color: ${props => props.theme.subText};
    }
    h1 {
      font-size: var(--fs-sl);
      font-family: "Din_Round_Bold",sans-serif;
      color: ${props => props.theme.text};
      @media (max-width: 768px) {
        font-size: var(--fs-m);
      }
    }
    img {
      width: 48px;
      height: 48px;
      @media (max-width: 768px) {
        width: 32px;
        height: 32px;
      }
    }
  }
  
  .submit__btn__container {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    button {
        width: 100%;
        max-width: 256px;
        height: 48px;
        border-radius: 12px;
        border: 2px solid ${props => props.theme.borderRightColor};
        border-bottom: 4px solid ${props => props.theme.borderRightColor};
        color: ${props => props.theme.cachalotColor};
        font-size: var(--fs-m);
        font-family: "Din_Round_Med",sans-serif;
        transition: all 150ms ease-out;
        &:hover {
            cursor: pointer;
            background-color: ${props => props.theme.buttonBgHover};
        }
    }
  }
  

`;

const ExerciseDefault = ({auth, id}) => {
    // Context
    const userData = auth.userData;
    const cache = useCache();

    // State
    const [isLoading, setIsLoading] = React.useState(true);
    const [exerciseData, setExerciseData] = useState(null);
    const [imageZoom, setImageZoom] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState([]);

    useEffect( () => {
        const getExerciseId = () => {
            return window.location.pathname.split("/")[2];
        }

        auth.exercise.getExerciseById(id === null ? getExerciseId() : id).then(r => {
            console.log(r);
            if(r !== undefined) setExerciseData(r);
            setIsLoading(false);
        });
    }, []);

    function handleClick(e) {
        // check if element is already selected
        selectedAnswer.includes(e.target.id) ? e.target.style.backgroundColor = "" : e.target.style.backgroundColor = "#F2F2F2";
        if(selectedAnswer.includes(e.target.id)){
            // remove element from selectedAnswer
            setSelectedAnswer(selectedAnswer.filter((item) => item !== e.target.id));
        } else {
            // add element to selectedAnswer
            setSelectedAnswer([...selectedAnswer, e.target.id]);
        }

        console.log(selectedAnswer)
    }

    function handleSubmit() {
        // check if user has selected an answer
        if(selectedAnswer.length === 0){
            return alert("Vous n'avez pas sélectionné de réponse");
        } else {
            let amountOfIncorrectAnswers = 0;
            selectedAnswer.forEach((answer) => {
                if(!exerciseData.answers[answer].isValid) amountOfIncorrectAnswers++;
            });
            if (amountOfIncorrectAnswers === 0) {
                alert("Vous avez sélectionné la bonne réponse");
                cache.xpCache.addXp(10);
            } else {
                alert("Vous avez sélectionné une mauvaise réponse");
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
                                {exerciseData.photo === undefined ? null : <img src={exerciseData.photo} alt="Photo de l'énoncé" onClick={() => setImageZoom(!imageZoom)}/>}
                                <h2>{exerciseData.question}</h2>
                            </ImageZoomContainer>
                            <GridContainer>
                                {
                                    exerciseData.answers.map((answer, index) => {
                                        return (
                                            <GridElement id={index} key={index} onClick={(e) => handleClick(e)}>
                                                <span>{answer.text}</span>
                                            </GridElement>
                                        )
                                    })
                                }
                            </GridContainer>
                            <div className="submit__btn__container">
                                <button onClick={() => handleSubmit()}>
                                    <span>Valider</span>
                                </button>
                            </div>
                        </ExerciseDefaultContainer>
                    )
                }
            }
        }
    }


}

export default ExerciseDefault;