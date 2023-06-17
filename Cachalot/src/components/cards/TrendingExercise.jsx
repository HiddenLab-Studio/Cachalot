import React from "react";
import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";

import { FaChevronRight } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import {useMediaQuery} from "react-responsive";

const test = [
    {
        id: 1458,
        name: "Les bases en mathématiques",
        views: 1206,
        like: 541,
        pathName: "/exercise/1458",
    },
    {
        id: 2146,
        name: "Des mots et des couleurs",
        views: 240,
        like: 75,
        pathName: "/exercise/1206",
    },
    {
        id: 6964,
        name: "Des mots et des couleurs",
        views: 100,
        like: 21,
        pathName: "/exercise/6964",
    },
    {
        id: 9481,
        name: "Des mots et des couleurs",
        views: 100,
        like: 21,
        pathName: "/exercise/6964",
    }
]

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
    const isOnMobile = useMediaQuery({query: "(max-width: 550px)"});

    // TODO
    //  - Add a loading state
    //  - Load AMOUNT of exercise from database

    return (
        <TrendingExerciseContainer>
            <GridContainer>
                {test.map((exercise, index) => {
                    if (index < amount){
                        if(exercise !== undefined) {
                            return (
                                <Link to={exercise.pathName} key={exercise.id}>
                                    <div className="card">
                                        <div>
                                            <img src={"../../../static/img/icons/" + (index + 1).toString() + ".png"} alt=""/>
                                        </div>
                                        <div className="exercise__info__container">
                                            <div tw="flex flex-row items-center">
                                                <h2>{exercise.name}</h2>
                                                {
                                                    !isOnMobile ?
                                                        <div tw="flex justify-end grow-[1]">
                                                            <span>#1200</span>
                                                        </div>
                                                        :
                                                        null
                                                }

                                            </div>
                                            {
                                                !isOnMobile ?
                                                    <span>
                                                     description de l'exercice
                                                     description de l'exercice
                                                     description de l'exercice
                                                 </span>
                                                    :
                                                    null
                                            }

                                            <div className="stats__container">
                                                <div>
                                             <span>
                                                 Par @Lucas{!isOnMobile ? ", le 10 mai 2023" : null}
                                             </span>
                                                </div>
                                                <div className="like">
                                                    <FcLike />
                                                    <span>102</span>
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

export default TrendingExercise;