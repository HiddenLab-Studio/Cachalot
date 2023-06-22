import React, {useEffect, useState} from "react";
import tw, { styled } from "twin.macro";

// Components
import ConnectionHomePage from "../../../../../connection/ConnectionHomePage.jsx";
import FullLoading from "../../../../../../components/utils/loading/FullLoading.jsx";
import SmallLoading from "../../../../../../components/utils/loading/SmallLoading.jsx";
import ExerciseCatalogCard from "./subComponents/ExerciseCatalogCard.jsx";

// Styled Components
import { MainTitleContainer } from "../create/style/CreateExerciseStyle.js";
import DescSpan from "../../../../../../components/utils/ui/DescSpan.jsx";
import {useCache} from "../../../../../../context/manager/cache/CacheProvider.js";
import AllExercise from "./subComponents/AllExercise.jsx";


const AllExerciseContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  .no__exercise__found {
    display: flex;
    width: 100%;
    justify-content: center;
    span {
      font-family: "Din_Round_Med", sans-serif;
      color: ${props => props.theme.subText};
      font-size: var(--fs-ss);
      text-align: center;
    }
  }
`;
const UserExerciseContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  h3 {
    font-family: "Din_Round_Bold", sans-serif;
    color: ${props => props.theme.text};
    border-bottom: 2px solid ${props => props.theme.borderRightColor};
    font-size: var(--fs-sm);
    width: 100%;
  }
  h4 {
    font-family: "Din_Round_Med", sans-serif;
    color: ${props => props.theme.subText};
    font-size: var(--fs-ss);
    text-align: center;
  }
`;

const ExerciseCatalogContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 31.75%);
  gap: 24px;
  justify-content: center;
  z-index: 1;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 45%);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 100%);
  }
`;

const ExerciseCatalog = ({auth}) => {
    const userData = auth.userData;
    const cache = useCache();

    // State
    const [isLoading, setIsLoading] = useState(true);
    const [userExerciseList, setUserExerciseList] = useState([]);

    useEffect( () => {
        console.info("Rendering ExerciseCatalog.jsx...")
        setIsLoading(true);
        auth.exercise.getUserExercises(auth.currentUser).then((r) => {
            setUserExerciseList(r);
            setIsLoading(false);
        });
    }, []);


    if(typeof auth.currentUser === "number") {
        return <ConnectionHomePage />
    } else {
        if(!cache.isUserCached){
            return <FullLoading setIsLoading={setIsLoading} />
        } else {
            if(isLoading){
                return <SmallLoading />
            } else {
                return (
                    <>
                        <MainTitleContainer>
                            <img src="../../../../../../../static/img/icons/books.png" alt="Create"/>
                            <h1>Liste des exercices</h1>
                        </MainTitleContainer>
                        <DescSpan
                            desc="Vous pouvez consulter ici la liste des exercices disponibles. Vous pouvez les trier par type ou par nombre de likes."
                        />

                        <div tw="flex flex-col gap-[24px] px-[25px]">
                            <UserExerciseContainer>
                                <h3>Vos exercices</h3>
                                {
                                    userData.userExercise.myExerciseList.length === 0 ?
                                        <h4>Vous n'avez pas encore créé d'exercice.</h4>
                                    :
                                        <ExerciseCatalogContainer>
                                            {
                                                userExerciseList.map((exercise, index) => {
                                                    return (
                                                        <ExerciseCatalogCard
                                                            key={index}
                                                            id={exercise.id}
                                                            title={exercise.title}
                                                            description={exercise.description}
                                                            type={exercise.type}
                                                            like={exercise.like}
                                                            date={exercise.dateCreation}
                                                            author={exercise.username}
                                                        />
                                                    )
                                                })
                                            }
                                        </ExerciseCatalogContainer>
                                }
                            </UserExerciseContainer>
                            <AllExerciseContainer>
                                <AllExercise auth={auth} />
                            </AllExerciseContainer>
                        </div>
                    </>
                )
            }
        }
    }
}

export default ExerciseCatalog;