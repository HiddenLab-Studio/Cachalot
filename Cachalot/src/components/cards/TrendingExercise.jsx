import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";

import { FaChevronRight } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import {useMediaQuery} from "react-responsive";
import Loading from "../utils/loading/Loading.jsx";
import {exercise} from "../../context/database/exerciseFunctions.js";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  a {
    display: flex;
    flex-direction: row;
    justify-content: center;
    
    .card {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      gap: 16px;
      border: 2px solid ${props => props.theme.borderRightColor};
      border-bottom: 4px solid ${props => props.theme.borderRightColor};
      border-radius: 12px;
      padding: 12px;
      &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.buttonBgHover};
      }
      
      svg {
        color: ${props => props.theme.iconColor};
      }
      
      img {
        width: 64px;
        height: 64px;
        max-width: unset;
      }
      
      .exercise__info__container {
        display: flex;
        flex-direction: column;
        width: 80%;
        h2 {
          font-size: var(--fs-sm);
          font-family: "Din_Round_Med", sans-serif;
          color: ${props => props.theme.text};

          max-width: 400px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        
        span {
          font-size: var(--fs-ss);
          font-family: "Din_Round", sans-serif;
          color: ${props => props.theme.subText};
          max-width: 250px;
          word-break: break-word;
          text-align: justify;
          
          /*overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;*/
        }
        
        .stats__container {
          display: flex;
          flex-direction: row;
          align-items: end;
          margin-top: 12px;
          gap: 8px;
          
          .like {
            display: flex;
            flex-direction: row;
            justify-content: end;
            align-items: center;
            flex-grow: 1;
            gap: 4px;
          }
          
          span {
            font-size: var(--fs-xs);
          }
          
        }
        
      }

    }
  }
`

export const TrendingExerciseContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 550px) {
    
    h1 {
      font-size: var(--fs-m);
    }
    
    ${GridContainer} {
      .card {
        max-width: calc(100vw - 32px);
        .exercise__info__container {
          h2 {
            font-size: var(--fs-s);
            max-width: 200px;
          }
          
          .stats__container {
            margin: 0;
            justify-content: start;
          }
        }

        img {
          width: 48px;
          height: 48px;
        }
      }
    }
  }


  @media (max-width: 320px) {
    h1 {
      font-size: var(--fs-sm);
    }

    ${GridContainer} {
      .card {
        .exercise__info__container {
          h2 {
            max-width: 100px;
          }
        }
      }
    }
  }
`


const TrendingExercise = ({amount}) => {
    // State
    const [exerciseList, setExerciseList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    // Media query
    const isOnMobile = useMediaQuery({query: "(max-width: 550px)"});

    useEffect(() => {
        exercise.getExerciseByLike(9).then((res) => {
                console.log(res);
                setExerciseList(res);
                setIsLoading(false);
            }
        )
    }, []);

    if(isLoading){
        return <Loading />
    } else {
        return (
            <TrendingExerciseContainer>
                <GridContainer>
                    {exerciseList.map((exercise, index) => {
                        if (index < amount){
                            if(exercise !== undefined) {
                                return (
                                    <Link to={"/exercise/" + exercise.id} key={exercise.id}>
                                        <div className="card">
                                            <div>
                                                <img src={"../../../static/img/icons/" + (index + 1).toString() + ".png"} alt=""/>
                                            </div>
                                            <div className="exercise__info__container">
                                                <div tw="flex flex-row items-center">
                                                    <h2>{exercise.title}</h2>
                                                    {
                                                        !isOnMobile ?
                                                            <div tw="flex justify-end grow-[1]">
                                                                <span>#{exercise.id}</span>
                                                            </div>
                                                            :
                                                            null
                                                    }

                                                </div>
                                                {
                                                    !isOnMobile ?
                                                            <span>{exercise.description}</span>
                                                        :
                                                            null
                                                }

                                                <div className="stats__container">
                                                    <div>
                                             <span>
                                                 Par @{exercise.username} {!isOnMobile ? "le " + exercise.dateCreation : null}
                                             </span>
                                                    </div>
                                                    <div className="like">
                                                        <FcLike />
                                                        <span>{exercise.like}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div tw="flex justify-end grow-[1]">
                                                <FaChevronRight />
                                            </div>
                                        </div>
                                    </Link>
                                )
                            } else {
                                return null;
                            }
                        }
                    })}
                </GridContainer>
            </TrendingExerciseContainer>
        )
    }

}

export default TrendingExercise;