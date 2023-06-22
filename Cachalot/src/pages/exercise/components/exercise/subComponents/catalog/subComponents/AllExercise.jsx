import React, {useEffect, useState} from "react";
import tw, {styled} from "twin.macro";
import {FcLike} from "react-icons/fc";
import ExerciseCatalogCard from "./ExerciseCatalogCard.jsx";
import PlainLoading from "../../../../../../../components/utils/loading/PlainLoading.jsx";


// Styled Components

const SorterElement = styled.div`
  img, svg {
    width: 24px;
    height: 24px;
    border: ${props => props.current === props.tag ? " 1px solid #2ecc71" : null};
    border-radius: 4px;
    &:hover {
      cursor: pointer;
    }
  }
  svg {
    transform: translateY(-1.5px);
  }
`
const SorterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: end;
  flex-grow: 1;
`
const CommunityExerciseContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid ${props => props.theme.borderRightColor};
  .title {
    h3 {
      font-family: "Din_Round_Bold", sans-serif;
      color: ${props => props.theme.text};
      font-size: var(--fs-sm);
      width: 100%;
    }
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

const AllExercise = ({auth}) => {
    // State
    const [isLoading, setIsLoading] = useState(true);
    const [sorter, setSorter] = useState("like");
    const [exerciseList, setExerciseList] = useState([]);

    useEffect(() => {
        switch (sorter) {
            case "like":
                auth.exercise.getExerciseByLike().then((r) => {
                    setExerciseList(r);
                    setIsLoading(false);
                });
                break;
            case "french":
                auth.exercise.getExerciseByType("french").then((r) => {
                    setExerciseList(r);
                    setIsLoading(false);
                });
                break;
            case "math":
                auth.exercise.getExerciseByType("math").then((r) => {
                    setExerciseList(r);
                    setIsLoading(false);
                });
                break;
            case "other":
                auth.exercise.getExerciseByType("other").then((r) => {
                    setExerciseList(r);
                    setIsLoading(false);
                });
                break;
            default:
                setExerciseList([]);
                break;
        }
    }, [sorter]);

    if(isLoading) {
        return <PlainLoading />
    } else {
        return (
            <>
                <CommunityExerciseContainer>
                    <div className="title">
                        <h3>Exercices de la communauté</h3>
                    </div>
                    <SorterContainer>
                        <SorterElement tag={"like"} current={sorter}>
                            <FcLike onClick={() => setSorter("like")}/>
                        </SorterElement>
                        <SorterElement tag={"french"} current={sorter}>
                            <img src="../../../../../../../../static/img/icons/french.png" alt="Sort by type french"
                                 onClick={() => setSorter("french")}/>
                        </SorterElement>
                        <SorterElement tag={"math"} current={sorter}>
                            <img src="../../../../../../../../static/img/icons/math.png" alt="Sort by type math"
                                 onClick={() => setSorter("math")}/>
                        </SorterElement>
                        <SorterElement tag={"other"} current={sorter}>
                            <img src="../../../../../../../../static/img/icons/other.png" alt="Sort by type other"
                                 onClick={() => setSorter("other")}/>
                        </SorterElement>
                    </SorterContainer>
                </CommunityExerciseContainer>
                {
                    exerciseList.length === 0 ?
                            <div className="no__exercise__found">
                                <span>Aucun exercice trouvé</span>
                            </div>
                        :
                            <ExerciseCatalogContainer>
                                {
                                    exerciseList.map((exercise, index) => {
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
            </>
        )
    }

}

export default AllExercise;